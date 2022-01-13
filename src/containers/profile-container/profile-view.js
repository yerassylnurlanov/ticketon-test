import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image
} from 'react-native';
import { SvgCssUri, SvgFromUri, SvgUri } from 'react-native-svg';
import { compose } from 'redux';
import { useTranslation, withTranslation } from 'react-i18next';
import {
  Icon,
} from 'native-base';
import Modal from "react-native-modal";
import withTheme from '../../hoc/withTheme';
import { borderRad } from '../../consts';

const getStyle = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.mainBackground
  },
  headerContainer: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  fullNameTextStyle: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 17,
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.02,
    paddingBottom: 10,
  },
  descriptionTextStyle: {
    textAlign: 'center',
    fontWeight: 'normal',
    fontSize: 17,
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.02,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 200,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: borderRad,
  },
  modalHeader: {
    color: theme.fontMain,
    fontSize: 20,
    marginVertical: 8,
    textAlign: 'center'
  },
  modalBtn: {
    margin: 8,
    backgroundColor: theme.appBar,
    borderRadius: borderRad,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60
  },
  labelStyle: {
    fontWeight: 'normal',
    fontSize: 15,
    fontStyle: 'normal',
    lineHeight: 22,
    letterSpacing: 0.02,
  },
  modalBtnText: {
    textAlign: 'center',
    color: 'white',
    margin: 8
  },
  brightnessIndicatorContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginBottom: 5,
  },
  achievementsContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginBottom: 5,
  },
  achievementContainer: {
    width: 100,
    height: 100,
    marginVertical: 10,
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 50
  },
  bonusesContainer: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 24,
    marginBottom: 5,
  },
  bonusesLabel: {
    fontStyle: 'normal',
    fontSize: 40,
    fontWeight: 'bold',
  },
  linearGradientContainer: {
    height: 25,
    flexDirection: 'row'
  },
  linearGradient: {
    zIndex: 0,
    position: 'absolute',
    top: 6,
    left: 0,
    bottom: 1,
    right: 0,
  },
  empty: {
    zIndex: 1,
    top: 6,
    left: 0,
    right: 0,
    bottom: 1,
    position: 'absolute',
    backgroundColor: '#F8F8F8'
    // backgroundColor: 'blue'
  },
  liiLabel: {
    fontSize: 14,
    position: 'absolute',
    right: 0,
    opacity: 0.4
  },
  avatar: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 76,
    height: 76,
    backgroundColor: theme.appBar,
    paddingVertical: 16,
    marginVertical: 16,
  },
});

const ProfileView = (
  {
    userName,
    email,
    mobilePhone,
    theme,
    discount,
    lii,
    handleRefresh,
    refreshing,
    isModalVisible,
    toggleModal,
    lastName,
    firstName,
    middleName,
    birthday,
    achievements,
    activeBonuses,
    avatar,
    iin,
    pendingBonuses,
    logoutHandle,
    handleUserNameEdit,
    handlePhoneEdit,
    handleEmailEdit,
    handleChangePassword
  }
) => {
  const { t } = useTranslation();
  const styles = getStyle(theme);

  return (
    <View style={styles.root}>
      <Modal
        style={styles.modal}
        isVisible={isModalVisible}
        coverScreen={true}
        hasBackdrop={true}
        backdropOpacity={0}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>{t('logoutConfirm')}</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => toggleModal('logout')}
            >
              <Text style={styles.modalBtnText}>{t('yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalBtn}
              onPress={() => toggleModal('close')}
            >
              <Text style={styles.modalBtnText}>{t('no')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        style={{ flex: 4 }}
      >
        <View style={styles.headerContainer}>
          <View
            style={styles.avatar}
          >
            {(avatar) ?
              (
                <Image style={{ width: 76, height: 76, resizeMode: 'cover' }} source={{uri: `https://www.ticketon.kz/user/img/avatars/${avatar}`}}/>
              ) : (
                <Icon name="user-o" type="FontAwesome" style={{ color: "white" }}/>
              )
            }
          </View>
          <Text style={styles.fullNameTextStyle}>{firstName && '' + " " + lastName && ''}</Text>
          <Text style={styles.descriptionTextStyle}>{mobilePhone}</Text>
          <Text style={styles.descriptionTextStyle}>{email}</Text>
          <Text style={styles.descriptionTextStyle}>{birthday}</Text>
          <Text style={styles.descriptionTextStyle}>{iin}</Text>
        </View>
        <View style={styles.brightnessIndicatorContainer}>
          <Text style={styles.labelStyle}>{t('brightnessIndicator')}</Text>
          <View style={styles.linearGradientContainer}>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['white', 'red']} style={[styles.linearGradient]}>
            </LinearGradient>
            <View style={[styles.empty,  {
              left: ((Dimensions.get('window').width - 32) / 100) * lii,
            }]}>
              <Text style={[styles.liiLabel, {
                left: ((Dimensions.get('window').width -32) / 100),
              }]}>
                {lii}%
              </Text>
              {(lii < 90) ? (
                <Text style={[styles.liiLabel,]}>
                  100
                </Text>
              ) : null}
            </View>
          </View>
        </View>
        <View style={styles.achievementsContainer}>
          <Text style={styles.labelStyle}>{t('achievements')}</Text>
          <FlatList
            data={achievements}
            horizontal={true}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <View style={[styles.achievementContainer, (!item.collection_ts) ? {opacity: 0.2} : {}]}>
                <Image
                  style={{
                    width: 100,
                    height: 100,
                  }}
                  source={{uri: `https://ticketon.kz/user/img/achievements/${item.icon}`}}
                />
              </View>
            )}
          />
        </View>
        <View style={styles.bonusesContainer}>
          <Text style={styles.labelStyle}>{t('yourBonuses')}</Text>
          <Text style={styles.bonusesLabel}>{activeBonuses} ₸</Text>
        </View>
        <View style={styles.bonusesContainer}>
          <Text style={styles.labelStyle}>{t('pendingBonuses')}</Text>
          <Text style={styles.bonusesLabel}>{pendingBonuses} ₸</Text>
        </View>
      </ScrollView>
      <View style={{ height: 40, marginHorizontal: 16, marginVertical: 8 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => toggleModal('open')}
        >
          <Icon name="logout" type="SimpleLineIcons" style={{ color: '#FF8108', fontSize: 30 }}/>
          <Text style={{ marginLeft: 16 }}>{t('logout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default compose(withTheme, withTranslation())(ProfileView);
