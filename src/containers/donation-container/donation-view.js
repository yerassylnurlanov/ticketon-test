import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet, TouchableOpacity
} from 'react-native';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    marginTop: 32,
    marginHorizontal: 16,
  },
  errorLabel: {
    marginHorizontal: 16,
    color: 'red',
  },
  submitButton: {
    margin: 16,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.appBar
  },
  submitButtonLabel: {
    color: 'white',
    fontWeight: 'bold'
  }
});

const DonationView = (
  {
    placeId,
    handleDonate,
    theme
  }
) => {
  const { t } = useTranslation();
  const styles = getStyles(theme);

  const DonationSchema = Yup.object().shape({
    name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required(t('required')),
    email: Yup.string()
    .email(t('emailInvalid'))
    .required(t('required')),
    phone: Yup.string()
    .required(t('required')),
    donationSum: Yup.number()
    .min(1000, t('minDonation'))
    .required(t('required')),
  });

  return (
    <View style={styles.root}>
      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          donationSum: 0,
          donationCurrency: 0,
        }}
        validationSchema={DonationSchema}
        onSubmit={values => handleDonate({...values, placeId})}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.root}>
            <TextInput
              placeholder={t('nickname')}
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {errors.name && touched.name ? (
              <Text style={styles.errorLabel}>{errors.name}</Text>
            ) : null}
            <TextInput
              placeholder={t('email')}
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            {errors.email && touched.email ? (
              <Text style={styles.errorLabel}>{errors.email}</Text>
            ) : null}
            <TextInput
              placeholder={t('phoneNumber')}
              style={styles.input}
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
            />
            {errors.phone && touched.phone ? (
              <Text style={styles.errorLabel}>{errors.phone}</Text>
            ) : null}
            <TextInput
              placeholder={t('donationSum')}
              style={styles.input}
              onChangeText={handleChange('donationSum')}
              onBlur={handleBlur('donationSum')}
              value={values.donationSum}
            />
            {errors.donationSum && touched.donationSum ? (
              <Text style={styles.errorLabel}>{errors.donationSum}</Text>
            ) : null}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonLabel}>{t('donation')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default withTheme(DonationView);
