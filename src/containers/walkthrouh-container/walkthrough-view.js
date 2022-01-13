import React from 'react';
import {
  Image,
  Picker,
  ScrollView,
  StyleSheet, Text, TouchableOpacity,
  View
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ProgressDots from '../../components/progress-dots';
import FooterBar from '../../components/footer-bar';
import withTheme from '../../hoc/withTheme';
import Spinner from '../../components/spinner';

const getStyles = theme => StyleSheet.create({
  root: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  mainContainer: {
    flex: 3,
    flexDirection: 'column',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  background: {
    backgroundColor: 'rgb(230,230,230)',
    overflow: 'hidden',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  },
  header: {
    backgroundColor: 'transparent',
    fontSize: 40,
    marginVertical: 36,
    marginHorizontal: 16,
  },
  pickerLabel: {
    marginHorizontal: 16,
    backgroundColor: 'transparent',
    fontSize: 14
  },
  picker: {
    marginHorizontal: 10,
  },
  additionalContainer: {
    height: hp(30),
    backgroundColor: 'rgba(37,91,109,1)',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  description: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)'
  },
  nextButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButtonLabel: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 14
  },
  progressDots: {
    flex: 1
  },
  cityImage: {
    width: wp(100),
    height: undefined,
    aspectRatio: 3.1,
    // flex: 1,
    // backgroundColor: 'green',
    bottom: 0,
    resizeMode: 'cover'
  },
  bottom: {
    flex: 2,
    // backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  walkthroughImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  }
});

const WalkthroughView = (props) => {
  const {
    theme,
    handleNextPressed,
    handleStartPressed,
    handleCityChange,
    currentStep,
    steps,
    isLoadingCities,
    selectedCity,
    cities
  } = props;

  const styles = getStyles(theme);

  const { t, i18n } = useTranslation();

  const progressDots = (
    <ProgressDots style={styles.progressDots} total={steps.length + 1} chosen={currentStep} />
  );

  const nextButton = (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={handleNextPressed}
    >
      <Text style={styles.nextButtonLabel}>{t('next')}</Text>
      <Icon style={styles.nextButtonLabel} type="AntDesign" name="right" />
    </TouchableOpacity>
  );

  const startButton = (!isLoadingCities) ? (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={handleStartPressed}
    >
      <Text style={styles.nextButtonLabel}>{t('start')}</Text>
    </TouchableOpacity>
  ) : null;

  const citySelector = (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        {isLoadingCities ? (
          <Spinner/>
          ) : (
          <View>
            <Text style={styles.header}>{t('selectCity')}</Text>
            <Text style={styles.pickerLabel}>{t('city')}</Text>
            <Picker
              selectedValue={selectedCity}
              style={styles.picker}
              underlineColorAndroid="black"
              onValueChange={handleCityChange}
            >
              {
                cities.map(el => <Picker.Item key={el.id} label={el.name} value={el.id} />)
              }
            </Picker>
          </View>
        )}
      </View>
      <View style={styles.bottom}>
        <Image
          style={styles.cityImage}
          source={require('./img/city.png')}
        />
        <View style={styles.additionalContainer}>
          <Text style={styles.description}>
            {t('changeCityDescription')}
          </Text>
          <FooterBar
            centerElement={progressDots}
            rightElement={startButton}
          />
        </View>
      </View>
    </View>
  );

  if (currentStep >= steps.length) {
    return (citySelector);
  }

  const walkthroughStep = (
    <View style={styles.root}>
      <View style={styles.mainContainer}>
        <Image
          style={styles.walkthroughImg}
          source={require('./img/step1.png')}
        />
      </View>
      <View style={styles.additionalContainer}>
        <Text style={styles.description}>
          {steps[currentStep].description}
        </Text>
        <FooterBar
          centerElement={progressDots}
          rightElement={nextButton}
        />
      </View>
    </View>
  );

  return walkthroughStep;
};

WalkthroughView.propTypes = {
  handleNextPressed: PropTypes.func.isRequired,
  handleStartPressed: PropTypes.func.isRequired,
  handleCityChange: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  cities: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCity: PropTypes.string
};

export default withTheme(WalkthroughView);
