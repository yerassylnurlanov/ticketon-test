import React, { Component } from 'react';
import {
  View,
  Text, AsyncStorage, StyleSheet
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { withTranslation } from 'react-i18next';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import AsyncStorageService from '../../services/async-storage-service';

class FingerprintAuthorization extends Component {
  state = {
    isUsePin: null,
    pin: '',
    errorMessage: null,
  }

  pinInput = React.createRef();

  _checkCode = (code) => {
    const { t } = this.props;
    const { pin } = this.state;
    if (code !== pin) {
      this.pinInput.current.shake()
      .then(() => {
        this.setState({
          pin: '',
          errorMessage: t('incorrectPin')
        });
      });
    } else {
      this.handleSuccess();
    }
  }

  handleSuccess = () => {
    const { finishProcess } = this.props;
    finishProcess();
  }

  initFingerprint = () => {
    FingerprintScanner.authenticate({
      description: 'Scan your finger',
    })
    .then(() => {
      this.handleSuccess();
    })
    .catch((error) => {
      this.setState({
        // errorMessage: error
      });
    });
  }

  componentDidMount() {
    AsyncStorageService.getUsePin()
    .then((data) => {
      this.setState({
        isUsePin: data
      });

      if (data) {
        AsyncStorageService.getUserPin()
        .then(data => {
          this.setState({
            pin: data
          });

          this.initFingerprint();
        })
        .catch(error => {
          this.setState({
            isUsePin: false
          })
        });
      } else {
        this.handleSuccess();
      }
    })
    .catch((error) => {
      this.setState({
        isUsePin: false
      });
    });
  }

  render() {
    const { code, errorMessage } = this.state;
    const { t } = this.props;
    return (
      <View style={styles.container}>
        <Text
          style={styles.titleText}
        >
          {t('enterYourPin')}
        </Text>
        <View style={styles.inputContainer}>
          <SmoothPinCodeInput
            ref={this.pinInput}
            value={code}
            onTextChange={code => this.setState({ code })}
            onFulfill={this._checkCode}
            onBackspace={() => console.log('No more back.')}
          />
        </View>
        <Text>{errorMessage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitleText: {
    fontSize: 20,
    fontWeight: '100',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  errorText: {

  }
});

export default withTranslation()(FingerprintAuthorization);
