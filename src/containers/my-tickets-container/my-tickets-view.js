import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import {
  Icon
} from 'native-base'
import {
  compose
} from 'redux';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';
import CountDown from 'react-native-countdown-component';
import moment from 'moment';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  ticket: {
    flex: 1,
    backgroundColor: theme.homeBackground,
    marginVertical: 8,
    padding: 8
  },
  header: {
    flex: 1,
    marginBottom: 8,
    flexDirection: 'row'
  },
  eventName: {
    color: theme.fontMain,
    fontSize: hp(2.5),
    fontWeight: '600'
  },
  placeName: {
    color: theme.fontDesc,
    fontSize: hp(1.5)
  },
  orderNumber: {
    color: theme.fontMain,
    fontSize: hp(3),
    fontWeight: '500'
  },
  ticketsCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cost: {
    color: theme.fontMain,
    fontSize: hp(2),
    fontWeight: '500'
  },
  numberAndTicketsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ticketIcon: {
    fontSize: hp(2),
    marginRight: 4
  },
  date: {
    marginVertical: 4,
    color: theme.fontMain
  },
  title: {
    flex: 1
  },
  status: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  }
});

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const MyTicketsView = (
  {
    tickets,
    theme,
    t,
    refresh,
    refreshing,
    onTicketPress,
    lang
  }
) => {
  const styles = getStyles(theme);

  return (
    <View style={styles.root}>
      <FlatList
        onRefresh={() => refresh()}
        refreshing={refreshing}
        data={tickets.sales}
        renderItem={({ item }) => {
          let icon = 'questioncircleo';

          switch (item.status) {
            case "1":
              icon = 'clockcircleo';
              break;
            case "2":
              icon = 'checkcircleo';
              break;
            case "3":
              icon = 'closecircleo';
              break;
            case "4":
              icon = 'minuscircleo';
              break;
          }
          const timer = (
            <CountDown
              until={item.expire}
              size={15}
              style={{ marginVertical: -10, marginHorizontal: -5 }}
              digitStyle={{backgroundColor: null, borderWidth: 0, borderColor: null }}
              timeLabelStyle={{color: 'red', fontWeight: '600', fontSize: 12 }}
              digitTxtStyle={{ fontSize: 12, color: 'black' }}
              separatorStyle={{color: 'black', fontSize: 12}}
              timeToShow={['H', 'M', 'S']}
              timeLabels={{h:null, m: null, s: null}}
              showSeparator
            />
          );
          moment.locale((lang === 'kz') ? 'kk' : lang);
          const date = moment.unix(item.show.ts).format("DD MMMM YYYY HH:mm");
          const currentDate = new Date().getTime() / 1000;
          return (
            <TouchableOpacity
              onPress={() => onTicketPress(item)}
              style={[
                styles.ticket,
                item.show.ts < currentDate ? { backgroundColor: "#bfbdbe" } : {}
              ]}
            >
              <View style={styles.header}>
                <View style={styles.title}>
                  <Text style={styles.eventName}><Icon name={icon} style={styles.eventName} type="AntDesign" /> {item.show.event}</Text>
                  <Text style={styles.placeName}>{item.show.place}</Text>
                </View>
              </View>
              <View style={styles.content}>
                <View style={styles.numberAndTicketsRow}>
                  <Text style={styles.orderNumber}>{`${t('orderNumber')} ${item.order}`}</Text>
                  <View style={styles.ticketsCount}>
                    <Icon style={styles.ticketIcon} type="Entypo" name="ticket"/>
                    <Text>{item.tickets.length}</Text>
                  </View>
                </View>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.cost}>{item.tickets.reduce((acc, el) => acc + parseInt(el.cost, 10), 0)} {t(item.currency)}</Text>
                {item.status == 1 && (
                <View style={{ flexDirection: 'row' }}>
                  <Text>{t('orderCountdown')} :</Text>
                  {timer}
                </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }
        }
      />
    </View>
  );
}

export default compose(
  withTheme,
  withTranslation()
)(MyTicketsView);
