import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView
} from 'react-native';
import {
  Icon
} from 'native-base';
import { connect } from 'react-redux';
import {
  DrawerItems,
  DrawerNavigatorItems
} from 'react-navigation-drawer';
import _ from 'lodash';
import { ThemeContext } from '../theme-context';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  logoContainer: {
    height: 100,
  },
  logo: {
    marginHorizontal: 16,
    flex: 1,
    height: undefined,
    width: undefined
  },
  drawerItem: {
    flex: 1
  }
});

class Drawer extends React.Component {
  render() {
    const styles = getStyles();
    let items;

    if (!this.props.auth.authData) {
      items = this.props.items.filter(el => el.key !== 'Profile' && el.key !== 'MyTickets');
    } else {
      items = this.props.items.filter(el => el.key !== 'Auth');
    }
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} resizeMode="contain" source={require('./img/logo_black.png')}/>
        </View>
        <ScrollView>
          <DrawerItems
            {...this.props}
            items={items}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(Drawer);
