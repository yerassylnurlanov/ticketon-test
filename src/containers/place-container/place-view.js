import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView
} from 'react-native';
import {
  // ScrollView,
  FlatList
} from 'react-native-gesture-handler';
import { compose } from 'redux';
import MapView, { Marker } from 'react-native-maps';
import { withTranslation } from 'react-i18next';
import {
  Tabs,
  Tab
} from 'native-base';
import withTheme from '../../hoc/withTheme';
import SessionPicker from '../../components/session-picker/session-picker';
import Spinner from '../../components/spinner';
import SessionItemTime from '../../components/session-item-time';
import SessionsCinemaListItem from '../../components/sessions-cinema-list-item/sessions-cinema-list-item';
import { ticketon } from '../../consts/urls';
import ErrorComponent from '../../components/error-component';
import NoResultsComponent from '../../components/no-results-component/no-results-component';
import ImageViewer from 'react-native-image-zoom-viewer';
import { WebView } from 'react-native-webview';

const { width, height } = Dimensions.get('window');

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1
  },
  tab: {
    backgroundColor: theme.appBar,
  },
  tabText: {
    color: theme.fontDesc,
    fontWeight: '800'
  },
  activeTabText: {
    color: theme.fontMain
  },
  textContainer: {
    padding: 16,
  },
  placeName: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 4
  },
  placeAddress: {
    marginVertical: 4,
  },
  imageContainer: {
    paddingVertical: 8,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3
  },
  image: {
    marginHorizontal: 0,
    width: 300,
    height: 200,
    resizeMode: 'cover'
  },
  mapContainer: {
    paddingVertical: 16
  },
  sessionList: {
    backgroundColor: '#f4f4f4',
    padding: 8
  }
});

const PlaceView = (
  {
    types,
    dates,
    sessions,
    sortType,
    selectedType,
    selectedDate,
    handleSortTypeChange,
    handleSortDateChange,
    place,
    theme,
    isLoadingSessions,
    handleSessionSelect,
    errorSessions,
    handleSelectImage,
    t,
    height,
    updateHeight,
    handleDonation
  }
) => {
  const styles = getStyles(theme);

  let sessionsList;

  if (isLoadingSessions) {
    sessionsList = <Spinner/>
  }

  if (errorSessions) {
    return <ErrorComponent errorText={errorSessions}/>
  }

  if (sortType === 'time' && !isLoadingSessions) {
    const sessionsFormatted = Object.keys(sessions.days).reduce((acc, cur) => [...acc, ...sessions.days[cur]], []);
    sessionsList = (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={
          <SessionPicker
            dates={dates}
            types={types}
            selectedDate={selectedDate}
            selectedType={selectedType}
            onTypeChange={handleSortTypeChange}
            onDateChange={handleSortDateChange}
          />
        }
        ListEmptyComponent={
          <NoResultsComponent description={t('noEvents')}/>
        }
        style={styles.sessionList}
        keyExtractor={(item, index) => index.toString()}
        data={sessionsFormatted}
        renderItem={({ item }) => {
          const datetime = Math.round(+new Date() / 1000);
          if (datetime > item.ts) {
            return null;
          }
          return (
            <TouchableOpacity onPress={() => handleSessionSelect(item.show_id)}>
              <SessionItemTime
                availableSeats={item.availableSeats}
                lang={item.lang}
                format={item.format}
                time={item.datetime}
                price={item.price}
                name={sessions.events[item.event_id].event_name}
                description={sessions.events[item.event_id].event_description}
              />
            </TouchableOpacity>
          );
        }}
      />
    );
  } else if (sortType === 'event' && !isLoadingSessions) {
    sessionsList = (
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        ListHeaderComponent={
          <SessionPicker
            dates={dates}
            types={types}
            selectedDate={selectedDate}
            selectedType={selectedType}
            onTypeChange={handleSortTypeChange}
            onDateChange={handleSortDateChange}
          />
        }
        ListEmptyComponent={
          <NoResultsComponent description={t('noEvents')}/>
        }
        style={styles.sessionList}
        keyExtractor={(item, index) => index.toString()}
        data={sessions.events}
        extraData={this.state}
        renderItem={({ item }) => {
          const datetime = Math.round(+new Date() / 1000);
          if (datetime > item.ts) {
            return null;
          }
          return (
            <SessionsCinemaListItem
              handleSessionSelect={handleSessionSelect}
              sessions={item.sessions}
              eventName={item.event_name}
              rating={item.event_rating}
              eventDescription={item.event_description}
              eventImageUrl={ticketon + item.event_main_image}
            />
          );
        }}
      />
    );
  }

  return (
    <View style={styles.root}>
      <Tabs
        style={{ flex: 1 }}
        tabBarUnderlineStyle={{ backgroundColor: theme.fontMain }}
      >
        <Tab
          textStyle={{ color: theme.fontMain }}
          activeTextStyle={{ color: theme.headerBarTint }}
          tabStyle={{ backgroundColor: theme.appBar }}
          activeTabStyle={{ backgroundColor: theme.appBar }}
          heading={t('sessions').toUpperCase()}
        >
          <View style={{ flex: 1 }}>
            {sessionsList}
          </View>
        </Tab>
        <Tab
          style={{ flex: 1 }}
          textStyle={{ color: theme.fontMain }}
          activeTextStyle={{ color: theme.headerBarTint }}
          tabStyle={{ backgroundColor: theme.appBar }}
          activeTabStyle={{ backgroundColor: theme.appBar }}
          heading={t('description').toUpperCase()}
        >
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.textContainer}>
              <Text style={styles.placeName}>{place.place_name}</Text>
              <Text style={styles.placeAddress}>{place.place_address}</Text>
            </View>
            {place.place_donations === 1 ? (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.appBar,
                  margin: 16,
                  padding: 16,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => handleDonation(place.place_id)}
              >
                <Text
                  style={{ color: 'white' }}
                >
                  {t('donation')}
                </Text>
              </TouchableOpacity>
            ) : null}
            <View style={{ flex: 1 }}>
              <WebView
                renderLoading={() => <Spinner/>}
                startInLoadingState={true}
                renderError={errorName => <ErrorComponent errorText={errorName}/>}
                injectedJavaScript={'setTimeout(function() { window.ReactNativeWebView.postMessage(document.body.scrollHeight.toString()); }, 1000);'}
                onMessage={(event) => {
                  updateHeight(parseInt(event.nativeEvent.data));
                }}
                style={{ height: height, marginHorizontal: 8 }}
                source={{ html: place.place_text }}
              />
            </View>
            <View style={styles.imageContainer}>
              <FlatList
                // maxToRenderPerBatch={}
                // initialNumToRender={}
                // windowSize={}
                // getItemCount={}
                keyExtractor={(item, index) => index.toString()}
                data={(place) ? place.images : []}
                // getItem={}
                // updateCellsBatchingPeriod={}
                horizontal
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => handleSelectImage(index)}>
                    <Image style={styles.image} source={{ uri: item }}/>
                  </TouchableOpacity>
                )}
                // disableVirtualization={}
              />
            </View>
            {(place.coordinates) ? (
              <View style={styles.mapContainer}>
                <MapView
                  style={{ height: width, width }}
                  initialRegion={{
                    latitude: place.coordinates.latitude,
                    longitude: place.coordinates.longitude,
                    latitudeDelta: 0.00922,
                    longitudeDelta: 0.00421,
                  }}
                >
                  <Marker coordinate={place.coordinates}/>
                </MapView>
                {/*<YaMap*/}
                {/*  style={{ flex: 1, width: '100%', height: 400 }}*/}
                {/*>*/}
                {/*  <Marker*/}
                {/*    point={{*/}
                {/*      lat: place.coordinates.latitude,*/}
                {/*      lon: place.coordinates.longitude,*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</YaMap>*/}
              </View>
            ) : null}
          </ScrollView>
        </Tab>
      </Tabs>
    </View>
  );
};

export default compose(
  withTheme,
  withTranslation()
)(PlaceView);
