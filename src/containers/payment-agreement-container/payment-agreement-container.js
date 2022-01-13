import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.mainBackground,
    flexDirection: 'column',
  },
  image: {
    height: 90,
    width: 300,
    margin: 16,
    resizeMode: 'contain'
  },
  description: {
    flex: 1,
    textAlign: 'justify',
    marginHorizontal: 16,
    fontSize: 18,
    color: theme.fontMain
  },
  header: {
    flex: 1,
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 16,
    fontSize: 20,
    fontWeight: '600',
    color: theme.fontMain
  }
});

class PaymentAgreementContainer extends React.Component {
  render() {
    const { t, theme } = this.props;
    const styles = getStyles(theme);
    const text = t('paymentAgreementText');
    const paragraphs = text.split('#');
    return (
      <ScrollView style={styles.root}>
        <View style={{ flex: 1, marginBottom: 30, alignItems: 'center' }}>
          {paragraphs.map(par => (
            <Text style={(par.length < 30) ? styles.header : styles.description}>
              { par }
            </Text>
          ))}
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(withTranslation()(PaymentAgreementContainer));
