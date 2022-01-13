import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  Form,
  Item,
  Input,
  Label,
  Button
} from 'native-base';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  submitBtn: {
    marginHorizontal: 8,
    marginTop: 20,
    backgroundColor: theme.appBar
  }
});

const ProfileUseNameView = ({
  t,
  firstName,
  lastName,
  theme,
  handleSubmit,
  handleFirstNameChange,
  handleLastNameChange
}) => {
  const styles = getStyles(theme);
  return (
    <View>
      <Form>
        <Item floatingLabel>
          <Label>{t('firstName')}</Label>
          <Input value={firstName} onChangeText={handleFirstNameChange} />
        </Item>
        <Item floatingLabel last>
          <Label>{t('lastName')}</Label>
          <Input value={lastName} onChangeText={handleLastNameChange} />
        </Item>
        <Button block style={styles.submitBtn} onPress={handleSubmit}>
          <Text>{t('confirm')}</Text>
        </Button>
      </Form>
    </View>
  );
};

export default compose(withTranslation(), withTheme)(ProfileUseNameView);
