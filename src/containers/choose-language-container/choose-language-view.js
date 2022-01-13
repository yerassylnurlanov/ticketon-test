import React from 'react';
import {
  Image,
  ImageBackground,
  Picker,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { useTranslation } from 'react-i18next';
import FooterBar from '../../components/footer-bar';
import withTheme from '../../hoc/withTheme';

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column'
  },
  mainContainer: {
    resizeMode: 'cover',
    flex: 3,
    flexDirection: 'column',
    color: 'blue'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255, 0.2)',
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
    fontSize: hp(6),
    marginTop: hp(4),
    marginHorizontal: 16,
  },
  pickerLabel: {
    marginHorizontal: 16,
    backgroundColor: 'transparent',
    fontSize: hp(3)
  },
  picker: {
    marginHorizontal: 10,
  },
  languageButtonsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  languageButton: {},
  languageButtonImage: {
    resizeMode: 'contain',
  },
  additionalContainer: {
    flex: 1,
    backgroundColor: 'rgba(37,91,109,1)',
    opacity: 1,
    flexDirection: 'column'
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
  description: {
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
    paddingLeft: 16,
    paddingRight: 16,
    fontSize: 16,
    textAlign: 'center',
    color: 'rgba(255,255,255,1)'
  }
});

const ChooseLanguageView = (props) => {
  const {
    language,
    handleValueChange,
    onPressLanguageButton,
    onPressNext
  } = props;
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.root}>
      <ImageBackground source={require('./img/background.png')} style={styles.mainContainer}>
        <View style={styles.overlay}>
          <View style={{flex: 1}}>
            <Text style={styles.header} numberOfLines={2}>{t('chooseLanguage')}</Text>
          </View>
          <View style={{ flex: 3, justifyContent: 'center' }}>
            <Text style={styles.pickerLabel}>{t('language')}</Text>
            <Picker
              selectedValue={language}
              style={styles.picker}
              underlineColorAndroid="black"
              onValueChange={handleValueChange}
            >
              <Picker.Item label="Русский" value="ru" />
              <Picker.Item label="English" value="en" />
              <Picker.Item label="Қазақ" value="kz" />
            </Picker>
          </View>
          {/*<View style={styles.languageButtonsContainer}>*/}
          {/*  <TouchableOpacity*/}
          {/*    style={styles.languageButton}*/}
          {/*    onPress={() => onPressLanguageButton('en')}*/}
          {/*  >*/}
          {/*    <Image style={styles.languageButtonImage} source={require('./img/eng.png')} />*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity*/}
          {/*    style={styles.languageButton}*/}
          {/*    onPress={() => onPressLanguageButton('ru')}*/}
          {/*  >*/}
          {/*    <Image style={styles.languageButtonImage} source={require('./img/rus.png')} />*/}
          {/*  </TouchableOpacity>*/}
          {/*  <TouchableOpacity*/}
          {/*    style={styles.languageButton}*/}
          {/*    onPress={() => onPressLanguageButton('kz')}*/}
          {/*  >*/}
          {/*    <Image style={styles.languageButtonImage} source={require('./img/kaz.png')} />*/}
          {/*  </TouchableOpacity>*/}
          {/*</View>*/}
        </View>
      </ImageBackground>
      <View style={styles.additionalContainer}>
        <Text style={styles.description}>
          {t('changeLanguageDescription')}
        </Text>

        <FooterBar
          rightElement={(
            <TouchableOpacity
              style={styles.nextButton}
              onPress={onPressNext}
            >
              <Text style={styles.nextButtonLabel}>{t('next').toUpperCase()}</Text>
              <Icon style={styles.nextButtonLabel} type="AntDesign" name="right" />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

ChooseLanguageView.propTypes = {
  language: PropTypes.string.isRequired,
  handleValueChange: PropTypes.func.isRequired,
  onPressLanguageButton: PropTypes.func.isRequired,
  onPressNext: PropTypes.func.isRequired
};

export default withTheme(ChooseLanguageView);
