import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {
  Icon,
  Picker,
  Header,
  Left,
  Button,
  Body,
  Title,
  Right
} from 'native-base';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import DateTimePicker from '@react-native-community/datetimepicker';
import { withTranslation } from 'react-i18next';


const getStyle = theme => StyleSheet.create({
  root: {
    flex: 1,
    margin: 24,
  },
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    height: 76,
    backgroundColor: theme.appBar
  },
  label: {
    fontSize: 10,
    opacity: 0.6
  },
  changePassword: {
    fontSize: 17,
    letterSpacing: 0.5
  },
  genderContainer: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'stretch'
  },
  gender: {
    width: 30,
    height: 30,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  genderSelected: {
    width: 30,
    height: 30,
    backgroundColor: theme.appBar,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  input: {
    color: 'black',
    marginVertical: 16,
    fontSize: 16,
    borderBottomWidth: Platform.OS === 'ios' ? 2 : 0,
    borderBottomColor: '#efefef'
  }
});

const ProfileEditView = (
  {
    onChangeBirthday,
    showBirthday,
    birthday,
    gender,
    onBirthdayPressed,
    onChangeGender,
    onClickedEmailPressed,
    about,
    onChangeAbout,
    city,
    onChangeCity,
    country,
    onChangeCountry,
    firstName,
    onChangeFirstName,
    lastName,
    onChangeLastName,
    middleName,
    onChangeMiddleName,
    handleSubmit,
    iin,
    onChangeIIN,
    t,
    theme,
  }
) => {
  const styles = getStyle(theme);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, padding: 24, backgroundColor: 'white' }}
      behavior={(Platform.OS === 'ios') ? "height" : "height"}
    >
      <ScrollView>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'white'
            }}
          >
            {/*<View*/}
            {/*  style={styles.avatar}*/}
            {/*>*/}
            {/*  <Icon name="camera-outline" type="MaterialCommunityIcons" style={{ color: "white" }}/>*/}
            {/*</View>*/}
            <Text style={styles.label}>{t('firstName')}</Text>
            <TextInput
              value={firstName}
              onChangeText={onChangeFirstName}
              style={styles.input}
            />
            <Text style={styles.label}>{t('lastName')}</Text>
            <TextInput
              value={lastName}
              onChangeText={onChangeLastName}
              style={styles.input}
            />
            <Text style={styles.label}>{t('middleName')}</Text>
            <TextInput
              value={middleName}
              onChangeText={onChangeMiddleName}
              style={styles.input}
            />
            <Text style={styles.label}>{t('gender')}</Text>
            <View style={styles.genderContainer}>
              <TouchableOpacity
                style={(gender === 'male') ? styles.genderSelected : styles.gender}
                onPress={() => onChangeGender('male')}
              >
                <Text>{t('male')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={(gender === 'male') ? styles.gender : styles.genderSelected}
                onPress={() => onChangeGender('female')}
              >
                <Text>{t('female')}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ marginBottom: 16, }}
              onPress={onClickedEmailPressed}
            >
              <Text
                style={styles.changePassword}
              >
                {t('changePassword')}
              </Text>
            </TouchableOpacity>
            <Text style={styles.label}>{t('birthday')}</Text>
            <TouchableOpacity
              style={{
                paddingVertical: 8,
                borderBottomColor: '#efefef',
                borderBottomWidth: 2,
              }}
              onPress={onBirthdayPressed}
            >
              <Text>{(birthday) ? (Platform.OS === 'ios') ? birthday.toLocaleDateString() : birthday.toDateString() : t('birtday')}</Text>
            </TouchableOpacity>
            <View>
              {(Platform.OS === 'ios' || (Platform.OS === 'android' && showBirthday)) && (
                <DateTimePicker
                  // style={{color: 'black', backgroundColor: 'red' }}
                  style={{
                    width: '100%',
                    color: '#000000',
                    backgroundColor: 'white',
                  }}
                  maximumDate={new Date(new Date().getFullYear() - 1, 10, 20)}
                  accessibilityIgnoresInvertColors={true}
                  timeZoneOffsetInMinutes={0}
                  value={birthday}
                  mode={'date'}
                  locale="ru-RU"
                  is24Hour={true}
                  display="default"
                  onChange={onChangeBirthday}
                />
              )}
            </View>
            <Text style={styles.label}>{t('country')}</Text>
            <Picker
            renderHeader={backAction =>
              <Header style={{ backgroundColor: theme.appBar }}>
                <Left>
                  <Button transparent onPress={backAction}>
                    <Icon name="arrow-back" style={{ color: "#fff" }} />
                  </Button>
                </Left>
                <Body style={{ flex: 3 }}>
                  <Title style={{ color: "#fff" }}>{t('selectCountry')}</Title>
                </Body>
                <Right />
              </Header>}
            selectedValue={country}
            placeholder={t('selectCountry')}
            style={{height: 50 , marginVertical: 8, padding: 0, borderBottomWidth: 2, borderBottomColor: '#efefef', width: '100%' }}
            itemStyle={{ margin: 0, padding: 0 }}
            itemTextStyle={{ margin: 0, padding: 0 }}
            onValueChange={(itemValue, itemIndex) =>
              onChangeCountry(itemValue)
            }>
            <Picker.Item label={t('kzC')} value="kz" />
            <Picker.Item label={t('kgC')} value="kg" />
            <Picker.Item label={t('ruC')} value="ru" />
            <Picker.Item label={t('tjC')} value="tj" />
            <Picker.Item label={t('uzC')} value="uz" />
          </Picker>
            <Text style={styles.label}>{t('city')}</Text>
            <TextInput
              value={city}
              onChangeText={onChangeCity}
              style={styles.input}
              placeholder={t('city')}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.label}>{t('iin')}</Text>
            <TextInput
              keyboardType="number-pad"
              value={iin}
              onChangeText={onChangeIIN}
              style={styles.input}
              placeholder={t('iin')}
              placeholderTextColor={'grey'}
            />
            <Text style={styles.label}>{t('userDescription')}</Text>
            <TextInput
              value={about}
              onChangeText={onChangeAbout}
              style={styles.input}
              placeholder={t('userDescription')}
              placeholderTextColor={'grey'}
            />
            <TouchableOpacity
              style={{
                backgroundColor: theme.appBar,
                // position: 'absolute',
                height: 50,
                // left: 0,
                // bottom: 24,
                // right: 0,
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={handleSubmit}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '600'
                }}
              >
                {t('save')}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default compose(withTheme, withTranslation())(ProfileEditView);
