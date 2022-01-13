import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { withNavigation, StackActions } from 'react-navigation';
import Spinner from '../../components/spinner';
import MyTicketsView from './my-tickets-view';
import { getMyTickets } from '../../store/actions/my-tickets-actions';
import ErrorComponent from '../../components/error-component';
import { SafeAreaView } from 'react-native';
import AsyncStorageService from '../../services/async-storage-service';
import FingerprintAuthorization from '../../components/fingerprint-authorization';

class MyTicketsContainer extends React.Component {
  state = {
    isLoadingPin: true,
    isUsePin: null,
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener(
      'didFocus',
      payload => {
        this.refresh();
      }
    );

    AsyncStorageService.getUsePin()
    .then(isUsePin => {
      this.setState({
        isLoadingPin: false,
        isUsePin: isUsePin
      });
    })
    .catch(err => {
      console.warn(err);
      this.setState({
        isLoadingPin: false,
        isUsePin: false,
      });
    });
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  refresh = () => {
    const { getMyTickets, t, auth, navigation } = this.props;
    if (auth) {
      getMyTickets(auth.token);
    } else {
      navigation.navigate('AuthScreen', {
        message: t('myTicketsRegister')
      });
    }
  };

  handleTicketPress = (order) => {
    const { navigation } = this.props;
    if (order.status === "2" || order.status === 2) {
      navigation.navigate('Ticket', {
        order
      });
    }
  };

  render() {
    const { isLoading, tickets, error, lang, t } = this.props;
    const { isLoadingPin, isUsePin } = this.state;

    if (isLoading || isLoadingPin) {
      return <Spinner/>;
    }

    if (isUsePin === true) {
      return (
        <SafeAreaView style={{ flex: 1 }}>
          <FingerprintAuthorization
            finishProcess={() => {
              this.setState({
                isLoadingPin: false,
                isUsePin: false,
              });
            }}
          />
        </SafeAreaView>
      );
    }

    if (error) {
      return <ErrorComponent errorText={error}/>
    }

    return (
      <MyTicketsView
        lang={lang}
        onTicketPress={this.handleTicketPress}
        tickets={tickets}
        refresh={this.refresh}
        refreshing={isLoading}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.myTickets,
  auth: state.auth.authData,
  lang: state.app.language
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getMyTickets
  }, dispatch
);

export default compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(MyTicketsContainer);
