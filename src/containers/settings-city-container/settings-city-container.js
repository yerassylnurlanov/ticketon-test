import React from 'react';
import SettingsCityView from './settings-city-view';
import {bindActionCreators, compose} from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { selectCity as selectCityAction, selectCityAndSave } from '../../store/actions/city-actions';
import { getHomepage as getHomepageAction } from '../../store/actions/home-actions';
import { getEventsByCategory } from '../../store/actions/events-actions';
import { getCategoriesAndPlaces } from '../../store/actions/places-actions';

class SettingsCityContainer extends React.Component {
  state = {
    query: ''
  };

  selectCity = (id) => {
    const { getHomepage, selectCity, refreshPlaces, language, selectedCategory, refreshEvents, navigation } = this.props;
    selectCity(id);
    getHomepage(language, id);
    refreshEvents(selectedCategory, language, id, 1, 100);
    refreshPlaces(id, language);
    navigation.goBack();
  };

  componentDidMount() {

  }

  onChangeQuery = (query) => {
    this.setState({
      query
    });
  };

  render() {
    const { cities, selectedCity } = this.props;
    const { query } = this.state;
    return (
      <SettingsCityView
        onChangeQuery={this.onChangeQuery}
        query={query}
        cities={cities.filter(el => el.name.toLowerCase().includes(query.toLowerCase(), 0))}
        selectedCity={selectedCity}
        handleSelectCity={this.selectCity}
      />
    );
  }
}

const mapStateToProps = state => ({
  cities: state.city.cities,
  selectedCity: state.city.selectedCity,
  language: state.app.language,
  selectedCategory: state.events.selectedCategory
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectCity: selectCityAndSave,
  refreshEvents: getEventsByCategory,
  refreshPlaces: getCategoriesAndPlaces,
  getHomepage: getHomepageAction
}, dispatch);

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsCityContainer);
