import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import SettingsView from './settings-view';
import { setLanguage, setTheme } from '../../store/actions/app-actions';
import AsyncStorageService from '../../services/async-storage-service';

class SettingsContainer extends React.Component {

  state = {
    isUsePin: false,
  };

  lastTapVersion = null;
  lastTapVersionCount = 0;

  handleCityClick = () => {
    const { navigation } = this.props;
    navigation.navigate('SettingsCity');
  };

  handleLanguageClick = () => {
    const { navigation } = this.props;
    navigation.navigate('SettingsLanguage');
  };

  handleSetPinClick = () => {
    const { navigation } = this.props;
    navigation.navigate('EnterPin');
  };


  handleThemeClick = () => {

  };

  componentDidMount() {

  }

  handleVersionClick = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 400;
    if (this.lastTapVersion && (now - this.lastTapVersion) < DOUBLE_PRESS_DELAY) {
      this.lastTapVersionCount++;
      this.lastTapVersion = now;
      if (this.lastTapVersionCount === 6) {
        alert('BAE');
        AsyncStorageService.clear();
      }
    } else {
      // if (__DEV__) {
      //   navigation.navigate('TestScreen');
      // }
      this.lastTapVersion = now;
      this.lastTapVersionCount = 0;
    }
  };

  render() {
    const { isUsePin } = this.state;
    return (
      <SettingsView
        {...this.props}
        onSetPinClick={this.handleSetPinClick}
        onVersionClick={this.handleVersionClick}
        onCityClick={this.handleCityClick}
        onLanguageClick={this.handleLanguageClick}
        onThemeClick={this.handleThemeClick}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const selectedCity = state.city.cities.find(
    currentValue => currentValue.id === state.city.selectedCity
  );
  return {
    selectedCity,
    language: state.app.language,
    theme: state.app.theme
  };
};

export default compose(connect(mapStateToProps), withNavigation)(SettingsContainer);
