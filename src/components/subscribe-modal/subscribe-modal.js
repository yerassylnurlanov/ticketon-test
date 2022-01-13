import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  Platform,
  Keyboard
} from 'react-native';
import { compose } from 'redux';
import { Icon, CheckBox, ListItem, Body } from 'native-base';
import PropTypes from 'prop-types';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';
import Checkbox from 'react-native-material-ui/src/Checkbox';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.8)'
  },
  container: {
    padding: 24,
    backgroundColor: 'white',
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0
  },
  closeBtn: {
    position: 'absolute',
    top: -10,
    right: 25,
    backgroundColor: theme.appBar,
    width: 30,
    height: 30,
  },
  closeBtnText: {
    flex: 1,
    color: 'white',
    textAlign: 'center'
  },
  header: {
    // flex: 1,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.1,
    width: '75%'
  },
  description: {
    paddingTop: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 17,
    opacity: 0.6,
    letterSpacing: 0.1,
    width: '75%'
  },
  inputContainer: {
    // backgroundColor: 'red'
  },
  inputUnselected: {
    width: '100%',
    borderBottomWidth: (Platform.OS === 'ios') ? 2 : 0,
    borderBottomColor: 'grey',
    paddingBottom: 6,
    marginBottom: 12,
    color: 'black',
    // borderBottomColor:
    fontSize: 18,
  },
  inputSelected: {
    width: '100%',
    borderBottomWidth: (Platform.OS === 'ios') ? 2 : 0,
    borderBottomColor: 'orange',
    paddingBottom: 6,
    marginBottom: 12,
    color: 'black',
    // borderBottomColor:
    fontSize: 18,
  },
  subscribeButton: {
    backgroundColor: theme.appBar,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.02,
    color: 'white',
  },
  checkbox: {
  },
  checkboxLabel: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 17,
    opacity: 0.6,
    letterSpacing: 0.1,
  }
});

class SubscribeModal extends React.Component {
  state={
    email: '',
    phoneNumber: '',
    agreed: false,
    isEmailInputSelected: false,
    isPhoneInputSelected: false
  };

  componentDidMount() {
    const { email } = this.props;
    if (email) {
      this.setState({email});
    }
  }

  handleChangeEmail = (email) => {
    this.setState({
      email: email,
    });
  }

  handleChangePhoneNumber = (phone) => {
    this.setState({
      phoneNumber: phone,
    });
  }

  handleAgreementChecked = () => {
    this.setState({
      agreed: !this.state.agreed
    });
  }

  render() {
    const {
      theme,
      isVisible,
      onClose,
      onSubmit,
      eventId,
      t
    } = this.props;

    const { agreed, phoneNumber, email } = this.state;
    const styles = getStyles(theme);

    return (
      <Modal
        transparent={true}
        visible={isVisible}
        animated={true}
      >
        <View style={styles.root}>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={onClose}
              style={styles.closeBtn}
            >
              <Icon
                name="close"
                style={styles.closeBtnText}
              />
            </TouchableHighlight>
            <TouchableWithoutFeedback
              onPress={() => {
                Keyboard.dismiss();
              }}
            >
            <ScrollView style={{ flex: 1 }}>
              <Text style={styles.header}>Продажа на это событие скоро откроется</Text>
              <Text style={styles.description}>Мы можем уведомить вас о начале Продаж, чтобы вы успели выбрать лучшие места</Text>
              <View style={styles.inputContainer}>
                <Text style={styles.description}>{t('email')+':'}</Text>
                <TextInput
                  autoCompleteType="email"
                  onFocus={() => {
                    this.setState({
                      isEmailInputSelected: true
                    });
                  }}
                  onEndEditing={() => {
                    this.setState({
                      isEmailInputSelected: false
                    });
                  }}
                  keyboardType="email-address"
                  value={this.state.email}
                  onChangeText={text => this.handleChangeEmail(text)}
                  style={(this.state.isEmailInputSelected) ? styles.inputSelected : styles.inputUnselected}
                />
                <Text style={styles.description}>{t('phoneNumber')+':'}</Text>
                <TextInput
                  autoCompleteType="tel"
                  keyboardType="phone-pad"
                  onFocus={() => {
                    this.setState({
                      isPhoneInputSelected: true
                    });
                  }}
                  onEndEditing={() => {
                    this.setState({
                      isPhoneInputSelected: false
                    });
                  }}
                  value={this.state.phoneNumber}
                  onChangeText={text => this.handleChangePhoneNumber(text)}
                  style={(this.state.isPhoneInputSelected) ? styles.inputSelected : styles.inputUnselected}
                />
              </View>
              <Checkbox
                label={t('agreed')}
                checked={this.state.agreed}
                onCheck={this.handleAgreementChecked}
                style={{
                  label: styles.checkboxLabel,
                  icon: {
                    color: 'orange',
                  },
                  container: {
                    flex: 0,
                  }
                }}
              />
            </ScrollView>
            </TouchableWithoutFeedback>
            <TouchableHighlight
              style={styles.subscribeButton}
              onPress={() => {
                if (agreed) {
                  onSubmit(eventId, email, phoneNumber);
                } else {

                }
              }}
            >
              <Text style={styles.subscribeButtonText}>{t('subscribe')}</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
  }
}

SubscribeModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default compose(withTheme, withTranslation())(SubscribeModal);
