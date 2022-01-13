import React from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Linking,
  ImageBackground
} from 'react-native';
import { Container, Header, Content, Icon } from 'native-base';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import StarRating from 'react-native-star-rating';
import { ticketon } from '../../consts/urls';
import withTheme from '../../hoc/withTheme';
import ErrorComponent from '../../components/error-component';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.mainBackground
  },
  posterAndTitle: {
    flexDirection: 'row'
  },
  poster: {
    flex: 2,
    alignItems: 'center',
    height: 200,
    marginLeft: 16,
    marginTop: 16,
    marginBottom: 16
  },
  posterImg: {
    flex: 1,
    aspectRatio: 0.65,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 3,
    flexDirection: 'column',
    margin: 16,
    minHeight: 200,
  },
  titleName: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.fontMain,
    marginBottom: 16,
  },
  titleDescription: {
    color: theme.fontDesc
  },
  buyButton: {
    flex: 0,
    backgroundColor: theme.appBar,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0,
  },
  ratingsContainer: {
    borderColor: theme.fontMain,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    paddingVertical: 16,
    justifyContent: 'space-evenly',
    flexDirection: 'row'
  },
  descriptionContainer: {
    margin: 16
  },
  imageContainer: {
    borderColor: theme.fontMain,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
  },
  eventImage: {
    margin: 16,
    flex: 1,
    height: 200,
    width: 400,
    backgroundColor: 'red'
  },
  starContainer: {
    marginVertical: 16,
    flex: 1,
    justifyContent: 'space-between'
  },
  ratingLabel: {
    color: theme.fontDesc,
    fontWeight: '600',
    fontSize: 16
  },
  ratingValue: {
    color: theme.fontMain,
    fontWeight: '600',
    fontSize: 16
  },
});


const EventDescriptionView = (
  {
    event,
    theme,
    t,
    handleSelectImage,
    handleBuy,
    handleSubscribe,
    handleRefunds,
    handleDonation
  }
) => {
  const styles = getStyles(theme);

  // console.log(event);

  if (event === undefined) {
    return <ErrorComponent errorText={'Event is not defined'}/>
  }

  return (
    <ScrollView style={styles.root}>
      <View style={styles.posterAndTitle}>
        <View style={styles.poster}>
          <ImageBackground
            defaultSource={require('../../assets/img/default-image.png')}
            style={styles.posterImg}
            source={{ uri: `${ticketon}/${event.event_main_image}?h=200` }}
          >
            {(event.event_video !== null) ? (
              <TouchableOpacity onPress={() => {
                Linking.openURL(event.event_video)
              }}>
                <Icon name="playcircleo" type="AntDesign" style={{ fontSize: 50, color: 'white' }}/>
              </TouchableOpacity>
            ) : null}
          </ImageBackground>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleName}>{event.event_name}</Text>
          <Text
            numberOfLines={2}
            style={styles.titleDescription}
          >
            {event.event_description}
          </Text>
          <StarRating
            disabled
            containerStyle={styles.starContainer}
            starSize={15}
            fullStarColor={theme.appBar}
            maxStars={10}
            rating={event.event_rating}
          />
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            {(event.comingSoon) ? (
              <TouchableOpacity
                style={styles.buyButton}
                onPress={handleSubscribe}
              >
                <Text style={{ color: 'white' }}>{t('subscribe')}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buyButton}
                onPress={handleBuy}
              >
                <Text style={{ color: 'white' }}>{t('buy')}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      {(event.event_rating_kp !== 0 || event.event_rating_imdb !== 0) ? (
        <View style={styles.ratingsContainer}>
          <Text style={styles.ratingLabel}>
            Ticketon <Text style={styles.ratingValue}>{event.event_rating}</Text>
          </Text>
          <Text style={styles.ratingLabel}>
            КиноПоиск <Text style={styles.ratingValue}>{event.event_rating_kp}</Text>
          </Text>
          <Text style={styles.ratingLabel}>
            IMDb <Text style={styles.ratingValue}>{event.event_rating_imdb}</Text>
          </Text>
        </View>
      ) : null}
      <View style={styles.descriptionContainer}>
        <Text>{event.event_remark.replace(/(\&\w+;)/g, ' ').replace('Правила возврата: ознакомиться', '')}</Text>
        {event.event_remark.indexOf('Правила возврата: ознакомиться') !== -1 ? (
          <TouchableOpacity
            onPress={handleRefunds}
          ><Text>Правила возврата: ознакомиться</Text></TouchableOpacity>
        ) : null}
      </View>

      <FlatList
        style={styles.imageContainer}
        horizontal
        data={event.event_images}
        keyExtractor={(item, index) => item}
        renderItem={(url, index) => (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={() => {
                handleSelectImage(index)
              }}
            >
              <Image
                defaultSource={require('../../assets/img/default-image.png')}
                resizeMode="cover"
                style={styles.eventImage}
                source={{ uri: ticketon + url.item }}
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default compose(withTheme, withTranslation())(EventDescriptionView);
