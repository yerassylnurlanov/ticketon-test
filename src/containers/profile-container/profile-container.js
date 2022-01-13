import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withNavigation } from 'react-navigation';
import ProfileView from './profile-view';
import { logOut } from '../../store/actions/auth-actions';
import { getProfile as getProfileAction } from '../../store/actions/auth-actions';
import Spinner from '../../components/spinner';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { withTranslation } from 'react-i18next';
import { Icon } from "native-base";
import withTheme from '../../hoc/withTheme';
import FingerprintAuthorization from '../../components/fingerprint-authorization/fingerprint-authorization';
import AsyncStorageService from '../../services/async-storage-service';

class ProfileContainer extends React.Component {
  state = {
    isModalVisible: false,
    isLoadingPin: true,
    isUsePin: null,
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    navigation.setParams({
      handleLogout: () => this.toggleModal('open')
    });
  }


  componentDidMount() {
    const { navigation, theme } = this.props;

    AsyncStorageService.getUsePin()
    .then(isUsePin => {
      if (!isUsePin) {
        navigation.setParams({'headerRight': (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileEdit');
              }}
            >
              <Icon style={{ marginHorizontal: 16, color: theme.headerBarTint, fontSize: 15 }} name="edit" fontSize={15} type="FontAwesome" />
            </TouchableOpacity>
          )});
      } else {
        navigation.setParams({'headerRight': null});
      }

      this.setState({
        isLoadingPin: false,
        isUsePin: isUsePin
      });
    })
    .catch(err => {
      navigation.setParams({'headerRight': (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileEdit');
            }}
          >
            <Icon style={{ marginHorizontal: 16, color: theme.headerBarTint, fontSize: 16 }} name="edit" fontSize={16} type="FontAwesome" />
          </TouchableOpacity>
        )});
      console.warn(err);
      this.setState({
        isLoadingPin: false,
        isUsePin: false,
      });
    });
  }


  toggleModal = (action) => {
    if (action === 'open') {
      this.setState({
        isModalVisible: true
      });
    } else if (action === 'logout') {
      this.setState({
        isModalVisible: false
      });
      this.logoutHandle();
    } else {
      this.setState({
        isModalVisible: false
      });
    }
  }

  handleUserNameEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileUserName');
  };

  handlePhoneEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfilePhone');
  };

  handleEmailEdit = () => {
    const { navigation } = this.props;
    navigation.navigate('ProfileEmail');
  };

  logoutHandle = () => {
    const { logout, navigation } = this.props;
    navigation.navigate('Main');
    logout();
  };

  handleRefresh = () => {
    const { authData, getProfile } = this.props;
    if (authData.token) {
      getProfile(authData.token);
    }
  };

  handleChangePassword = () => {
    const { navigation } = this.props;
    navigation.navigate('ChangePassword');
  }

  render() {
    const { isLoading, t, navigation, theme } = this.props;
    const { isModalVisible, isLoadingPin, isUsePin } = this.state;

    if (isLoadingPin) {
      return (<Spinner/>)
    }

    if (isUsePin === true) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <FingerprintAuthorization
            finishProcess={() => {
              this.setState({
                isLoadingPin: false,
                isUsePin: false,
              });
              navigation.setParams({'headerRight': (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ProfileEdit');
                    }}
                  >
                    <Icon style={{ marginHorizontal: 16, color: theme.headerBarTint, fontSize: 15 }} name="edit" fontSize={15} type="FontAwesome" />
                  </TouchableOpacity>
                )});
            }}
          />
        </SafeAreaView>
      );
    }

    return (
      <ProfileView
        {...this.props}
        isModalVisible={isModalVisible}
        toggleModal={this.toggleModal}
        refreshing={isLoading}
        handleRefresh={this.handleRefresh}
        handleUserNameEdit={this.handleUserNameEdit}
        handlePhoneEdit={this.handlePhoneEdit}
        handleEmailEdit={this.handleEmailEdit}
        logoutHandle={this.logoutHandle}
        handleChangePassword={this.handleChangePassword}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: (state.auth.profile) ? state.auth.loading: null,
  userName: (state.auth.profile) ? state.auth.profile.nickname : null,
  lastName: (state.auth.profile) ? state.auth.profile.lastName : '',
  firstName: (state.auth.profile) ? state.auth.profile.firstName : '',
  middleName: (state.auth.profile) ? state.auth.profile.middleName : '',
  mobilePhone: (state.auth.profile) ? state.auth.profile.phone : '',
  email: (state.auth.profile) ? state.auth.profile.email : null,
  discount: (state.auth.profile) ? state.auth.profile.activeBonuses : null,
  birthday: (state.auth.profile) ? state.auth.profile.birthday : null,
  achievements: (state.auth.profile) ? state.auth.profile.achievements : [],
  activeBonuses: (state.auth.profile) ? state.auth.profile.activeBonuses : 0,
  pendingBonuses: (state.auth.profile) ? state.auth.profile.pendingBonuses : 0,
  lii: (state.auth.profile) ? state.auth.profile.lii : 0,
  iin: (state.auth.profile) ? state.auth.profile.iin: null,
  avatar: (state.auth.profile) ? state.auth.profile.avatar : null,
  authData: state.auth.authData
});

const mapDispatchToProps = dispatch => bindActionCreators({
  logout: logOut,
  getProfile: getProfileAction
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation, withTranslation(), withTheme)(ProfileContainer);
