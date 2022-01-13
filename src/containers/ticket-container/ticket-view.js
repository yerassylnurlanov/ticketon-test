import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView
} from 'react-native';
import { compose } from 'redux';
import { Tab, Tabs } from 'native-base';
import { withTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import Barcode from 'react-native-barcode-builder';
import withTheme from '../../hoc/withTheme';
import moment from 'moment';

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const getStyles = theme => StyleSheet.create(
  {
    root: {
      flex: 1,
      margin: 16,
      backgroundColor: theme.homeBackground
    },
    ticketImg: {
      paddingVertical: 16,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: 16,
      borderBottomWidth: 3,
      borderColor: theme.homeBackground,
      borderStyle: 'dashed',
    },
    field: {
      marginVertical: 8
    },
    desc: {
      fontSize: 16
    },
    value: {
      fontSize: 20
    },
    innerRadiusBottomLeft: {
      backgroundColor: theme.homeBackground,
      height: 50,
      width: 50,
      borderRadius: 25,
      position: 'absolute',
      bottom: -25,
      left: -25,
    },
    innerRadiusBottomRight: {
      backgroundColor: theme.homeBackground,
      height: 50,
      width: 50,
      borderRadius: 25,
      position: 'absolute',
      bottom: -25,
      right: -25,
    },
    innerRadiusTopLeft: {
      backgroundColor: theme.homeBackground,
      height: 50,
      width: 50,
      borderRadius: 25,
      position: 'absolute',
      top: -25,
      left: -25,
    },
    innerRadiusTopRight: {
      backgroundColor: theme.homeBackground,
      height: 50,
      width: 50,
      borderRadius: 25,
      position: 'absolute',
      top: -25,
      right: -25,
    },
  }
);

const TicketView = (
  {
    order,
    theme,
    t
  }
) => {
  const styles = getStyles(theme);
  const date = moment.unix(order.show.ts).format("DD MMMM YYYY HH:mm")

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.homeBackground }}>
        <Tabs
          tabBarPosition="bottom"
          tabBarUnderlineStyle={{ backgroundColor: theme.fontMain }}
        >
          {order.tickets.map((ticket, idx) => {
            let ticketImg;
            if (ticket.ticket_type === 'barcode') {
              ticketImg = (
                <Barcode
                  value={ticket.ticket_code}
                  format="CODE128"
                  width={2}
                  flat
                  height={65}
                  text={ticket.ticket_code}
                />
              );
            } else {
              ticketImg = (
                <QRCode
                  style={{ flex: 1 }}
                  value={ticket.ticket_code}
                />
              )
            }
            return (
              <Tab
                heading={(idx + 1).toString()}
                style={styles.root}
                textStyle={{color: theme.fontDesc}}
                activeTextStyle={{color: theme.fontMain}}
                tabStyle={{backgroundColor: theme.headerBarTint}}
                activeTabStyle={{backgroundColor: theme.headerBarTint}}
              >
                <ScrollView>
                  <View style={styles.ticketImg}>
                    {ticketImg}
                    <View style={styles.innerRadiusBottomLeft}/>
                    <View style={styles.innerRadiusBottomRight}/>
                  </View>
                  <View style={{ backgroundColor: 'white', padding: 25 }}>
                    <View style={styles.innerRadiusTopLeft}/>
                    <View style={styles.innerRadiusTopRight}/>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t(order.show.type)}</Text>
                      <Text style={styles.value}>{order.show.event}</Text>
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t('place')}</Text>
                      <Text style={styles.value}>{`${order.show.place} ${ticket.hall}`}</Text>
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t('session')}</Text>
                      <Text style={styles.value}>{date}</Text>
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t('place')}</Text>
                      <Text style={styles.value}>{`${t('type')} ${ticket.type}, ${t('row').toLowerCase()} ${ticket.row}, ${t('place').toLowerCase()} ${ticket.num}`}</Text>
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t('ticketCode')}</Text>
                      <Text style={styles.value}>{ticket.ticket_code}</Text>
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t('orderNumber')}</Text>
                      <Text style={styles.value}>{order.order}</Text>
                    </View>
                    <View style={styles.field}>
                      <Text style={styles.desc}>{t('price')}</Text>
                      <Text style={styles.value}>{ticket.cost}</Text>
                    </View>
                  </View>
                </ScrollView>
              </Tab>
            );
          })}
        </Tabs>
      </SafeAreaView>
    </View>
  );
}

export default compose(
  withTheme,
  withTranslation()
)(TicketView);
