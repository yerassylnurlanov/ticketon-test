import React from 'react';
import { StyleSheet, View } from 'react-native';
import { G, Path, Rect, Svg, Text as SvgText } from 'react-native-svg';
import withTheme from '../../hoc/withTheme';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 99999
  },
  badgeBackground: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 0
  }
});

const CornerBadge = (
  {
    isBackground,
    popular,
    comingSoon,
    theme,
    t
  }
) => {

  const styles = getStyles(theme);

  if (isBackground && (popular || comingSoon)) {
    return (
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
    );
  }

  if (!isBackground && (popular || comingSoon)) {
    return (
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
            {(comingSoon) ? t('comingSoon') : (popular) ? t('popularBadge') : 'Test'}
          </SvgText>
        </G>
      </Svg>
    );
  }

  return null;
};



export default compose(withTheme, withTranslation())(CornerBadge);
