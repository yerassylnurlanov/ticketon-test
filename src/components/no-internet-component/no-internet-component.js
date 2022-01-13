import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { withTranslation } from 'react-i18next';

class NoInternetComponent extends React.Component {
  render() {
    const { t, onRefresh } = this.props;

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{t('connectToInternet')}</Text>
        <TouchableOpacity onPress={onRefresh}>
          <Text>{t('refresh')}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default withTranslation()(NoInternetComponent);
