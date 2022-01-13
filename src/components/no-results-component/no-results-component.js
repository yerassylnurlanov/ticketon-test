import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

const NoResultsComponent = ({ t, description }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        style={{ width: '50%', aspectRatio: 1, marginBottom: 8 }}
        source={require('../../assets/img/no-tickets.png')}
      />
      {description ? (<Text style={{ marginHorizontal: 16, textAlign: 'center'}}>{description}</Text>) : (<Text>{t('noResults')}</Text>)}
    </View>
  );
};

NoResultsComponent.propTypes = {
  description: PropTypes.string
};

export default withTranslation()(NoResultsComponent);
