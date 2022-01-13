import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import withTheme from '../../hoc/withTheme';

const getStyle = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  element: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  tab: {
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
    color: theme.fontDesc
  },
  tabbar: {
    backgroundColor: theme.appBar,
    // height: 50
  },
  selectedTab: {
    fontSize: 16,
    fontWeight: '600',
    padding: 16,
    color: theme.fontMain
  },
  label: {
    fontSize: 16,
    fontWeight: '600'
  }
});

class TabBar extends React.Component {


  render() {
    const {
      tabs,
      tabPressHandle,
      selectedCategory,
      theme
    } = this.props;

    const styles = getStyle(theme);
    return (
      <View style={styles.tabbar}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          ref={(ref) => { this.flatListRef = ref; }}
          keyExtractor={(item) => item.key}
          data={tabs}
          extraData={selectedCategory}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => tabPressHandle(item.key)}
            >
              <Text style={(selectedCategory === item.key) ? styles.selectedTab : styles.tab}>
                {item.name.toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
};

export default withTheme(TabBar);
