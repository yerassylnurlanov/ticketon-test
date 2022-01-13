import React from 'react';
import { Text, TouchableOpacity, View, Linking, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { StackActions, withNavigation, NavigationActions } from 'react-navigation';
import { compose } from 'redux';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';

class SaleConfirmContainer extends React.Component {
  handleWebViewNavigationStateChange = newNavState => {
    const { navigation } = this.props;
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (
      url.startsWith('https://widget.ticketon.kz') &&
      url.includes('failed')
    ) {
      navigation.goBack();
    }

    if (url.includes('type=kaspi_straight')) {
      Linking.openURL(url);
      return;
    }
  };

  handleDone = () => {
    const { navigation } = this.props;
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('MyTickets');
  }


  componentDidMount() {
    const { navigation, theme, t } = this.props;

    navigation.setParams({
      headerRight: (
        (
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={this.handleDone}
          >
            <Text style={{ color: theme.headerBarTint, fontSize: 18 }}>
              {t('done')}
            </Text>
          </TouchableOpacity>
        )
      )
    })
  }

  render() {
    const { navigation } = this.props;
    const url = navigation.getParam('url');

    return (
      <View style={{ flex: 1 }}>
        <WebView
          renderLoading={() => <Spinner />}
          startInLoadingState={true}
          renderError={errorName => <ErrorComponent errorText={errorName} />}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          style={{  position: "absolute", top: 0, left: 0, right: 0, bottom: 0, }} source={{ uri: url}}
          // containerStyle={{flex: 1}}
        />
      </View>
    );
  }
}

export default compose(
  withTranslation(),
  withTheme,
  withNavigation,
)(SaleConfirmContainer);
