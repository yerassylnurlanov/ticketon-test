import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { getTicketonLive } from '../../store/actions/ticketon-live-actions';
import TicketonLiveView from './ticketon-live-view';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';

class TicketonLiveContainer extends React.Component {

  componentDidMount() {
    const { getTicketonLive } = this.props;
    getTicketonLive(0, 100);
  }

  render() {
    const { data, isLoading, error } = this.props;

    if (isLoading) {
      return <Spinner/>
    }

    if (error) {
      return <ErrorComponent errorText={'error'} />
    }

    return (
      <TicketonLiveView
        data={data}
      />
    );
  }
}

const mapStateToProps = state => ({
  ...state.ticketonLive
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getTicketonLive: getTicketonLive
}, dispatch);

export default compose(
  withNavigation,
  connect(mapStateToProps, mapDispatchToProps)
)(TicketonLiveContainer);
