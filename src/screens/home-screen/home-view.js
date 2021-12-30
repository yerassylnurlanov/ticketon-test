import React from 'react';
import 'moment/min/moment-with-locales'
import {
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
  TouchableOpacity,
  Text
} from 'react-native';
import { Icon } from 'native-base';
import moment from 'moment';
// import 'moment/locale/ru';
import { useTranslation } from 'react-i18next';
import HorizontalList from '../../components/horizontal-list';
import BoxOffice from '../../components/box-office-list';
import Carousel from '../../components/carousel';
import withTheme from '../../hoc/withTheme';
import TicketonLive from '../../components/ticketon-live/ticketon-live';
import CustomStatusBar from '../../components/custom-app-bar';
import ErrorComponent from '../../components/error-component';
import CalendarModal from '../../components/calendar-modal';
import SelectCityModal from '../../components/select-city-modal';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: theme.mainBackground,
  },
  carousel: {
    marginBottom: 8
  },
  scrollViewElement: {
    margin: 8
  }
});

const HomeView = ({
  theme,
  ticketon_live,
  top_grosses,
  grosses_from,
  grosses_to,
  popular_events,
  slider_pages,
  recommended_events,
  isLoading,
  onRefresh,
  categories,
  handleEventSelect,
  handleCategorySelect,
  handleTicketonLiveMore,
  handleSliderSelect,
  error,
  calendarVisible,
  onSubmitCalendar,
  onCloseCalendar,
  currentDate,
  isCityModalVisible,
  onOpenCityModal,
  onCloseCityModal,
  selectedCity,
  cities,
  language
}) => {
  const { t } = useTranslation();
  const styles = getStyles(theme);
  // moment.locale(language);
  const from = moment.unix(grosses_from).format("D");
  const to = moment.unix(grosses_to).format("D MMMM");
  return (
    <View style={styles.root}>
      <CalendarModal currentDate={currentDate} onCloseCalendar={onCloseCalendar} isCalendarVisible={calendarVisible} onSubmitCalendar={onSubmitCalendar}/>
      <SelectCityModal onCloseCityModal={onCloseCityModal} isVisible={isCityModalVisible} />
      <ScrollView
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={onRefresh} />}
      >
        {(error) ? (<ErrorComponent errorText={error} />) : (
          <View>
            <TouchableOpacity
              style={{
                justifyContent: 'space-between',
                // alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 30,
                marginHorizontal: 24,
                borderBottomWidth: 2,
                borderBottomColor: '#dde3e9'
              }}
              onPress={onOpenCityModal}
            >
              <Text style={{
                fontSize: 17,
                opacity: 0.6,
              }}>
                {(selectedCity && cities) ? (cities.find((el) => el.id === selectedCity).name) : t('selectCity')}
              </Text>
              <Icon
                style={{
                  fontSize: 15,
                  color: theme.appBar
                }}
                name="down"
                type="AntDesign"
              />
            </TouchableOpacity>
            <Carousel
              handleEventSelect={handleSliderSelect}
              data={slider_pages}
              style={styles.carousel}
            />
            <View style={styles.scrollViewElement}>
              <HorizontalList handleEventSelect={handleEventSelect} title={t('popular')} items={popular_events} />
            </View>
            <View style={styles.scrollViewElement}>
              <HorizontalList handleEventSelect={handleEventSelect} title={t('recommended')} items={recommended_events} />
            </View>
            <View style={styles.scrollViewElement}>
              <BoxOffice
                handleEventSelect={handleEventSelect}
                items={top_grosses}
                period={`${from} - ${to}`}
                // period={`${new Date(grosses_from * 1000).toLocaleString()} - ${new Date(grosses_to * 1000).toLocaleString()}`}
              />
            </View>
            {categories.map(el => (el.events) ? (
              <View key={el.category_key} style={styles.scrollViewElement}>
                <HorizontalList
                  handleCategorySelect={() => handleCategorySelect(el.category_key)}
                  handleEventSelect={handleEventSelect}
                  moreEnabled
                  title={el.category_name}
                  items={el.events}
                />
              </View>
            ) : null)}
            <View style={styles.scrollViewElement}>
              <TicketonLive handleTicketonLiveMore={handleTicketonLiveMore} title={t('ticketonLive')} items={ticketon_live} />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default withTheme(HomeView);
