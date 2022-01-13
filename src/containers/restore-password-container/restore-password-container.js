import React from 'react';
import { Keyboard } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Toast } from 'native-base';
import RestorePasswordView from './restore-password-view';
import AuthService from '../../services/auth-service';
import Spinner from '../../components/spinner';
import { withTranslation } from 'react-i18next';

class RestorePasswordContainer extends React.Component {
  state={
    isLoading: false,
    email: ''
  };

  handleEmailChange = (email) => {
    this.setState({
      email
    });
  };

  handleSubmit = () => {
    const { email } = this.state;
    const { navigation, t } = this.props;

    Keyboard.dismiss();

    if (email === '') {
      Toast.show({
        text: t('enterEmail'),
        duration: 3000,
        position: 'bottom'
      });
      return;
    }

    this.setState({
      isLoading: true
    });
    AuthService.restorePassword(email)
      .then(res => {
        this.setState({
          isLoading: false
        });
        navigation.goBack();
        Toast.show({
          text: t('recoveryMessageSend'),
          duration: 3000,
          position: 'bottom'
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        console.error(err);
      });
  };

  render() {
    const {
      email,
      isLoading
    } = this.state;

    if (isLoading) {
      return <Spinner/>;
    }

    return (
      <RestorePasswordView
        email={email}
        onEmailChange={this.handleEmailChange}
        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default withTranslation()(withNavigation(RestorePasswordContainer));
