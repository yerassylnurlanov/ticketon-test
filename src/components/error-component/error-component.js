import React from 'react';
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import RNRestart from 'react-native-restart';
import { withTranslation } from 'react-i18next';

const ErrorComponent = (
  {
    errorText,
    submitText,
    t,
    onSubmit
  }
) => {
  const refresh = (
    <TouchableOpacity style={{ marginTop: 8 }} onPress={onSubmit}>
      <Text>
        {t(submitText)}
      </Text>
    </TouchableOpacity>
  );

  const refreshAdd = (
    <TouchableOpacity style={{ marginTop: 8 }} onPress={() => {RNRestart.Restart();}}>
      <Text>
        {t('refresh')}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{t(errorText)}</Text>
      {onSubmit ? refresh : (errorText === 'connectToInternet' || errorText === 'Network Error') ? refreshAdd : null}
    </View>
  );
};

ErrorComponent.propType = {
  errorText: PropTypes.string.isRequired
};

export default withTranslation()(ErrorComponent);
