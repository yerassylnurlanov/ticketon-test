import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { setLanguage } from '../../store/actions/app-actions';
import SettingsLanguageView from './settings-language-view';
import { getHomepage as getHomepageAction } from '../../store/actions/home-actions';
import { getEventsByCategory } from '../../store/actions/events-actions';

class SettingsLanguageContainer extends React.Component {
  selectLanguage = (lang) => {
    const { selectedCity, handleLanguageSelect, refreshEvents, selectedCategory, getHomepage, navigation } = this.props;
    handleLanguageSelect(lang);
    getHomepage(lang, selectedCity);
    refreshEvents(selectedCategory, lang, selectedCity, 1, 100);
    navigation.goBack();
  }

  render() {
    const { selectedLanguage } = this.props;
    return (
      <SettingsLanguageView
        selectedLanguage={selectedLanguage}
        handleLanguageSelect={this.selectLanguage}
      />
    );
  }
}

const mapStateToProps = state => ({
  selectedLanguage: state.app.language,
  selectedCity: state.city.selectedCity,
  selectedCategory: state.events.selectedCategory,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  handleLanguageSelect: setLanguage,
  getHomepage: getHomepageAction,
  refreshEvents: getEventsByCategory
}, dispatch);

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsLanguageContainer);
