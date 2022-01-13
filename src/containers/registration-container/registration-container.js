import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import { lightTheme as colors } from '../../consts/colors';
import ProgressDots from '../../components/progress-dots';
import { withNavigation } from 'react-navigation';
import { Icon, Toast } from 'native-base';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withTranslation } from 'react-i18next';
import AuthService from '../../services/auth-service';
import Spinner from '../../components/spinner';
import FooterBar from '../../components/footer-bar';
import Axios from 'axios';
import { apiVersion } from '../../consts';
import analytics from '@react-native-firebase/analytics';

const getStyles = theme =>
  StyleSheet.create({
    root: {
      backgroundColor: '#f3f3f3',
      flex: 1,
      justifyContent: 'flex-start',
      flexDirection: 'column'
    },
    mainContainer: {
      flex: 1,
      flexDirection: 'column',
      marginHorizontal: 16
    },
    input: {
      marginTop: hp(7),
      padding: 3,
      color: theme.fontMain,
      borderBottomColor: theme.fontDesc,
      borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0
    },
    inputError: {
      marginTop: hp(7),
      padding: 3,
      color: theme.fontMain,
      borderBottomColor: 'red',
      borderBottomWidth: Platform.OS === 'ios' ? 1 : 0,
    },
    additionalContainer: {
      height: 48,
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      backgroundColor: '#255B6D',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    rulesButton: {
      alignSelf: 'flex-end',
      marginVertical: 16
    },
    rulesButtonLabel: {
      fontWeight: '500'
    },
    placeholder: {
      flex: 1
    },
    registerBtn: {
      position: 'absolute',
      bottom: 18,
      left: 16,
      right: 16,
      height: hp(6),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.appBar,
      borderRadius: 5
    },
    footer: {
      position: "absolute",
    },
    nextButton: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    nextButtonLabel: {
      color: 'white',
      alignSelf: 'center',
      fontSize: 14
    },
  });

class RegistrationContainer extends React.Component {
  state = {
    mode: false,
    nickname: '',
    password: '',
    passwordConfirm: '',
    email: '',
    emailValid: false,
    phone: '',
    phoneValid: false,
    code: "",
    token: null,
    isLoading: false
  };

  handleNameChange = name => {
    this.setState({
      nickname: name
    });
  };

  handleEmailChange = email => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    this.setState({
      email,
      emailValid: re.test(email.toLowerCase())
    });
  };

  handlePhoneChange = phone => {
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

    this.setState({
      phone,
      phoneValid: re.test(phone)
    });
  };

  handleCodeChange = code => {
    this.setState({
      code
    });
  };

  handlePasswordChange = password => {
    this.setState({
      password
    });
  };

  handlePasswordConfirmChange = passwordConfirm => {
    this.setState({
      passwordConfirm
    });
  };

  handleContinue = () => {
    const { nickname, email, phone, password, passwordConfirm, phoneValid, emailValid } = this.state;
    const { t } = this.props;

    Keyboard.dismiss();

    if (nickname === '') {
      Toast.show({
        text: t('fillField'),
        duration: 3000,
      });
    }

    if (
      nickname === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      passwordConfirm === '' ||
      !emailValid ||
      !phoneValid
    ) {
      return;
    }

    if (passwordConfirm !== password) {
      Toast.show({
        text: t('differentPasswords'),
        duration: 3000,
      });
      return;
    }

    Axios.post('https://api.ticketon.kz/request_sign_up_otp', {
      nickname: nickname,
      email: email,
      phone: phone
    }, {
      params: {
        version: apiVersion
      }
    })
    .then(res => {
      if (res.data.status === 0) {
        Toast.show({
          text: t(res.data.error),
          duration: 3000
        });
      } else if (res.data.data.token) {
        analytics().logEvent("sign_up", { method: "email" });
        this.setState({
          mode: true,
          token: res.data.data.token
        });

      }
    })
    .catch(err => {
      Toast.show({
        text: t(err.message),
        duration: 3000
      });
    });
    Keyboard.dismiss();
  };

  handleRulesPressed = () => {
    const { navigation } = this.props;
    navigation.navigate('Agreement');
  };

  handleDismissKeyboard = () => {
    Keyboard.dismiss();
  }

  handleReceiveCodePressed = () => {
    const { nickname, email, phone } = this.state;

  }

  handleSubmit = () => {
    this.setState({
      isLoading: true
    });
    const { navigation, t } = this.props;
    const { nickname, email, phone, password, code, token } = this.state;

    AuthService.signUp(nickname, password, email, phone, code, token)
      .then(res => {
        navigation.navigate('Auth');
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        Toast.show({
          text: err.toString(),
          duration: 3000
        });
      });
  };

  render() {
    const { theme, t } = this.props;
    const {
      mode,
      nickname,
      password,
      passwordConfirm,
      email,
      phone,
      code,
      isLoading,
      emailValid,
      phoneValid
    } = this.state;
    const styles = getStyles(theme);

    if (isLoading) {
      return <Spinner />;
    }

    const registerForm = (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        behavior={(Platform.OS === 'ios') ? 'position' : 'height'}
        keyboardVerticalOffset="40"
      >
        <ScrollView>
        <TouchableWithoutFeedback onPress={this.handleDismissKeyboard}>
          <View style={styles.mainContainer} >
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("nickname")}
            autoCompleteType="username"
            underlineColorAndroid={colors.blueFont}
            onChangeText={this.handleNameChange}
            value={nickname}
          />
          <TextInput
            placeholderTextColor="grey"
            style={(emailValid) ? styles.input : styles.inputError}
            placeholder={t("email")}
            autoCompleteType="email"
            keyboardType="email-address"
            underlineColorAndroid={(emailValid) ? colors.blueFont : 'red'}
            onChangeText={this.handleEmailChange}
            value={email}
          />
          <TextInput
            placeholderTextColor="grey"
            style={(phoneValid) ? styles.input : styles.inputError}
            placeholder={t("phonePlaceholder")}
            autoCompleteType="tel"
            keyboardType="phone-pad"
            underlineColorAndroid={(phoneValid) ? colors.blueFont : 'red'}
            onChangeText={this.handlePhoneChange}
            value={phone.replace(/\+(\d{1})(\d{3})(\d{3})(\d{4})/, "+$1-$2-$3-$4")}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("password")}
            underlineColorAndroid={colors.blueFont}
            secureTextEntry={true}
            onChangeText={this.handlePasswordChange}
            value={password}
          />
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("confirmPassword")}
            underlineColorAndroid={colors.blueFont}
            secureTextEntry={true}
            onChangeText={this.handlePasswordConfirmChange}
            value={passwordConfirm}
          />
          </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        <FooterBar
          centerElement={(
            <ProgressDots chosen={0} total={2}/>
          )}
          rightElement={(
            <TouchableOpacity
              style={styles.nextButton}
              onPress={this.handleContinue}
            >
              <Text style={styles.nextButtonLabel}>{t('next').toUpperCase()}</Text>
              <Icon style={styles.nextButtonLabel} type="AntDesign" name="right" />
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
    );

    const confirmForm = (
      <View style={styles.root}>
        <ScrollView>
        <TouchableWithoutFeedback onPress={this.handleDismissKeyboard}>
          <View style={styles.mainContainer}>
          <Text>{t("phoneDescription") + ' ' + phone}</Text>
          <TextInput
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("confirmCode")}
            keyboardType="decimal-pad"
            underlineColorAndroid={colors.blueFont}
            onChangeText={this.handleCodeChange}
            value={code}
          />
          <TouchableOpacity onPress={this.handleReceiveCodePressed}>
            <Text>{t("receiveCode")}</Text>
          </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
        </ScrollView>
        <FooterBar
          centerElement={(
            <ProgressDots chosen={1} total={2}/>
          )}
          rightElement={(
            <TouchableOpacity
              style={styles.nextButton}
              onPress={this.handleSubmit}
            >
              <Text style={styles.nextButtonLabel}>{t('confirm').toUpperCase()}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );

    return (!mode) ? registerForm : confirmForm;
  }
}

export default compose(
  withTranslation(),
  withTheme,
  withNavigation
)(RegistrationContainer);
