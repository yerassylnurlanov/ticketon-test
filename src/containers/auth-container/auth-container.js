import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard, TouchableWithoutFeedback, Platform
} from 'react-native';
import firebase from 'react-native-firebase';
import { withNavigation } from 'react-navigation';
import { AccessToken, LoginManager } from 'react-native-fbsdk';
import { Icon, Toast } from 'native-base';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import withTheme from '../../hoc/withTheme';
import { getFirstLaunchStatus } from '../../store/actions/app-actions';
import {
  setEmail,
  setPassword,
  signIn,
  getProfile,
  signInAndGetProfile,
  signInFb
} from '../../store/actions/auth-actions';
import Spinner from '../../components/spinner';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.background
  },
  input: {
    color: 'black',
    marginHorizontal: 16,
    marginTop: hp(5),
    paddingBottom: 5,
    borderBottomColor: theme.fontDesc,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0
  },
  mainContainer: {
    justifyContent: 'center'
  },
  registrationButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  forgotPasswordButton: {
    margin: 16,
    right: 0,
    alignSelf: 'flex-end'
  },
  loginButton: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 24,
    backgroundColor: theme.appBar
  },
  loginButtonLabel: {},
  dividerContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 36,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  dividerText: {
    fontSize: 14,
    paddingHorizontal: 5,
    alignSelf: 'center',
    color: theme.fontMain
  },
  dividerLine: {
    backgroundColor: '#A2A2A2',
    height: 1,
    flex: 1
  },
  socialIconContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  socialIcon: {
    fontSize: 60
  },
  accentBtn: {
    fontWeight: '600',
    color: theme.fontMain
  }
});

class AuthContainer extends React.Component {
  showMessage = (error) => {
    Toast.show({
      text: error,
      duration: 3000,
      position: 'bottom'
    });
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { navigation, isLoading, error } = this.props;
    if (
      nextProps.isLoading === false &&
      nextProps.error === null &&
      nextProps.isLoading !== this.props.isLoading
    ) {
      navigation.navigate('Home');
      return true;
    }
    return true;
  }

  handleLoginPressed = () => {
    const { signIn, email, password } = this.props;
    if (email !== '' && password !== '') {
      Keyboard.dismiss();
      signIn(email, password);
    }
  };

  handleRegisterPressed = () => {
    const { navigation } = this.props;
    navigation.navigate('Registration');
  };

  handleSocialAuthPressed = () => {
    const { navigation } = this.props;
    navigation.navigate('RegistrationConfirm');
  };

  handleForgotPasswordPressed = () => {
    const { navigation } = this.props;
    navigation.navigate('RestorePassword');
  };

  handleFacebookAuthPressed = async () => {
    const { signInFb } = this.props;
    try {
      LoginManager.logOut();
      if (Platform.OS !== 'ios') {
        LoginManager.setLoginBehavior('WEB_ONLY');
      }
      LoginManager.logInWithPermissions(['public_profile', 'email'])
        .then(result => {

          if (result.isCancelled) {
            // handle this however suites the flow of your app
            return;
          }
          // get the access token
          // const data = await AccessToken.getCurrentAccessToken();

          AccessToken.getCurrentAccessToken().then(
            (data) => {
              signInFb(data.accessToken);
            }
          );
        })
        .catch(err => console.error(err.message));
    } catch (e) {
      console.error(e);
    }
  };

  handleGoogleAuthPressed = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();
      // create a new firebase credential with the token
      const credential = auth().GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await auth().signInWithCredential(credential);
    } catch (e) {
      console.error(e);
    }
  };

  handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  render() {
    const {
      t,
      theme,
      email,
      password,
      setEmail,
      setPassword,
      error,
      isLoading,
      message
    } = this.props;
    const styles = getStyles(theme);

    if (isLoading) {
      return <Spinner />
    }

    // if (message) {
    //   alert(message);
    // }

    return (
      <TouchableWithoutFeedback onPress={this.handleDismissKeyboard}>
        <View style={styles.root}>
          {message && (
            <View style={{ margin: 16, flex: 0, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{ width: '70%', textAlign: 'center' }}>{message}</Text>
            </View>
          )}
          <View style={styles.inputContainer}>
            <TextInput
              placeholderTextColor="grey"
              placeholder={t('emailNumberPhone')}
              underlineColorAndroid="black"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoCompleteType="email"
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
            <TextInput
              placeholderTextColor="grey"
              placeholder={t('password')}
              underlineColorAndroid="black"
              textContentType="password"
              autoCompleteType="password"
              secureTextEntry
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
          </View>
          <TouchableOpacity style={styles.forgotPasswordButton} onPress={this.handleForgotPasswordPressed}>
            <Text style={styles.accentBtn}>{t('forgotPassword?')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.handleLoginPressed}
            style={styles.loginButton}
          >
            <Text>{t('signin')}</Text>
          </TouchableOpacity>
          <View style={styles.registrationButtonContainer}>
            <Text>{t('newUser?')}</Text>
            <TouchableOpacity
              onPress={this.handleRegisterPressed}
            >
              <Text style={styles.accentBtn}> {t('registration')}</Text>
            </TouchableOpacity>
          </View>
          {/*<View style={styles.dividerContainer}>*/}
            {/*<View style={styles.dividerLine}/>*/}
            {/*<Text style={styles.dividerText}>{t('loginUsing')}</Text>*/}
            {/*<View style={styles.dividerLine}/>*/}
          {/*</View>*/}
          {/*<View style={styles.socialIconContainer}>*/}
            {/*<TouchableOpacity onPress={this.handleFacebookAuthPressed}>*/}
            {/*  <Icon*/}
            {/*    style={[styles.socialIcon, { color: '#3C5A99'}]}*/}
            {/*    name="facebook-with-circle"*/}
            {/*    type="Entypo"*/}
            {/*    backgroundColor="red"*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={this.handleSocialAuthPressed}>*/}
            {/*  <Icon*/}
            {/*    style={styles.socialIcon}*/}
            {/*    name="twitter-with-circle"*/}
            {/*    type="Entypo"*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
            {/*<TouchableOpacity onPress={this.handleGoogleAuthPressed}>*/}
            {/*  <Icon*/}
            {/*    style={styles.socialIcon}*/}
            {/*    name="google--with-circle"*/}
            {/*    type="Entypo"*/}
            {/*  />*/}
            {/*</TouchableOpacity>*/}
          {/*</View>*/}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}


const mapStateToProps = state => ({
  isLoading: state.auth.loading,
  error: state.auth.error,
  email: state.auth.email,
  authData: state.auth.authData,
  password: state.auth.password,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setEmail: setEmail,
    setPassword: setPassword,
    signIn: signIn,
    getProfile: getProfile,
    signInFb: signInFb
  }, dispatch);
};

export default compose(
  withTheme,
  withNavigation,
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(AuthContainer);
