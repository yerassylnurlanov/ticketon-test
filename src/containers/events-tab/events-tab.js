import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEventsByCategory } from '../../store/actions/events-actions';
import Spinner from '../../components/spinner';
import EventsView from '../events-container/events-view';
import EventsService from '../../services/events-service';

class EventsTab extends Component {
  state = {
    isMounted: false,
    isLoading: true,
    events: [],
    error: null
  };

  onRefresh = () => {
    const { category, language, selectedCity } = this.props;
    getEventsByCategory(category, language, selectedCity, 1, 100);
  }

  componentDidMount() {
    const {
      getEventsByCategory,
      category,
      language,
      selectedCity
    } = this.props;

    console.log('moundted', category);

    this.setState({
      isMounted: true
    }, () => {
      setTimeout(()=>{
        getEventsByCategory(category, language, selectedCity, 1, 100);
      }, 500);
    });

    // EventsService.getEvents(category, selectedCity, language, 1, 100)
      // .then((res) => {
      //   console.log(res);
      // })
      // .error(err => console.error(err));

  }

  componentWillUnmount() {
    const { category } = this.props;
    this.setState({
      isMounted: false
    });
  }

  render() {
    const {
      category,
      events,
      bigMode,
      eventSelectHandle,
      onRefresh
    } = this.props;

    return (!events[category] || events[category].isLoading) ? <Spinner/> : (
      <View style={{
        flex: 1
      }}>
        <EventsView
          category={category}
          isRefreshing={events[category].isLoading}
          onRefresh={this.onRefresh}
          selectedCategory={category}
          eventSelectHandle={eventSelectHandle}
          events={events[category].eventsList}
          mode={bigMode}
        />
        {/*<Text>Tab</Text>*/}
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  language: state.app.language,
  selectedCity: state.city.selectedCity,
  events: state.events.events
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getEventsByCategory
  }, dispatch
);

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EventsTab);
