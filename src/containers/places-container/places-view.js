import React from 'react';
import {
  StyleSheet,
  ScrollView, Text, View, FlatList
} from 'react-native';
import {
  Tab,
  Tabs,
  ScrollableTab,
  Container
} from 'native-base';
import withTheme from '../../hoc/withTheme';
import Spinner from '../../components/spinner';
import PlaceItem from '../../components/place-item/place-item';
import ErrorComponent from '../../components/error-component';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgb(245,245,245)'
  },
  blank: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

const PlacesView = (
  {
    isLoadingCategories,
    isLoadingPlaces,
    errorCategories,
    errorPlaces,
    categories,
    selectedTab,
    places,
    theme,
    handleChangeTab,
    handleBuildRoad,
    handlePlaceSelect,
    t
  }
) => {
  const styles = getStyles(theme);

  if (isLoadingCategories) {
    return <Spinner/>;
  }

  if (errorCategories) {
    return <ErrorComponent errorText={errorCategories} />
  }

  if (errorPlaces) {
    return <ErrorComponent errorText={errorPlaces} />
  }

  // var tab = (isLoadingPlaces) ? (<Spinner/>) : (places.selectedCategoryPlaces.places.length === 0) ? (
  //   <View style={styles.blank}>
  //     <Text>{t('noEvents')}</Text>
  //   </View>
  // ) : places.selectedCategoryPlaces.places.map((place) => {
  //   return (
  //     <PlaceItem
  //       handlePlaceSelect={handlePlaceSelect}
  //       handleBuildRoad={handleBuildRoad}
  //       key={place.place_id}
  //       place={place}
  //     />
  //   );
  // });

  const tab = (isLoadingPlaces) ? (<Spinner/>) : (
    <FlatList
      contentContainerStyle={{ flexGrow: 1 }}
      ListEmptyComponent={() => (
        <View style={styles.blank}>
          <Text>{t('noEvents')}</Text>
        </View>
      )}
      keyExtractor={(item) => item.place_id.toString()}
      data={places.selectedCategoryPlaces.places}
      renderItem={({item}) => (
        <PlaceItem
          handlePlaceSelect={handlePlaceSelect}
          handleBuildRoad={handleBuildRoad}
          key={item.place_id}
          place={item}
        />
      )}
    />
  );

  return (
    <Container>
      <Tabs
        tabBarUnderlineStyle={{ backgroundColor: theme.fontMain }}
        renderTabBar={() => <ScrollableTab style={{ backgroundColor: theme.appBar }}/>}
        // page={selectedTab}
        onChangeTab={handleChangeTab}
      >
        {categories.categories.map(category => (
          <Tab
            heading={category.name} key={category.id}
            textStyle={{color: theme.fontMain}}
            activeTextStyle={{color: theme.headerBarTint}}
            tabStyle={{backgroundColor: theme.appBar}}
            activeTabStyle={{backgroundColor: theme.appBar}}
          >
            {(isLoadingPlaces) ? (<Spinner/>) :
              tab
            }
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

export default withTranslation()(withTheme(PlacesView));
