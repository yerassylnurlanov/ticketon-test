import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import PlacesView from './places-view';
import { withNavigation } from 'react-navigation';
import { getCategories } from '../../store/actions/categories-actions';
import { getPlaces, getCategoriesAndPlaces } from '../../store/actions/places-actions';
import Spinner from '../../components/spinner';
import ErrorIndicator from '../../components/error-indicator';

class PlacesContainer extends React.Component {
  state = {
    selectedTab: 0
  };

  componentDidMount() {
    const {
      language,
      categories,
      selectedCity,
      getCategoriesAndPlaces
    } = this.props;
    getCategoriesAndPlaces(selectedCity, language);
  }

  handlePlaceSelect = (place) => {
    const { navigation } = this.props;
    navigation.navigate('Place', { place });
  };

  handleChangeTab = (obj) => {
    const { categories, selectedCity, language, getPlaces } = this.props;
    getPlaces(categories.categories[obj.i].key, selectedCity, language);
  };

  handleBuildRoad = () => {

  };

  render() {
    const {
      isLoading,
      error,
      language,
      selectedTab,
      categories,
      places,
      selectedCategory
    } = this.props;

    return (
      <PlacesView
        isLoadingCategories={categories.isLoading}
        isLoadingPlaces={isLoading}
        errorCategories={categories.error}
        errorPlaces={error}
        places={places}
        categories={categories}
        selectedTab={selectedTab}
        handlePlaceSelect={this.handlePlaceSelect}
        handleChangeTab={this.handleChangeTab}
      />
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.places.isLoading,
  error: state.places.error,
  language: state.app.language,
  categories: state.categories,
  places: state.places,
  selectedCategory: state.places.selectedCategory,
  selectedCity: state.city.selectedCity,
  selectedTab: state.categories.categories.findIndex(el => el.key === state.places.selectedCategory)
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getCategories,
  getPlaces,
  getCategoriesAndPlaces
}, dispatch);

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(PlacesContainer);
