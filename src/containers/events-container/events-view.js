import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import EventEntry from '../../components/event-entry';
import withTheme from '../../hoc/withTheme';

const getStyle = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
  element: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  blank: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tab: {
    padding: 16,
  },
  tabbar: {
    backgroundColor: theme.appBar,
    height: 50
  },
  selectedTab: {
    padding: 16,
    backgroundColor: 'red'
  },

  columnsContainer: {
   flex: 1,
   flexDirection: 'row'
  },
  leftColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  rightColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  columnElement: {
    flex: 0,
    // width: wp(50),
  }
});

const EventsView = ({
  theme,
  events,
  mode,
  eventSelectHandle,
  selectedCategory,
  onRefresh,
  isRefreshing,
  category,
  t
}) => {
  const styles = getStyle(theme);
  if (selectedCategory === null) {
    return (
      <View style={styles.blank}>
        <Text>{t('chooseCategory')}</Text>
      </View>
    );
  }

  // if (events.length === 0) {
  //   return (
  //     <View style={styles.blank}>
  //       <Text>{t('noEvents')}</Text>
  //     </View>
  //   );
  // }

  if (mode) {
    return (
      <View style={styles.root}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={() => (
            <View style={styles.blank}>
              <Text>{t('noEvents')}</Text>
            </View>
          )}
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          style={styles.list}
          data={events}
          key={mode ? 'h' : 'v'}
          keyExtractor={(item) => item.event_id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              // key={(mode) ? '1' : '2' + item.event_id.toString()}
              onPress={() => eventSelectHandle(item.event_id, category, item.event_name)}
            >
              <EventEntry style={styles.element} {...item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={() => (
          <View style={styles.blank}>
            <Text>{t('noEvents')}</Text>
          </View>
        )}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        numColumns={ 2 }
        data={events}
        key={mode ? 'h' : 'v'}
        initialNumToRender={10}
        keyExtractor={(item) => item.event_id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.element}
            onPress={() => eventSelectHandle(item.event_id, category, item.event_name)}>
            <EventEntry isMini {...item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default compose(withTheme, withTranslation())(EventsView);
