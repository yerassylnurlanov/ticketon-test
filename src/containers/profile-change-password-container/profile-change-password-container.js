import React from 'react';
import { Keyboard } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { Toast } from 'native-base';
import ProfileChangePasswordView from './profile-change-password-view';
import AuthService from '../../services/auth-service';
import { withTranslation } from 'react-i18next';
import Spinner from '../../components/spinner';


class ProfileChangePasswordContainer extends React.Component {
  state = {
    newPassword: '',
    newPasswordConfirm: '',
    oldPassword: '',
    isLoading: false,
  }

  handleChangeOldPassword = value => {
    this.setState({
      oldPassword: value
    });
  }

  handleChangeNewPassword = value => {
    this.setState({
      newPassword: value
    });
  };

  handleChangeNewPasswordConfirm = value => {
    this.setState({
      newPasswordConfirm: value
    });
  };

  handleSubmit = () => {
    const { authData, t, navigation } = this.props;
    const { newPassword, newPasswordConfirm, oldPassword } = this.state;
    Keyboard.dismiss();
    if (newPassword === newPasswordConfirm && newPassword !== '') {
      if (authData) {
        this.setState({
          isLoading: true
        });
        AuthService.changePassword(authData.token, oldPassword, newPassword)
        .then(res => {
          this.setState({
            isLoading: false
          });
          Toast.show({
            text: t('passwordChanged'),
            duration: 3000,
            position: 'bottom'
          })
          navigation.goBack();
        })
        .catch(err => {
          console.error(err);
        })
      }
    } else {
      Toast.show({
        text: t('passwordIsNotSimilar'),
        duration: 3000,
        position: 'top'
      })
    }
  };

  render() {
    const {
      oldPassword,
      newPassword,
      newPasswordConfirm,
      isLoading
    } = this.state;

    if (isLoading) {
      return <Spinner/>
    }

    return (
      <ProfileChangePasswordView
        onFormPressed={() => { Keyboard.dismiss() }}
        oldPassword={oldPassword}
        newPassword={newPassword}
        newPasswordConfirm={newPasswordConfirm}
        onChangeOldPassword={this.handleChangeOldPassword}
        onChangeNewPassword={this.handleChangeNewPassword}
        onChangeNewPasswordConfirm={this.handleChangeNewPasswordConfirm}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth.authData
});

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation()
)(ProfileChangePasswordContainer);
