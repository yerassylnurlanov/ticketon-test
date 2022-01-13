import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    margin: 16
  },
  input: {
    color: 'black',
    marginHorizontal: 16,
    marginTop: hp(5),
    paddingBottom: 5,
    borderBottomColor: 'black',
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0
  },
  submitBtn: {
    backgroundColor: theme.appBar,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    height: 50
  }
});

const ProfileChangePasswordView = (
  {
    oldPassword,
    newPassword,
    onChangeOldPassword,
    onChangeNewPassword,
    newPasswordConfirm,
    onChangeNewPasswordConfirm,
    onFormPressed,
    onSubmit,
    t,
    theme
  }
) => {
  const styles = getStyles(theme);
  return (
    <TouchableWithoutFeedback onPress={onFormPressed}>
      <View style={styles.root}>
        <TextInput
          placeholderTextColor="grey"
          secureTextEntry
          style={styles.input}
          placeholder={t('oldPassword')}
          value={oldPassword}
          onChangeText={onChangeOldPassword}
        />
        <TextInput
          placeholderTextColor="grey"
          secureTextEntry
          style={styles.input}
          placeholder={t('newPassword')}
          value={newPassword}
          onChangeText={onChangeNewPassword}
        />
        <TextInput
          placeholderTextColor="grey"
          secureTextEntry
          style={styles.input}
          placeholder={t('newPasswordConfirm')}
          value={newPasswordConfirm}
          onChangeText={onChangeNewPasswordConfirm}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={onSubmit}
        >
          <Text style={{ color: 'white' }}>
            {t('changePassword')}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default compose(
  withTranslation(),
  withTheme
)(ProfileChangePasswordView);
