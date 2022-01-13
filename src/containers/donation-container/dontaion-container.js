import React from 'react';
import DonationView from './donation-view';
import { connect } from 'react-redux';

const DonationContainer = (
  {
    placeId,
    navigation
  }
) => {
  const handleDonate = (data) => {
    console.log(data);
    navigation.navigate('DonationPayment', {
      data
    })
  }

  return (
    <DonationView
      handleDonate={handleDonate}
      placeId={placeId}
    />
  );
}

const mapStateToProps = (state) => ({
  ...state.profile
});

export default connect(mapStateToProps)(DonationContainer);
