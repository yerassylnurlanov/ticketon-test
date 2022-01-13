import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { withTranslation } from 'react-i18next';
import ErrorComponent from '../../components/error-component';
import EventEntry from '../../components/event-entry';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import withTheme from '../../hoc/withTheme';
import SearchResultEntry from '../../components/search-result-entry/search-result-entry';

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
    flexDirection: 'row'
  },
  leftColumn: {
    width: '50%',
    flexDirection: 'column',
    paddingLeft: 12,
    paddingRight: 4
  },
  rightColumn: {
    width: '50%',
    flexDirection: 'column',
    paddingLeft: 4,
    paddingRight: 12
  },
});

const SearchView = (
  {
    resultSelectHandle,
    searchResults,
    theme,
    t
  }
) => {
  const styles = getStyle(theme);
  const leftColumn = [];
  const rightColumn = [];

  searchResults.forEach((result, i) => {
    if (i % 2 === 0) {
      leftColumn.push(result);
    } else {
      rightColumn.push(result);
    }
  });

  return (
    <View style={styles.root}>
      <ScrollView
        bounces
      >
        <View style={styles.columnsContainer}>
          <View style={styles.leftColumn}>
            {leftColumn.map(el => {
              return (
                <TouchableOpacity onPress={() => resultSelectHandle(el.type, el.full)}>
                  <SearchResultEntry {...el} />
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.rightColumn}>
            {rightColumn.map(el => {
              return (
                <TouchableOpacity onPress={() => resultSelectHandle(el.type, el.full)}>
                  <SearchResultEntry {...el} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default withTheme(withTranslation()(SearchView));
