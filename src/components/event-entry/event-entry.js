import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  Platform
} from 'react-native';
import {
  Svg,
  Path,
  Text as SvgText,
  TextPath,
  G,
  Rect,
} from 'react-native-svg';
import {
  Badge
} from 'native-base';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import withTheme from '../../hoc/withTheme';
import { ticketon } from '../../consts/urls';
import { withTranslation } from 'react-i18next';
const getStlyes = theme => StyleSheet.create({
  rootMini: {
    flex: 0,
    flexDirection: 'column',
    width: wp(50),
    height: wp(50)*3/2+80,
    padding: Platform.OS === 'ios' ? 8 : 8,
    borderRadius: 4,
  },
  rootMax: {
    flex: 0,
    flexDirection: 'column',
    margin: Platform.OS === 'ios' ? 0 : 4,
    padding: 8,
    borderRadius: 4,
  },
  image: {
    borderRadius: 4,
    flex: 1,
    backgroundColor: '#f2f2f2',
    resizeMode: 'stretch',
  },
  star: {
    color: theme.appBar
  },
  description: {
    paddingVertical: 4,
    flexDirection: 'column',
  },
  title: {
    fontSize: 16,
    color: theme.fontMain,
  },
  subtitle: {
    fontSize: 12,
    color: theme.fontDesc
  },
  age: {
    position: 'absolute',
    right: 8,
    bottom: 8,
    borderRadius: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  price: {
    color: 'red',
  },
  ratingPriceMini: {
    flex: 0,
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  ratingPriceMax: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 999
  },
  badgeBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0
  }
});

const xml = `
<svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M57 32.5714L24.4286 0H0L57 57V32.5714Z" fill="#FF8108"/>
</svg>
<svg width="4" height="4" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
<Rect width="4" height="4" fill="#D96E07"/>
</svg>


`;

const EventEntry = (
  {
    theme,
    event_main_image,
    event_name,
    event_genre,
    event_rating,
    event_min_price_text,
    event_fcsk,
    comingSoon,
    popular,
    isMini = false,
    t
  }
) => {
  const styles = getStlyes(theme);
  return (
    <View style={(isMini) ? styles.rootMini : styles.rootMax}>
      {(popular || comingSoon) ? (
        <Svg height="57" width="57" style={styles.badgeBackground}>
          <Rect
            x="0"
            y="0"
            width="10"
            height="10"
            fill="#D96E07"
          />
          <Rect
            x="47"
            y="50"
            width="10"
            height="10"
            fill="#D96E07"
          />
        </Svg>
      ) : null}
      {(popular || comingSoon) ? (
        <Svg height="57" width="57" style={styles.badge}>
          <Path
            d="M57 32.5714L24.4286 0H0L57 57V32.5714Z"
            fill="#FF8108"
          />
          <G rotation="45.01" origin="-13, 51">
            <SvgText
              fill="white"
              fontSize="8"
              fontWeight="500"
              x="0"
              y="0"
              textAnchor="middle"
            >
              {(comingSoon) ? t('comingSoon') : (popular) ? t('popular') : 'Test'}
            </SvgText>
          </G>
        </Svg>
      ) : null}
      <View style={{ width: '100%', height: undefined, aspectRatio: 2/3 }}>
        <Image
          defaultSource={require('../../assets/img/default-image-height.png')}
          resizeMode="stretch"
          style={styles.image}
          source={{ uri: `${ticketon}${event_main_image}?h=400` }}
        />
        {(event_fcsk) ? (
          <Badge style={styles.age}>
            <Text>{event_fcsk}</Text>
          </Badge>
        ) : null}
      </View>
      <View style={styles.description}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {event_name}
        </Text>
        {(event_genre !== null && event_genre !== 'null') ? (
          <Text
            style={styles.subtitle}
            numberOfLines={1}
          >
            {event_genre}
          </Text>
        ) : null}
      </View>
      <View style={(isMini) ? styles.ratingPriceMini : styles.ratingPriceMax}>
          <Text>{t('rating')}: {event_rating}</Text>
        <Text style={styles.price}>{(comingSoon) ? '' : event_min_price_text}</Text>
      </View>
    </View>
  );
};

export default withTranslation()(withTheme(EventEntry));
