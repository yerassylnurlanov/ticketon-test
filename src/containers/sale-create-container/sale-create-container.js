import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  compose,
  bindActionCreators
} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Toast
} from 'native-base';
import { withNavigation } from 'react-navigation';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { saleCreate as saleCreateAction } from '../../store/actions/sale-actions';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';
import SaleCreateView from './sale-create-view';
import { Icon } from 'native-base';
import SaleService from '../../services/sale-service';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import TokenService from '../../services/token-service';

const countries = {
  'kz': { id: 110, value: '+7' },
  'kg': { id: 116, value: '+996' },
  'uz': { id: 998, value: '+998' },
  'tj': { id: 205, value: '+992' },
  'ru': { id: 176, value: '+7' }
};


class SaleCreateContainer extends React.Component {
  state = {
    insuranceChecked: false,
    insurance: null,
    modalVisible: false,
    agreementChecked: false,
    selectedPayment: null,
    email: '',
    phoneNumber: '',
    isEmailValid: true,
    isPhoneNumberValid: true,
    promo: '',
    discount: 0,
    cashback: 0,
    bonuses: 0,
    selectedDiscountType: null,
    selectedCountry: 'kz'
  };

  handleDiscountChange = (value) => {
    if (this.state.selectedDiscountType === value) {
      this.setState({
        selectedDiscountType: null
      });
      return;
    }
    this.setState({
      selectedDiscountType: value
    });
  }

  componentDidMount() {
    const {
      theme,
      selectedSeats,
      saleCreate,
      language,
      sessionId,
      navigation,
      profile,
      authData,
      t
    } = this.props;

    navigation.setParams({
      backButton: (
        <TouchableOpacity style={{ flex:1,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3, }} onPress={this.handleBack}>
          <Icon
            style={{
              color: 'white',
              padding: -1,
              marginRight: -5,
              marginLeft: (Platform.OS === 'ios') ? -1 : 16,
              fontSize: (Platform.OS === 'ios') ? 34 : 24,
              fontWeight: (Platform.OS === 'ios') ? '800' : '400'
            }}
            type="Ionicons"
            ios="chevron-back"
            android="arrow-back"
          />
          {(Platform.OS === 'ios') ? (<Text style={{ color: 'white', fontSize: 17, fontWeight: '400', marginBottom: 3 }}>{t('back')}</Text>) : null}
        </TouchableOpacity>
      )
    });

    if (profile) {
      this.setState({
        email: profile.email,
        phoneNumber: (profile.phone) ? profile.phone.toString().substring(1) : '',
        agreementChecked: true
      });
    } else {
      this.getData();
    }

    const seats = selectedSeats.map(seat =>
      `${seat.level}-${seat.row}-${seat.num}-${seat.discountType}-${(seat.purchaseCount)? seat.purchaseCount: 0}`
    );
    saleCreate(sessionId, seats, language, firebase.iid().get())
    .then(res => {

      if (res.payload) {
        SaleService.saleInsurance(res.payload.sale)
        .then(data => {
          this.setState({
            insurance: data.data
          });
        })
        .catch();
      }
      this.updateDiscount();
    });
  }

  getData = async () => {
    try {
      const email = await AsyncStorage.getItem('@email');
      const phone = await AsyncStorage.getItem('@phone');
      const agreement = await AsyncStorage.getItem('@agreement');
      if (email !== null) {
        this.setState({ email: email });
      }
      if (phone !== null) {
        this.setState({ phoneNumber: phone });
      }
      if (agreement) {
        this.setState({
          agreementChecked: agreement === 'yes'
        });
      }
    } catch (e) {
      // error reading value
    }
  }

  writeData = async (email, phone, agreement) => {
    try {
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@phone', phone);
      await AsyncStorage.setItem('@agreement', agreement);
    } catch (e) {
      // saving error
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { createData } = this.props;
    if (!prevProps.createData && createData) {
      this.setState({
        selectedPayment: createData.order_types[0].type
      });
    }
    this.updateDiscount();
  }

  updateDiscount = _ => {
    const { profile, authData, createData } = this.props;
    const {
      email,
      phoneNumber,
      selectedPayment,
      promo,
      language,
      selectedCountry
    } = this.state;

    let tlsUser = null;
    if (profile && authData) {
      tlsUser = {
        userId: authData.userId,
        authToken: authData.token,
        email: profile.email,
        name: profile.nickname
      };
    }

    if (createData !== null) {
      SaleService.saleDiscount(createData.sale, email.toLowerCase(), countries[selectedCountry] + phoneNumber, selectedPayment, selectedCountry, promo, language, tlsUser)
      .then(res => {
        this.setState({
          discount: res.data.discount,
          cashback: res.data.cashback,
          bonuses: res.data.bonuses
        });
      })
      .catch(err => console.error(err.message));
    }
  };

  handleChangeEmail = value => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(re.test(value));

    this.setState({
      email: value.trim().toLowerCase(),
      isEmailValid: re.test(value.toLowerCase())
    });
    this.updateDiscount();
  };

  handlePhoneNumberChange = value => {
    const re = /^\d{10}$/g;
    const { selectedCountry } = this.state;
    const trimVal = value.trim();
    this.setState({
      phoneNumber: trimVal,
      isPhoneNumberValid: re.test(trimVal)
    });
    this.updateDiscount();
  };

  handlePromoChange = value => {
    this.setState({
      promo: value.trim()
    });
    this.updateDiscount();
  };

  handleBack = _ => {
    const { navigation, createData } = this.props;
    navigation.goBack();
    try {
      if (createData.sale) {
        SaleService.saleCancel(createData.sale)
        .then(res => console.log())
        .catch(err => console.error(err.message));
      }
    } catch (e) {

    }
  };

  handleInsurance = () => {
    this.setState({
      insuranceChecked: !this.state.insuranceChecked
    })
  }

  handleAgreementChecked = _ => {
    this.setState(prevState => ({
      agreementChecked: !prevState.agreementChecked
    }));
    this.updateDiscount();
  };

  handleSubmit = _ => {
    const {
      navigation,
      createData,
      authData,
      profile,
      eventName,
      t
    } = this.props;
    const {
      isEmailValid,
      isPhoneNumberValid,
      selectedPayment,
      email,
      phoneNumber,
      promo,
      selectedDiscountType,
      selectedCountry,
      insurance,
      insuranceChecked
    } = this.state;


    if (!selectedPayment) {
      Toast.show({
        text: t('selectPaymentType'),
        duration: 3000,
        position: 'bottom'
      });
      return;
    } else if (!isEmailValid || email === '') {
      Toast.show({
        text: t('emailInvalid'),
        duration: 3000,
        position: 'bottom'
      });
      return;
    } else if (!isPhoneNumberValid || phoneNumber === '') {
      Toast.show({
        text: t('phoneInvalid'),
        duration: 3000,
        position: 'bottom'
      });
      return;
    }

    this.writeData(email, phoneNumber, 'yes');

    TokenService.getTokenFromMemory()
      .then((token) => {
        firebase.analytics().logEvent("purchase", {
          sale: createData.sale,
          name: eventName,
          price: createData.sum,
          type: selectedPayment,
          email: email,
          phone: phoneNumber,
          promo: promo,
          authorized: (authData && profile)
        });
        if (insurance && insuranceChecked && insurance.insurancePrice) {
          SaleService.acceptInsurance(createData.sale, insurance.insurancePrice)
          .then(data => {
            navigation.navigate('SaleConfirm', {
              url: `https://api.ticketon.kz/sale_confirm?sale=${createData.sale}&type=${selectedPayment}&email=${email}&token=${token}`+
                `&phone=${phoneNumber}&version=${'0.2.0'}&promo-check=${(selectedDiscountType === 'promo')}&promo=${promo}&country=${countries[selectedCountry].id}`+
                `&discounted=${selectedDiscountType === 'discount' || selectedDiscountType === 'promo'}&useBonuses=${selectedDiscountType === 'bonus'}` +
                ((authData && profile) ? `&tlsUser[userId]=${authData.userId}&&tlsUser[authToken]=${authData.token}&tlsUser[email]=${profile.email}&tlsUser[name]=${profile.nickname}&appGaId=${firebase.iid()}` : '')
            });
          })
          .catch(err => console.error(err));
        } else {
          navigation.navigate('SaleConfirm', {
            url: `https://api.ticketon.kz/sale_confirm?sale=${createData.sale}&type=${selectedPayment}&email=${email}&token=${token}`+
              `&phone=${phoneNumber}&version=${'0.2.0'}&promo-check=${(selectedDiscountType === 'promo')}&promo=${promo}&country=${countries[selectedCountry].id}`+
              `&discounted=${selectedDiscountType === 'discount' || selectedDiscountType === 'promo'}&useBonuses=${selectedDiscountType === 'bonus'}` +
              ((authData && profile) ? `&tlsUser[userId]=${authData.userId}&&tlsUser[authToken]=${authData.token}&tlsUser[email]=${profile.email}&tlsUser[name]=${profile.nickname}&appGaId=${firebase.iid()}` : '')
          });
        }
      })
      .catch(err => console.error(err.message));
  };

  handleSelectedPaymentChange = value => {
    this.setState({
      selectedPayment: value
    });
  };

  handleCountryChange = value => {
    const re = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;
    const { phoneNumber } = this.state;
    this.setState({
      selectedCountry: value,
      isPhoneNumberValid: re.test(countries[value] + phoneNumber)
    });
    this.updateDiscount();
  };

  render() {
    const {
      isLoading,
      createData,
      error,
      eventName,
      placeName,
      session,
      profile,
      currency,
      expire
    } = this.props;

    const isEmailEditable = profile && profile.email ? false : true;
    const isPhoneNumberEditable = profile && profile.phone ? false : true;

    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorComponent errorText={error} />;
    }

    if (createData.error) {
      return <ErrorComponent errorText={createData.error} />;
    }

    return (
      <SaleCreateView
        changeInsurance={this.handleInsurance}
        expire={expire}
        currency={currency}
        {...createData}
        {...this.state}
        profile={profile}
        isEmailEditable={isEmailEditable}
        isPhoneNumberEditable={isPhoneNumberEditable}
        eventName={eventName}
        placeName={placeName}
        session={session}
        onAgreementChecked={this.handleAgreementChecked}
        onSelectedPaymentChange={this.handleSelectedPaymentChange}
        onEmailEdit={this.handleChangeEmail}
        onPhoneNumberEdit={this.handlePhoneNumberChange}
        onPromoEdit={this.handlePromoChange}
        onCountryChange={this.handleCountryChange}
        onSubmit={this.handleSubmit}
        onDiscountChange={this.handleDiscountChange}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.sale,
  language: state.app.language,
  profile: state.auth.profile,
  authData: state.auth.authData
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      saleCreate: saleCreateAction
    },
    dispatch
  );

export default compose(
  withTranslation(),
  withNavigation,
  withTheme,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SaleCreateContainer);
