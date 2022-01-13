import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform
} from 'react-native';
import {
  compose
} from 'redux';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    color: 'black',
    marginHorizontal: 16,
    marginTop: hp(5),
    paddingBottom: 5,
    borderBottomColor: theme.fontMain,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0
  },
  submitBtn: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.appBar,
    borderRadius: 5
  }
});

const RestorePasswordView = (
  {
    onSubmit,
    email,
    onEmailChange,
    theme,
    t
  }
) => {
  const styles = getStyles(theme);
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => { Keyboard.dismiss(); }}
    >
      <View style={styles.root}>
        <TextInput
          placeholderTextColor="grey"
          underlineColorAndroid="black"
          style={styles.input}
          placeholder={t('email')}
          onChangeText={onEmailChange}
          keyboardType="email-address"
          value={email}
        />
        <View>
          <TouchableOpacity
            onPress={onSubmit}
            style={styles.submitBtn}
          >
            <Text style={{ color: 'white' }}>{t('restore')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

RestorePasswordView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  onEmailChange: PropTypes.func.isRequired,
};

export default compose(withTheme, withTranslation())(RestorePasswordView);
