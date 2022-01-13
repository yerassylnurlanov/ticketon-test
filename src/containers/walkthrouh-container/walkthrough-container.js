import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import WalkthroughView from './walkthrough-view';
import { getCityList as getCityListAction, selectCity } from '../../store/actions/city-actions';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';
import { withTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart';

class WalkthroughContainer extends React.Component {
  state = {
    currentStep: 0,
    steps: [

    ]
  };

  componentDidMount() {
    const { getCityList, language } = this.props;
    getCityList(language);
  }

  handleNextPressed = () => {
    this.setState(preState => ({
      currentStep: preState.currentStep + 1
    }));
  };

  handleStartPressed = () => {
    const { navigation } = this.props;
    navigation.navigate('Home');
  };

  handleCityChange = (itemValue, itemIndex) => {
    const { selectCity } = this.props;
    selectCity(itemValue);
  };

  render() {
    const { selectedCity, cities, isLoading, error, t } = this.props;

    if (isLoading) {
      // return <Spinner/>
    }

    if (error) {
      return <ErrorComponent errorText={'connectToInternet'} submitText={t('refresh')} onSubmit={() => {
        RNRestart.Restart();
      }}/>
    }

    return (
      <WalkthroughView
        {...this.state}
        isLoadingCities={isLoading}
        handleCityChange={this.handleCityChange}
        handleNextPressed={this.handleNextPressed}
        handleStartPressed={this.handleStartPressed}
        cities={cities}
        selectedCity={selectedCity}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { city } = state;
  const { language } = state.app;
  return { ...city, language };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getCityList: getCityListAction,
    selectCity
  }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withNavigation
)(WalkthroughContainer);
