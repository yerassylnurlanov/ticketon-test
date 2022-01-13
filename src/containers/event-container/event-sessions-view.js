import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform
} from 'react-native';
import {
  FlatList
} from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';
import SessionPicker from '../../components/session-picker';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.mainBackground
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 1,
    paddingVertical: 4
  },
  timePriceContainer: {
    flex: 4,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameDescContainer: {
    flex: 6,
    margin: 8,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  timeLabel: {
    color: theme.fontMain,
    textAlign: 'center',
    fontSize: 14,
  },
  priceLabel: {
    color: 'orange',
    fontSize: 16,
    fontWeight: '600'
  },
  nameLabel: {
    color: theme.fontMain,
    fontSize: 16
  },
  descriptionLabel: {
    color: theme.fontDesc,
    fontSize: 14
  },
  typeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  typeText: {
    // backgroundColor: 'red',
    transform: [{ rotate: '270deg' }],
    fontSize: 8,
    fontWeight: "400",
    color: theme.appBar
  }
});

const EventSessionsView = ({
  sessions,
  dates,
  types,
  onDateChange,
  onTypeChange,
  selectedDate,
  selectedType,
  theme,
  onRefresh,
  isLoading,
  handleEventSelectSession,
  t
}) => {
  const styles = getStyles(theme);

  let sessionsList;
  if (selectedType === 'place') {
    sessionsList = (
      <FlatList
        refreshing={isLoading}
        onRefresh={onRefresh}
        style={{ backgroundColor: theme.mainBackground }}
        data={sessions.places}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 16, borderBottomWidth: 0.5 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.fontMain, fontSize: 20, fontWeight: '500' }}>
                {item.name}
              </Text>
              <Text>{item.address}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <FlatList
                style={{ marginTop: 16 }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                data={item.sessions}
                renderItem={({ item }) => {
                  const datetime = Math.round(+new Date() / 1000);
                  if (datetime > item.ts) {
                    return null;
                  }
                  return (
                    <TouchableOpacity
                      onPress={() => handleEventSelectSession(item.id)}
                    >
                      <View style={{
                        backgroundColor: theme.appBar,
                        margin: 8,
                        borderRadius: 4,
                        paddingVertical: 8,
                        paddingHorizontal: 16,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                        <Text style={{
                          color: 'white',
                          fontWeight: '600'
                        }}>{item.timestring} {item.lang ? `(${item.lang})` : ''}</Text>
                        <Text
                          style={{
                            color: theme.fontMain,
                            fontWeight: '500'
                          }}
                        >{item.price}</Text>
                        {(item.availableSeats) ? (
                          <Text
                            style={{
                              color: theme.fontMain,
                              fontWeight: '500'
                            }}
                          >{(item.availableSeats > 0) ? t('availableSeats') + ': ' + item.availableSeats : t('noSeats')}</Text>
                        ) : (null)}
                      </View>
                    </TouchableOpacity>
                  )
                }}
              />
            </View>
          </View>
        )}
      />
    );
  } else {
    sessionsList = (
      <FlatList
        refreshing={isLoading}
        onRefresh={onRefresh}
        keyExtractor={(item, index) => index.toString()}
        data={sessions.sessions}
        renderItem={({item}) => {
          const place = sessions.places[item.place_id];
          const datetime = Math.round(+new Date() / 1000);
          if (datetime > item.ts) {
            return null;
          }
          return (
            <TouchableOpacity onPress={() => handleEventSelectSession(item.id)}>
              <View style={styles.container}>
                <View style={styles.timePriceContainer}>
                  <Text style={styles.timeLabel}>{item.timestring} ({item.lang})</Text>
                  <Text style={styles.priceLabel}>{item.price}</Text>
                </View>
                <View style={styles.nameDescContainer}>
                  <Text style={styles.nameLabel}>{place ? place.name : 'Error'}</Text>
                  <Text
                    style={styles.descriptionLabel}
                    numberOfLines={2}
                  >
                    {place ? place.address : 'Error'}
                  </Text>
                </View>
                <View style={styles.typeContainer}>
                  <Text style={styles.typeText}>{(item.format !== '') ? item.format : ''}</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  }

  return (
    <View style={styles.root}>
      <View
        style={{ height: 50, marginHorizontal: Platform.OS === 'ios' ? 4 : 8, marginBottom: -8 }}
      >
        <SessionPicker
          dates={dates}
          types={types}
          onDateChange={onDateChange}
          onTypeChange={onTypeChange}
          selectedDate={selectedDate}
          selectedType={selectedType}
        />
      </View>
      {sessionsList}
    </View>
  );
};

export default compose(withTheme, withTranslation(), withNavigation)(EventSessionsView);
