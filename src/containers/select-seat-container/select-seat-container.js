import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { Toast } from 'native-base';
import SelectSeatView from './select-seat-view';
import Spinner from '../../components/spinner';
import { getSeats } from '../../store/actions/seat-actions';
import ErrorComponent from '../../components/error-component';
import { withTranslation } from 'react-i18next';
import { withNavigation } from 'react-navigation';
class SelectSeatContainer extends React.Component {
  state = {
    loading: true,
    selectedSeats: [],
    isSector: false,
    selectedSector: null,
    lastSelectedSeat: null,
    selectedSeatDiscounts: null
  };

  handleDiscountChange = (type) => {
    this.setState((prevState) => {
      if (prevState.selectedSeats.length > 0) {
        prevState.selectedSeats[prevState.selectedSeats.length - 1].discountType = type;
        return {
          selectedSeats: prevState.selectedSeats
        };
      }
      return prevState;
    });
  };

  handleSeatClick = (selectedSeatsNew) => {
    console.log(selectedSeatsNew);
    const { t } = this.props;
    const { selectedSeats } = this.state;

    if (selectedSeats.error) {
      Toast.show({
        text: t('maxNumberOfPlaces'),
        duration: 3000
      });
    } else {
      if (selectedSeats.purchaseCount) {
      }

      if (!selectedSeatsNew.seats) {
        Toast.show({
          text: t('maxNumberOfPlaces'),
          duration: 3000
        });
        return;
      }

      let res;

      if (selectedSeatsNew.seats.length > selectedSeats.length) {
        const newSeat = selectedSeatsNew.seats[selectedSeatsNew.seats.length - 1];
        newSeat.discountType = 0;
        res = [...selectedSeats, newSeat];
      } else if (selectedSeatsNew.seats.length < selectedSeats.length) {
        res = selectedSeats.filter(sels => selectedSeatsNew.seats.find(selss => selss.id === sels.id) !== undefined);
      } else {
        res = selectedSeatsNew.seats.map((el, index) => {
          el.discountType = (selectedSeats.find(elem => elem.id === el.id)).discountType && 0;
          return el;
        });
      }
      console.log(res);
      this.setState({
        selectedSeats: res,
      });
    }
  };

  handleSelectSector = (sector) => {
    this.setState({
      selectedSector: sector
    });
  };

  handleSubmit = () => {
    const { navigation, sessionId, seats } = this.props;
    const { selectedSeats } = this.state;
    navigation.navigate('SaleCreate', {
      eventName: seats.event.name,
      placeName: seats.place.name,
      session: seats.show.label,
      currency: seats.show.currency,
      selectedSeats,
      sessionId
    });
  };

  componentDidMount() {
    const { sessionId, getSeats, language } = this.props;

    getSeats(sessionId, 0, language);
  }

  render() {
    const {
      sessionId,
      isLoading,
      seats,
      error
    } = this.props;
    const {
      selectedSeats,
      isSector,
      selectedSector,
    } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    if (error !== null) {
      return <ErrorComponent errorText={error} />;
    }

    return (
      <SelectSeatView
        selectedSeatDiscounts={(selectedSeats[selectedSeats.length - 1]) ? seats.prices[selectedSeats[selectedSeats.length - 1].type] : null}
        lastSelectedSeatType={(selectedSeats[selectedSeats.length - 1]) ? selectedSeats[selectedSeats.length - 1].discountType : null}
        onDiscountChange={this.handleDiscountChange}
        onSelectSector={this.handleSelectSector}
        onSubmit={this.handleSubmit}
        selectedSector={selectedSector}
        isSector={isSector}
        selectedSeats={selectedSeats}
        handleSeatClick={this.handleSeatClick}
        show={seats}
        sessionId={sessionId}
        hall={seats.hall.name}
        cinemaName={seats.place.name}
        movieName={seats.event.name}
        session={seats.show.label}
      />
    );
  }
}

const mapStateToProps = state => ({
  language: state.app.language,
  isLoading: state.seats.isLoading,
  seats: state.seats.seats,
  error: state.seats.error
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getSeats
}, dispatch);

export default compose(
  withTranslation(),
  withNavigation,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(SelectSeatContainer);
