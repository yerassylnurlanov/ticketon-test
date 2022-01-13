import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  View, ScrollView,
} from 'react-native';
import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right
} from 'native-base';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';

const getStyles = theme => StyleSheet.create({
  root: {
  },
  text: {
    color: theme.fontMain
  }
});

const SettingsCityView = ({
  cities,
  selectedCity,
  handleSelectCity,
  theme,
  query,
  onChangeQuery,
  t,
  navigation
}) => {
  const styles = getStyles(theme);
  return (
      <SafeAreaView style={styles.root}>
        <View>
          <TextInput
            placeholder={t('selectCity')}
            style={{borderBottomWidth: 1, margin: 24 }}
            value={query}
            onChangeText={onChangeQuery}
          />
          <ScrollView>
          <List>
            {(cities) ? cities.map(el => (
              <ListItem
                button
                onPress={() => handleSelectCity(el.id)}
                key={el.id}
                selected={el.id === selectedCity}
              >
                <Left>
                  <Text style={styles.text}>{el.name}</Text>
                </Left>
                <Right>
                  {(el.id === selectedCity) ? <Icon name="check" type="AntDesign" /> : null }
                </Right>
              </ListItem>
            )) : null}
          </List>
            <View style={{ height: 200}}/>
          </ScrollView>
        </View>
      </SafeAreaView>
  );
};

export default compose(withTranslation(), withTheme)(SettingsCityView);
