import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import { G, Path, Rect, Svg, Text as SvgText } from 'react-native-svg';
import { withTranslation } from 'react-i18next';
import CornerBadge from '../corner-badge/cornder-badge';

const getStyles = theme => StyleSheet.create({
  root: {
    width: 100,
    height: 200,
    flexDirection: 'column',
  },
  image: {
    alignSelf: 'center',
    height: 130,
    width: 90
  },
  descriptionContainer: {
    flex: 1,
  },
  description: {
    marginHorizontal: 5,
    marginVertical: 8,
    color: theme.fontMain,
    fontSize: 12
  },
  price: {
    position: 'absolute',
    alignSelf: 'flex-end',
    marginTop: 8,
    bottom: 8,
    right: 8,
    fontSize: 10,
    color: theme.price,
    fontWeight: '400'
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

const FlatListEntry = ({
  imageURL,
  description,
  comingSoon,
  popular,
  price,
  theme,
  t
}) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      <CornerBadge
        isBackground={true}
        comingSoon={comingSoon}
        popular={false}
      />
      <CornerBadge
        style={{zIndex: 99999}}
        isBackground={false}
        comingSoon={comingSoon}
        popular={false}
      />
      <View style={{ flex: 1, paddingTop: 5, }}>
        <Image
          defaultSource={require('../../assets/img/default-image.png')}
          resizeMode="cover"
          style={styles.image}
          source={{ uri: `${imageURL}?h=130&w=90` }}
        />
        <View style={styles.descriptionContainer}>
          <Text
            style={styles.description}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            { description }
          </Text>
          <Text style={styles.price}>
            {(!comingSoon) ? price : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default compose(withTheme, withTranslation())(FlatListEntry);
