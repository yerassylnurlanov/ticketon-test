import React from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity, Platform
} from 'react-native';
import {
  Badge
} from 'native-base';
import StarRating from 'react-native-star-rating';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import withTheme from '../../hoc/withTheme';
import { ticketon } from '../../consts/urls';
import CornerBadge from '../corner-badge/cornder-badge';

const getStyles = theme => StyleSheet.create({
  root: {
    width: '100%',
    aspectRatio: 0.65,
    // borderWidth: 1,
    flexDirection: 'column',
    marginTop: 16,
    margin: Platform.OS === 'ios' ? 0 : 4,
    padding: Platform.OS === 'ios' ? 0 : 8,
    borderRadius: 4,
    borderWidth: Platform.OS === 'ios' ? 0 : 0.5
  },
  image: {
    borderRadius: 4,
    width: null,
    height: null,
    resizeMode: 'cover',
    aspectRatio: 1
  },
  rating: {
    position: 'absolute',
    left: 8,
    bottom: 8
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
    borderRadius: 0
  },
  price: {
    position: 'absolute',
    right: 4,
    bottom: 4,
    color: 'red',
  },
});

const SearchResultEntry = ({ theme, cover, title, meta, full }) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <CornerBadge
        isBackground={true}
        comingSoon={full.comingSoon}
        popular={full.popular}
      />
      <CornerBadge
        style={{zIndex: 99999}}
        isBackground={false}
        comingSoon={full.comingSoon}
        popular={full.popular}
      />
      <View>
        <Image
          defaultSource={require('../../assets/img/default-image.png')}
          style={styles.image}
          resizeMode="cover"
          source={{ uri: `${ticketon}${cover}?h=300` }}
        />
      </View>
      <View style={styles.description}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >{title}</Text>
        <Text style={styles.subtitle}
              numberOfLines={1}
        >
          {meta}
        </Text>

      </View>
      <Text style={styles.price}>{(full.comingSoon) ? '' : full.event_min_price_text}</Text>
    </View>
  );
};

export default withTheme(SearchResultEntry);
