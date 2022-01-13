import React from 'react';
import {
  Text,
  StyleSheet,
  Linking,
  Platform, Switch
} from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  Container,
  Icon,
  Content,
  List,
  ListItem,
  Left,
  Right,
  Separator,
  Body
} from 'native-base';
import { useTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.mainBackground,
  },
  textBlock: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  textBlockTitle: {
    fontSize: 16,
    color: theme.fontMain
  },
  textBlockValue: {
    fontSize: 14,
    color: theme.fontDesc
  },
  icon: {
    fontSize: 20,
    color: theme.fontMain
  },
  separator: {
    backgroundColor: theme.separator
  }
});

const SettingsView = (
  {
    selectedCity,
    language,
    theme,
    onCityClick,
    onLanguageClick,
    onVersionClick,
    onSetPinClick,
    isUsePin,
    toggleUsePin,
    toggleTheme,
    navigation
  }
) => {
  const styles = getStyles(theme);
  const { t } = useTranslation();
  return (
    <Container style={styles.root}>
      <Content>
        <List>
          <Separator style={styles.separator}/>
          <ListItem button onPress={onCityClick}>
            <Left style={styles.textBlock}>
              <Text style={styles.textBlockTitle}>{t('city')}</Text>
              <Text style={styles.textBlockValue}>{(selectedCity) ? selectedCity.name : ''}</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem button onPress={onLanguageClick}>
            <Left style={styles.textBlock}>
              <Text style={styles.textBlockTitle}>{t('language')}</Text>
              <Text style={styles.textBlockValue}>{t(language)}</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem button onPress={onSetPinClick}>
            <Left style={styles.textBlock}>
              <Text style={styles.textBlockTitle}>{t('setPin')}</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward"/>
            </Right>
          </ListItem>
          {/*<ListItem>*/}
          {/*  <Left style={styles.textBlock}>*/}
          {/*    <Text style={styles.textBlockTitle}>{t('usePin')}</Text>*/}
          {/*  </Left>*/}
          {/*  <Right>*/}
          {/*    <Switch onValueChange={toggleUsePin}*/}
          {/*            value={isUsePin}/>*/}
          {/*  </Right>*/}
          {/*</ListItem>*/}
          {/*<ListItem button onPress={toggleTheme}>*/}
          {/*  <Left style={styles.textBlock}>*/}
          {/*    <Text style={styles.textBlockTitle}>{t('theme')}</Text>*/}
          {/*    <Text style={styles.textBlockValue}>{ theme.name }</Text>*/}
          {/*  </Left>*/}
          {/*  <Right>*/}
          {/*    <Icon name="arrow-forward" />*/}
          {/*  </Right>*/}
          {/*</ListItem>*/}
          {/*<Separator style={styles.separator}>*/}
          {/*  <Text style={styles.textBlockValue}>{t('about')}</Text>*/}
          {/*</Separator>*/}
          <ListItem button onPress={() => {
            Linking.openURL('https://m.ticketon.kz/agreement').catch((err) => console.error('An error occurred', err));
          }}>
            <Left style={styles.textBlock}>
              <Text style={styles.textBlockTitle}>{t('rules')}</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward"/>
            </Right>
          </ListItem>
          <ListItem button onPress={onVersionClick}>
            <Left style={styles.textBlock}>
              <Text style={styles.textBlockTitle}>{t('version')}</Text>
              <Text style={styles.textBlockValue}>{Platform.OS === 'ios' ? '4.4.0' : '3.4.0'}</Text>
            </Left>
          </ListItem>
          {/*<ListItem icon button onPress={()=>console.log('asd')}>*/}
          {/*  <Left>*/}
          {/*    <Icon name="dingding" type="AntDesign" />*/}
          {/*  </Left>*/}
          {/*  <Body style={styles.textBlock}>*/}
          {/*    <Text style={styles.textBlockTitle}>{t('developed')}</Text>*/}
          {/*    <Text style={styles.textBlockValue}>Sunrise Development</Text>*/}
          {/*  </Body>*/}
          {/*</ListItem>*/}
          {/*<ListItem icon button onPress={()=>console.log('asd')}>*/}
          {/*  <Left>*/}
          {/*    <Icon style={styles.icon} name="smileo" type="AntDesign" />*/}
          {/*  </Left>*/}
          {/*  <Body style={styles.textBlock}>*/}
          {/*    <Text style={styles.textBlockTitle}>{t('rateUs')}</Text>*/}
          {/*  </Body>*/}
          {/*</ListItem>*/}
        </List>
      </Content>
    </Container>
  );
};

export default withNavigation(withTheme(SettingsView));
