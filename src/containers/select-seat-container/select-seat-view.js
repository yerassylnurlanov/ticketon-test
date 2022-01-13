import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import withTheme from '../../hoc/withTheme';
import SeatsSelectorAnimated from '../../components/seats-selector-animated';
import SeatsSelectorWebview from '../../components/seats-selector-webview/seats-selector-webview';
import PlaceTypeSelector from '../../components/place-type-selector';
import { borderRad } from '../../consts';

const { width, height } = Dimensions.get('window');

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  descriptionLabel: {
    color: theme.fontDesc,
    fontSize: hp(1.8)
  },
  descriptionValue: {
    color: theme.fontMain,
    fontSize: hp(1.8)
  },
  descriptionContainer: {
    padding: 16,
    zIndex: 10,
    backgroundColor: '#e6e6e6'
  },
  selectedSeatsContainer: {
    position: 'absolute',
    // height: hp(30),
    padding: 16,
    flex: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'white'
  },
  selectedSeatLabel: {
    color: theme.fontMain,
    fontSize: hp(2),
    fontWeight: '400',
    zIndex: 10
  },
  seatSelectorContainer: {
    flex: 1,
    width: width,
    height: width,
    borderBottomColor: 'grey',
    borderBottomWidth: 1
  },
  submitBtn: {
    zIndex: 1,
    width: '100%',
    height: hp(5),
    justifyContent: 'center',
    borderRadius: borderRad,
    marginTop: 8,
    bottom: 0,
    alignItems: 'center',
    backgroundColor: theme.appBar,
  },
  submitBtnText: {
    color: theme.headerBarTint
  }
});

const getDiscountLabel = (price, discountType) => {
  if (discountType === 0) {
    return '';
  } else {
    return `(${price.discounts.find(el => el.type === discountType.toString()).name})`;
  }
}

const getPrice = (price, discountType) => {
  if (discountType === 0) {
    if (!price) {
      return 0;
    }
    if (price.sum === 1) {
      return 0;
    }
    return price.sum;
  } else {
    return price.discounts.find(el => el.type === discountType.toString()).sum;
  }
}

const SelectSeatView = (
  {
    onSubmit,
    cinemaName,
    movieName,
    session,
    hall,
    theme,
    t,
    sessionId,
    handleSeatClick,
    show,
    selectedSeats,
    selectedSeatDiscounts,
    lastSelectedSeatType,
    onDiscountChange,
    isSector,
    selectedSector,
    onSelectSector
  }
) => {
  const prices = show.prices;
  const styles = getStyles(theme);
  return (
    <View style={{flex: 1}}>
    <View style={styles.root}>
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionLabel}>
          {t('cinema')} : <Text style={styles.descriptionValue}>{cinemaName}</Text>
        </Text>
        <Text style={styles.descriptionLabel}>
          {t('movie')} : <Text style={styles.descriptionValue}>{movieName}</Text>
        </Text>
        <Text style={styles.descriptionLabel}>
          {t('session')} : <Text style={styles.descriptionValue}>{session}</Text>
        </Text>
        <Text style={styles.descriptionLabel}>
          {t('hall')} : <Text style={styles.descriptionValue}>{`${hall}`}</Text>
        </Text>
        {(Object.keys(show.hall.levels).length > 1) ? (
          <Text style={styles.descriptionLabel}>
            {t('sector')} : <Text style={[styles.descriptionValue]}>{`${(selectedSector) ? selectedSector : '-'}`}</Text>
          </Text>
        ) : null}
      </View>
      <View style={styles.seatSelectorContainer}>
        <SeatsSelectorWebview
          isSector={isSector}
          onSelectSector={onSelectSector}
          selectedSector={selectedSector}
          selectedSeats={selectedSeats}
          show={show}
          handleSeatClick={handleSeatClick}
          sessionId={sessionId}
        />
        <View style={{ position: 'absolute', top: 0, width: '100%' }}>
          {(selectedSeatDiscounts && selectedSeatDiscounts.discounts && selectedSeatDiscounts.discounts.length > 0) ? (
            <PlaceTypeSelector
              price={selectedSeatDiscounts}
              selectedType={lastSelectedSeatType}
              handleSelectType={onDiscountChange}
            />
          ) : null}
        </View>
      </View>
      <View style={styles.selectedSeatsContainer}>
        <ScrollView>
        {selectedSeats.map((seat, idx) => {
          const price = getPrice(prices[seat.type], seat.discountType);

          if (seat.purchaseCount) {
            return (
              <Text
                key={seat.id}
                style={styles.selectedSeatLabel}
              >
                {`${prices[parseInt(seat.type)].name}. ${seat.purchaseCount} ${price !== 0 ? `* ${price} ${t(show.show.currency)}` : ''} ${getDiscountLabel(prices[seat.type], seat.discountType)}`}
              </Text>
            );
          }
          return (
            <Text
              key={seat.id}
              style={styles.selectedSeatLabel}
            >
              {`${idx + 1}. ${t('row')} ${seat.row} ${t('place')} ${seat.num} - ${price !== 0 ? `${price} ${t(show.show.currency)}` : ''} ${getDiscountLabel(prices[seat.type], seat.discountType)}`}
            </Text>
          );
        })}

        {(selectedSeats.length > 0 && selectedSeats.length <= 5) && (
          <View style={{
            paddingBottom: 25
          }}>
            <Text style={styles.selectedSeatLabel}>{`\n${t('total')}: ${selectedSeats.reduce((acc, el)=>{
              const price = getPrice(prices[el.type], el.discountType);
              if (el.purchaseCount) {
                return acc + price * el.purchaseCount;
              }
              return acc + getPrice(prices[el.type], el.discountType);
            }, 0)}`}</Text>
            <TouchableOpacity onPress={onSubmit} style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>{t('continue')}</Text>
            </TouchableOpacity>
          </View>
        )}
        </ScrollView>
      </View>
    </View>
    </View>
  );
};

SelectSeatView.propTypes = {
  cinemaName: PropTypes.string.isRequired,
  movieName: PropTypes.string.isRequired,
  session: PropTypes.string.isRequired
};

export default compose(withTheme, withTranslation())(SelectSeatView);
