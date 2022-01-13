import React from 'react';
import {
  Text,
  StyleSheet
} from 'react-native';
import {
  Container,
  Content,
  List,
  ListItem,
  Body,
  Right, Icon
} from 'native-base';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.mainBackground
  },
  icon: {
    fontSize: 14
  },
  text: {
    color: theme.fontMain
  }
});

const SettingsCityView = ({ theme, selectedLanguage, handleLanguageSelect }) => {
  const styles = getStyles(theme);
  return (
    <Container style={styles.root}>
      <Content>
        <List>
          <ListItem
            button
            onPress={() => handleLanguageSelect('ru')}
          >
            <Body>
              <Text style={styles.text}>Русский</Text>
            </Body>
            <Right>
              {(selectedLanguage === 'ru') ? <Icon styles={styles.icon} name="check" type="AntDesign" /> : null }
            </Right>
          </ListItem>
          <ListItem
            button
            onPress={() => handleLanguageSelect('en')}
          >
            <Body>
              <Text style={styles.text}>English</Text>
            </Body>
            <Right>
              {(selectedLanguage === 'en') ? <Icon styles={styles.icon} name="check" type="AntDesign" /> : null }
            </Right>

          </ListItem>
          <ListItem
            button
            onPress={() => handleLanguageSelect('kz')}
          >
            <Body>
              <Text style={styles.text}>Қазақ тілі</Text>
            </Body>
            <Right>
              {(selectedLanguage === 'kz') ? <Icon styles={styles.icon} name="check" type="AntDesign" /> : null }
            </Right>

          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default withTheme(SettingsCityView);
