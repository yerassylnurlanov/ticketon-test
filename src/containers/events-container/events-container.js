import React from 'react';
import { withNavigation, withNavigationFocus } from 'react-navigation';
import { TouchableOpacity, View, Platform, Animated } from 'react-native';
import { Icon } from 'native-base';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tab, Tabs, ScrollableTab } from 'native-base';
import firebase from 'react-native-firebase';
import withTheme from '../../hoc/withTheme';
import { selectEventCategory } from '../../store/actions/events-actions';
import { getCategories } from '../../store/actions/categories-actions';
import Spinner from '../../components/spinner';
import ErrorComponent from '../../components/error-component';
import { withTranslation } from 'react-i18next';
import EventsTab from '../events-tab';

class EventsContainer extends React.Component {
  state = {
    bigMode: false,
    index: 0,
    routes: []
  };
  _isMounted = false;

  constructor(props) {
    super(props);
    this.moveAnimation = new Animated.Value(0);
    this.moveAnimationOpposite = new Animated.Value(0);
  }

  // _moveBar = () => {
  //   Animated.sequence([
  //     Animated.parallel([
  //       Animated.spring(this.moveAnimation, {
  //         toValue: -20
  //       }),
  //       Animated.spring(this.moveAnimationOpposite, {
  //         toValue: 20
  //       })
  //     ]),
  //     Animated.parallel([
  //       Animated.spring(this.moveAnimation, {
  //         toValue: 0,
  //       }),
  //       Animated.spring(this.moveAnimationOpposite, {
  //         toValue: 0
  //       })
  //     ])
  //
  //   ]).start();
  // };

  componentDidMount() {
    const {
      language,
      navigation,
      theme,
      categories,
      selectedCategory,
      getCategories
    } = this.props;

    this._isMounted = true;

    const headerRightEvents = (
      <View
        style={{
          justifyContent: 'flex-end',
          flexDirection: 'row',
          width: 50,
          alignItems: 'center'
        }}
      >
        <TouchableOpacity onPress={this.toggleMode}>
          <Icon
            style={{ fontSize: 22, color: theme.appBarFont }}
            name="cards-variant"
            type="MaterialCommunityIcons"
          />
        </TouchableOpacity>
      </View>
    );
    if (!Platform.isPad) {
      navigation.setParams({ headerRightEvents });
    }

    getCategories(language).then(() => {
      if (selectedCategory) {
        const index = this.props.categories.findIndex(
          el => el.key === this.props.selectedCategory
        );
        setTimeout(() => {
          this.tabs.goToPage(index);
        }, 500);
      }
    });
  }

  componentDidUpdate(prevProps) {
    const { selectedCategory, categories, isLoadingCategories } = this.props;

    if (selectedCategory !== prevProps.selectedCategory) {
      const page = categories.findIndex(el => el.key === selectedCategory);
      const index = this.props.categories.findIndex(
        el => el.key === this.props.selectedCategory
      );
      this.tabs.goToPage(index);
    }

    if (
      isLoadingCategories &&
      isLoadingCategories !== prevProps.isLoadingCategories
    ) {
    }
  }

  toggleMode = () => {
    const { bigMode } = this.state;
    this.setState({ bigMode: !bigMode });
  };

  eventSelectHandle = (id, category, title) => {
    const { navigation } = this.props;
    navigation.navigate("Push", { id, category, title });
  };

  handleChangeTab = index => {
    const { categories } = this.props;
    firebase.analytics().logEvent("view_item_list", {
      item_category: categories[index]
    });
  };

  onRefresh = () => {

  }

  render() {
    const {
      isLoadingCategories,
      eventsError,
      categoriesError,
      theme,
      categories,
      category
    } = this.props;
    const { bigMode, index } = this.state;

    if (isLoadingCategories) {
      return <Spinner />;
    }

    if (eventsError) {
      return <ErrorComponent errorText={eventsError} />;
    }

    if (categoriesError) {
      return <ErrorComponent errorText={categoriesError} />;
    }

    if (isLoadingCategories) {
      return <Spinner />;
    }

    return (
      <View style={{ flex: 1 }}>
        <View style={{ top:0, right: 0, left: 0, height: 49, backgroundColor: theme.appBar, position: 'absolute'}}/>
          <Tabs
            ref={c => {
              this.tabs = c;
              return;
            }}
            tabBarUnderlineStyle={{ backgroundColor: theme.fontMain }}
            renderTabBar={() => (
              <ScrollableTab
                style={[
                  {
                    backgroundColor: theme.appBar
                  }
                ]}
              />
            )}
            onChangeTab={this.handleChangeTab}
          >
            {categories.map(category => (
              <Tab
                heading={category.name}
                key={category.id}
                textStyle={{ color: theme.fontMain }}
                activeTextStyle={{ color: theme.headerBarTint }}
                tabStyle={{ backgroundColor: theme.appBar }}
                activeTabStyle={{ backgroundColor: theme.appBar }}
              >
                <Animated.View style={{ left: this.moveAnimationOpposite, flex: 1 }}>
                  <EventsTab
                    onRefresh={this.onRefresh}
                    category={category.key}
                    bigMode={bigMode}
                    eventSelectHandle={this.eventSelectHandle}
                  />
                </Animated.View>

              </Tab>
            ))}
          </Tabs>
      </View>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  categories: state.categories.categories,
  selectedCategory: state.events.selectedCategory,
  selectedCity: state.city.selectedCity,
  language: state.app.language,
  isLoadingCategories: state.categories.isLoading,
  categoriesError: state.categories.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectEventCategory,
      getCategories
    },
    dispatch
  );

export default compose(
  withNavigation,
  withTheme,
  withNavigationFocus,
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(EventsContainer);
