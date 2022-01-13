import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';
import { WebView } from 'react-native-webview';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import { withNavigation } from "react-navigation";

class SliderWebViewContainer extends Component {
  handleWebViewNavigationStateChange = newNavState => {
    const { navigation } = this.props;
    const { url } = newNavState;

    if (!url) return;
    // handle certain doctypes
    const reg = /(w\/.*?$)/g;
    const match = reg.exec(url);

    if (url.startsWith('https://m.ticketon.kz/show/')) {
      navigation.popToTop();
      navigation.navigate('Seats', { sessionId: url.substr(27) });
    }
  };

  render() {
    const { slide } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <WebView
          renderLoading={() => <Spinner />}
          startInLoadingState={true}
          renderError={errorName => <ErrorComponent errorText={errorName} />}
          onNavigationStateChange={this.handleWebViewNavigationStateChange}
          style={{ flex: 1 }}
          source={{ uri: `https://m.ticketon.kz${slide.href}` }}
        />
      </View>
    );
  }
}

export default compose(
  withNavigation,
)(SliderWebViewContainer);
