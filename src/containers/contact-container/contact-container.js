import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView, Linking, Platform,
} from 'react-native';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import { Body, Container, Content, Icon, Left, List, ListItem } from 'native-base';


const getStyles = theme => StyleSheet.create({
  root: {
    backgroundColor: theme.mainBackground
  },
  listItem: {
    paddingVertical: 16,
    height: 90
  },
  textBlockDescription: {
    fontSize: 14,
    color: theme.fontDesc
  },
  textBlockValue: {
    fontSize: 16,
    color: theme.fontMain
  },
  icon: {
    color: theme.fontMain,
    fontSize: 20,
  },
  addressText: {
    flex: 1,
  }
});

class ContactContainer extends React.Component {
  render() {
    const { t, theme } = this.props;
    const styles = getStyles(theme);
    return (
      <Container style={styles.root}>
        <Content>
          <List>
            <ListItem
              style={styles.listItem}
              icon
              button
              onPress={() => Linking.openURL(`tel:+77719365353`)}
            >
              <Left>
                <Icon ios="phone" android="phone" type="AntDesign" style={styles.icon}/>
              </Left>
              <Body>
                <Text style={styles.textBlockValue}>+7 (771) 936-53-53</Text>
                <Text style={styles.textBlockDescription}>{t('supportPhone')}</Text>
              </Body>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
              button
              onPress={() => Linking.openURL(`tel:+77172476350`)}
            >
              <Left>
                <Icon />
              </Left>
              <Body>
                <Text style={styles.textBlockValue}>+7 (717) 247-63-50</Text>
                <Text style={styles.textBlockDescription}>Телефон поддержки (Астана)</Text>
              </Body>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
              button
              onPress={() => Linking.openURL(`tel:+77272251050`)}
            >
              <Left>
                <Icon />
              </Left>
              <Body>
                <Text style={styles.textBlockValue}>+7 (727) 225-10-50</Text>
                <Text style={styles.textBlockDescription}>Телефон поддержки (Алматы)</Text>
              </Body>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
              button
              onPress={() => Linking.openURL('mailto:help@ticketon.kz')}
            >
              <Left>
                <Icon ios="inbox" android="inbox" type="AntDesign" style={styles.icon}/>
              </Left>
              <Body>
                <Text style={styles.textBlockValue}>help@ticketon.kz</Text>
                <Text style={styles.textBlockDescription}>Электронная почта</Text>
              </Body>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
              button
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('http://maps.apple.com/?ll=37.484847,-122.148386');
                } else {
                  Linking.openURL('geo:37.484847,-122.148386');
                }
              }}
            >
              <Left>
                <Icon name="location-pin" type="Entypo" style={styles.icon} />
              </Left>
              <Body style={{ height: 100 }}>
                <Text style={styles.textBlockValue}>
                  Казахстан, г. Алматы, проспект Жибек Жолы, 135, блок 3, 10 этаж, 3103.
                </Text>
                <Text style={styles.textBlockDescription}>Адрес</Text>
              </Body>
            </ListItem>
            <ListItem itemDivider>
              <Text>{t('cashboxes')}</Text>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
            >
              <Body style={styles.addressText}>
                <Text style={styles.textBlockValue}>г. Нур-Султан: ТРЦ MEGA Silk Way, 1-й этаж</Text>
                <Text style={styles.textBlockDescription}>(возле магазина Pandora)</Text>
              </Body>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
            >
              <Body style={styles.addressText}>
                <Text style={styles.textBlockValue}>г. Алматы: ТРЦ ""Глобус"", 2-й этаж</Text>
              </Body>
            </ListItem>
            <ListItem
              style={styles.listItem}
              icon
            >
              <Body style={styles.addressText}>
                <Text style={styles.textBlockValue}>г. Караганда: ТРЦ ""City Mall"", 1-й этаж</Text>
                <Text style={styles.textBlockDescription}>Центр Бокса им. Сапиева, пр. Республики, 11/3</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default withTheme(withTranslation()(ContactContainer));
