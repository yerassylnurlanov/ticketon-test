import React from 'react';
import { View, StatusBar, Platform, StyleSheet } from 'react-native';
import withTheme from '../../hoc/withTheme';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const getStyles = theme => StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT
  }
});

const CustomStatusBar = (
  {
    theme
  }
) => {
  const styles = getStyles(theme);
  return (
    <StatusBar translucent backgroundColor={theme.headerBarBackground} barStyle="light-content" />
  );
}

export default withTheme(CustomStatusBar);
