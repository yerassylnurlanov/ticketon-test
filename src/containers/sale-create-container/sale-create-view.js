import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Platform,
  Modal,
  KeyboardAvoidingView
} from 'react-native';
import {
  Icon,
  CheckBox,
  Picker,
  ListItem,
  Radio,
  Right,
  Left,
  Content,
  Text as NbText
} from 'native-base';
import {
  withNavigation
} from 'react-navigation';
import CountDown from 'react-native-countdown-component';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.homeBackground
  },
  descriptionContainer: {
    padding: 16,
    backgroundColor: 'white'
  },
  descriptionLabelTitle: {
    color: theme.fontDesc
  },
  eventNameLabel: {
    color: theme.fontMain,
    fontWeight: '500',
    fontSize: hp(2.6),
    marginBottom: 8
  },
  eventPriceLabel: {
    color: theme.fontMain,
    fontWeight: '500',
    fontSize: hp(2.6),
    marginBottom: 8
  },
  descriptionLabel: {
    color: theme.fontMain,
    fontWeight: '600',
    fontSize: hp(2),
    marginBottom: 8
  },
  formContainer: {
    padding: 16,
  },
  input: {
    paddingBottom: 5,
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0
  },
  invalidInput: {
    color: 'black',
    paddingBottom: 5,
    borderBottomWidth: Platform.OS === 'ios' ? 0.5 : 0,
    borderBottomColor: 'red'
  },
  inputDescription: {
    fontSize: hp(1.5),
    color: theme.fontDesc,
    marginBottom: 16,
  },
  separator: {
    padding: 16,
    // width: '100%',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: theme.mainBackground,
  },
  separatorText: {
    fontWeight: '600'
  },
  checkBoxField: {
    marginLeft: 8,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBoxLabel: {
    marginLeft: 20,
  },
  confirmButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    marginBottom: 16
  },
  confirmButtonActive: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.fontDesc,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButtonLabelActive: {
    color: theme.homeBackground,
    fontWeight: '500',
    fontSize: hp(2)
  },
  confirmButtonInactive: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: theme.appBar,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmButtonLabelInactive: {
    color: 'black',
    fontWeight: '500',
    fontSize: hp(2)
  }
});

const SaleCreateView = (
  {
    modalVisible,
    navigation,
    t,
    theme,
    profile,
    seats_text,
    eventName,
    placeName,
    session,
    price,
    sum,
    order_types,
    onAgreementChecked,
    agreementChecked,
    selectedPayment,
    onSelectedPaymentChange,
    email,
    phoneNumber,
    onEmailEdit,
    onPhoneNumberEdit,
    onPromoEdit,
    onSubmit,
    onDiscountChange,
    isEmailEditable,
    isPhoneNumberEditable,
    isEmailValid,
    isPhoneNumberValid,
    cashback,
    discount,
    bonuses,
    promo,
    onCountryChange,
    selectedCountry,
    selectedDiscountType,
    currency,
    expire,
    insurance,
    changeInsurance,
    insuranceChecked
  }
) => {
  const styles = getStyles(theme);
  const currencyLabel = (currency) ? t(currency) : '';
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      contentContainerStyle={{ flex: 1 }}
      behavior={(Platform.OS === 'ios') ? 'position' : 'height'}
      keyboardVerticalOffset="40"
    >
      <ScrollView
        style={styles.root}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ margin: 16 }}>
          <CountDown
            until={expire}
            size={20}
            digitStyle={{ backgroundColor: null, borderWidth: 0, borderColor: null }}
            timeLabelStyle={{ color: 'red', fontWeight: '600' }}
            // separatorStyle={{color: '#1CC625'}}
            timeToShow={['H', 'M', 'S']}
            timeLabels={{ h: null, m: null, s: null }}
            showSeparator
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabelTitle}>{t('event')}</Text>
          <Text style={styles.eventNameLabel}>{eventName}</Text>
          <Text style={styles.descriptionLabelTitle}>{t('place')}</Text>
          <Text style={styles.descriptionLabel}>{placeName}</Text>
          <Text style={styles.descriptionLabelTitle}>{t('session')}</Text>
          <Text style={styles.descriptionLabel}>{session}</Text>
          <Text style={styles.descriptionLabelTitle}>{t('placess')}</Text>
          {seats_text.map(el => (
              <Text style={styles.descriptionLabel}>
                {el}
              </Text>
            )
          )}
          {price > 5 ? (
            <>
              <Text style={styles.descriptionLabelTitle}>{t('price')}</Text>
              <Text style={styles.descriptionLabel}>{price} {currencyLabel}</Text>
              {
                (insurance && insuranceChecked && insurance.insurancePrice) ? (
                  <>
                    <Text style={styles.descriptionLabelTitle}>{t('useInsurance')}</Text>
                    <Text style={styles.descriptionLabel}>{insurance.insurancePrice} {currencyLabel}</Text>
                  </>
                ) : null
              }
              <Text style={styles.descriptionLabelTitle}>{t('interest')}</Text>
              <Text style={styles.descriptionLabel}>{sum - price} {currencyLabel}</Text>
              <View style={{ flexDirection: 'row' }}>
                <View>
                  <Text style={styles.descriptionLabelTitle}>{t('total')}</Text>
                  <Text
                    style={styles.eventPriceLabel}>{sum + ((insurance && insuranceChecked && insurance.insurancePrice) ? parseInt(insurance.insurancePrice) : 0)} {currencyLabel}</Text>
                </View>
                {(cashback) ? (
                  <View style={{ marginLeft: 25 }}>
                    <Text style={styles.descriptionLabelTitle}>{t('cashback')}</Text>
                    <Text style={styles.eventPriceLabel}>{cashback} {currencyLabel}</Text>
                  </View>
                ) : null}
                {(discount) ? (
                  <View style={{ marginLeft: 25 }}>
                    <Text style={styles.descriptionLabelTitle}>{t('discount')}</Text>
                    <Text style={styles.eventPriceLabel}>{discount} {currencyLabel}</Text>
                  </View>
                ) : null}
              </View>
            </>
          ) : null}
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholderTextColor="grey"
            style={(isEmailValid) ? styles.input : styles.invalidInput}
            underlineColorAndroid={(isEmailValid) ? 'black' : 'red'}
            placeholder="Email"
            value={email}
            onChangeText={onEmailEdit}
            // editable={isEmailEditable}
          />
          <Text style={styles.inputDescription}>{t('saleEmailDesc')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Picker
              note
              textStyle={{ color: theme.fontMain, borderBottomWidth: 0.5, fontSize: hp(2.5) }}
              style={(Platform.OS === 'ios') ? { marginVertical: -10, marginLeft: -15, marginRight: 10 } : {
                width: 75,
                marginLeft: -5
              }}
              headerBackButtonText={t('back')}
              mode="dropdown"
              placeholder={t('selectPaymentType')}
              selectedValue={selectedCountry}
              onValueChange={onCountryChange}
              iosHeader={t('selectPaymentType')}
              iosIcon={<Icon name="arrow-down"/>}
            >
              <Picker.Item label="🇰🇿 +7" value={'kz'}/>
              <Picker.Item label="🇰🇬 +996" value={'kg'}/>
              <Picker.Item label="🇺🇿 +998" value={'uz'}/>
              <Picker.Item label="🇹🇯 +992" value={'tj'}/>
            </Picker>
            <TextInput
              placeholderTextColor="grey"
              keyboardType="phone-pad"
              style={[(isPhoneNumberValid) ? styles.input : styles.invalidInput, { flex: 5 }]}
              underlineColorAndroid={(isPhoneNumberValid) ? 'black' : 'red'}
              placeholder={t('phoneNumber')}
              value={phoneNumber}
              onChangeText={onPhoneNumberEdit}
              // editable={isPhoneNumberEditable}
            />
          </View>
          <Text style={styles.inputDescription}>{t('salePhoneNumberDesc')}</Text>
        </View>
        <View style={styles.separator}>
          <Text style={styles.separatorText}>{t('paymentRules')}</Text>
          <TouchableOpacity
            style={{
              width: '100%',
              paddingVertical: 16,
            }}
            onPress={() => {
              navigation.navigate('PaymentAgreement');
            }}
          >
            <Text>{t('agreementText')}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.checkBoxField}>
          <CheckBox style={{paddingLeft: -6}} onPress={onAgreementChecked} checked={agreementChecked} color={theme.fontMain}/>
          <Text style={styles.checkBoxLabel}>{t('iAgree')}</Text>
        </View>
        {(insurance && insurance.insurance && insurance.insurancePrice) ? (
          <View style={styles.checkBoxField}>
            <CheckBox style={{paddingLeft: -6}} onPress={changeInsurance} checked={insuranceChecked} color={theme.fontMain}/>
            <Text style={styles.checkBoxLabel}>{t('useInsurance')} +{insurance.insurancePrice}</Text>
          </View>
        ) : null}
        <Content>
          {(discount > 0) ? (
            <ListItem
              onPress={() => {
                onDiscountChange('discount')
              }}
            >
              <Left>
                <NbText>{`${t('useDiscount')} ${discount}`}</NbText>
              </Left>
              <Right>
                <Radio
                  onPress={() => {
                    onDiscountChange('discount')
                  }}
                  selected={(selectedDiscountType === 'discount')}
                />
              </Right>
            </ListItem>
          ) : null}
          {(profile && profile.activeBonuses > 0) ? (
            <ListItem
              onPress={() => {
                onDiscountChange('bonus')
              }}
            >
              <Left>
                <NbText>{`${t('useBonus')} ${bonuses}`}</NbText>
              </Left>
              <Right>
                <Radio
                  onPress={() => {
                    onDiscountChange('bonus')
                  }}
                  selected={(selectedDiscountType === 'bonus')}
                />
              </Right>
            </ListItem>
          ) : null}
          {(price > 5) ? (
            <ListItem
              onPress={() => {
                onDiscountChange('promo')
              }}
            >
              <Left>
                <NbText>{t('usePromo')}</NbText>
              </Left>
              <Right>
                <Radio
                  onPress={() => {
                    onDiscountChange('promo')
                  }}
                  selected={(selectedDiscountType === 'promo')}
                />
              </Right>
            </ListItem>
          ) : null}
        </Content>
        {(selectedDiscountType === 'promo') ? (
          <View style={{ margin: 16, marginLeft: 20 }}>
            <Text>{t('promoCode')}</Text>
            <TextInput
              placeholderTextColor="grey"
              value={promo}
              onChangeText={onPromoEdit}
              style={styles.input}
              placeholder={t('enterPromo')}
            />
          </View>
        ) : null}
        <View style={styles.formContainer}>
          <Text>{t('paymentType')}</Text>
          {(Platform.OS !== 'ios') ? (
            <Picker
              note
              textStyle={{ borderBottomWidth: 0.5, color: (!selectedPayment) ? 'red' : theme.fontMain }}
              headerBackButtonText={t('back')}
              mode="dropdown"
              placeholder={t('selectPaymentType')}
              style={{ width: '100%', marginLeft: (Platform.OS === 'ios') ? -15 : 0, padding: 0 }}
              selectedValue={selectedPayment}
              onValueChange={onSelectedPaymentChange}
            >
              <Picker.Item label={t('selectPaymentType')} value={null}/>
              {order_types.map(type => (
                <Picker.Item label={type.label} value={type.type}/>
              ))}
            </Picker>
          ) : (
            <Picker
              note
              textStyle={{ borderBottomWidth: 0.5, color: (!selectedPayment) ? 'red' : theme.fontMain }}
              headerBackButtonText={t('back')}
              mode="dropdown"
              placeholder={t('selectPaymentType')}
              style={{ width: '100%', marginLeft: (Platform.OS === 'ios') ? -15 : 0, padding: 0 }}
              selectedValue={selectedPayment}
              onValueChange={onSelectedPaymentChange}
            >
              {order_types.map(type => (
                <Picker.Item label={type.label} value={type.type}/>
              ))}
            </Picker>
          )}
        </View>
        <View style={styles.confirmButtonContainer}>
          <TouchableOpacity
            onPress={onSubmit}
            disabled={!agreementChecked}
            style={(!agreementChecked) ? styles.confirmButtonActive : styles.confirmButtonInactive}
          >
            <Text
              style={(agreementChecked) ? styles.confirmButtonLabelActive : styles.confirmButtonLabelInactive}>{t('confirm')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default compose(
  withNavigation,
  withTranslation(),
  withTheme
)(SaleCreateView);
