import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getEventsByCategory } from '../../store/actions/events-actions';
import Spinner from '../../components/spinner';
import EventsView from '../events-container/events-view';
import { withNavigation } from 'react-navigation';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import EventsService from '../../services/events-service';
import ErrorComponent from '../../components/error-component/error-component';
import ErrorIndicator from '../../components/error-indicator';
import EventContainer from '../event-container/event-container';
import { withTranslation } from 'react-i18next';

class PushContainer extends Component {
  state = {
    isLoading: true,
    error: null,
    data: null
  }

  componentDidMount() {
    const { id, language, selectedCity, navigation, t } = this.props;

    if (!id) {
      this.setState({
        isLoading: false,
        error: 'somethingWentWrong'
      });
      navigation.goBack();
      return;
    }

    EventsService.getEventById(id, selectedCity, language)
      .then((res) => {
        if (res.data && res.data.information && res.data.information[0] && res.data.information[0].event_name) {
          navigation.setParams({
            title: res.data.information[0].event_name
          });
          this.setState({
            isLoading: false,
            data: res.data
          });
          console.log(res);
        } else {
          navigation.goBack();
          this.setState({
            isLoading: false,
            error: 'somethingWentWrong'
          });
        }
      })
      .catch((err) => {
        navigation.goBack();
        this.setState({
          isLoading: false,
          error: err.message
        });
        console.error(err);
      });
  }

  render() {
    const { isLoading, error, data } = this.state;
    const { t } = this.props;

    if (isLoading) {
      return <Spinner />;
    }

    if (error) {
      return <ErrorComponent errorText={t(error)} />;
    }

    if (!data || !data.information) {
      return <ErrorComponent errorText={t('somethingWentWrong')} />;
    }

    return(
      <EventContainer eventPassed={data.information[0]}/>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  language: state.app.language,
  selectedCity: state.city.selectedCity,
});

export default compose(
  connect(
    mapStateToProps,
  ),
  withTranslation(),
  withNavigation
)(PushContainer);
