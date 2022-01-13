import React from 'react';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import analytics from '@react-native-firebase/analytics';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import SearchView from './search-view';
import { search as searchAction } from '../../store/actions/search-actions';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';
import NoResultsComponent from '../../components/no-results-component';

class SearchContainer extends React.Component {

  componentDidMount() {
    const {
      search,
      navigation,
      query,
      language
    } = this.props;
    search(query, language);
    const params = {
      search_term: query
    };
    analytics().logEvent("search", params);
  }

  resultSelectHandle = (type, event) => {
    const { navigation } = this.props;

    if (type === 'event') {
      navigation.navigate('Push', {
        id: event.event_id,
        title: event.event_name,
        eventPassed: event,
      });
    }
  }

  render() {
    const {
      isLoading,
      searchResults,
      error,
      theme,
      title,
      navigation,
      t
    } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    if (error !== null) {
      return <ErrorComponent errorText={error} />;
    }

    if (searchResults.length === 0) {
      return (
        <NoResultsComponent/>
      );
    }

    return (
      <SearchView
        resultSelectHandle={this.resultSelectHandle}
        searchResults={searchResults.filter(el => el.type === 'event')}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.search,
  language: state.app.language
});

const mapDispatchToProps = dispatch => bindActionCreators({
  search: searchAction
}, dispatch);

export default compose(withTheme, withTranslation(), withNavigation, connect(mapStateToProps, mapDispatchToProps))(SearchContainer);
