import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput, TouchableWithoutFeedback
} from 'react-native';
import moment from 'moment';
import Modal from "react-native-modal";
import PropTypes from 'prop-types';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import { Calendar, LocaleConfig  } from 'react-native-calendars';
import { withTranslation } from 'react-i18next';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    margin: 0,
    padding: 0,
    backgroundColor: 'blue'
  },
  container: {
    position: 'absolute',
    margin: 0,
    padding: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 100,
    backgroundColor: 'white'
  },
  buttonsContainer: {
    paddingHorizontal: 24,
    paddingVertical: 4,
    justifyContent: 'center',
    width: '100%',
    height: 50,
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedButton: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'black',
    opacity: 0.6
  },
  selectedButtonText: {
    color: '#ffffff'
  },
  findButton: {
    backgroundColor: theme.appBar,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: -25,
    left: 50,
    right: 50,
    height: 50,
    color: 'white'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    color: 'black',
    textAlign: 'center',
    borderColor: 'rgba(0,0,0,0.1)'
  }
});

class CalendarModal extends Component {
  state = {
    isChoosing: false,
    currentDate: new Date(),
    isFirstDateSelected: false,
    isSecondDateSelected: false,
    firstDate: '',
    secondDate: '',
    thisWeek: false,
    thisWeekend: false,
    nextWeek: false,
    isFirstDate: true,
    selectedDates: {}
  };

  componentDidMount() {
    LocaleConfig.locales['ru'] = {
      monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июнь','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
      monthNamesShort: ['Янв.','Фев.','Март','Апр.','Май','Июнь','Июль','Авг.','Сен.','Окт.','Ноя.','Дек.'],
      dayNames: ['Воскресенье', 'Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'],
      dayNamesShort: ['Вс.','Пн.','Вт.','Ср.','Чт.','Пт.','Сб.'],
      today: 'Aujourd\'hui'
    };

    LocaleConfig.defaultLocale = 'ru';
  }

  getWeek = (date) => {
    const curr = date;
    const first = curr.getDate() - curr.getDay()+1;
    const last = first + 6;
    const firstDay = new Date(curr.setDate(first));
    const lastDay = new Date(curr.setDate(last));

    return {
      firstDay,
      lastDay
    }
  };

  getDaysInPeriod = (firstDay, lastDay) => {
    let currentDate = moment(firstDay);
    let stopDate = moment(lastDay);

    if (currentDate.isSameOrAfter(stopDate)) {
      const buf = currentDate;
      currentDate = stopDate;
      stopDate = buf;
    }
    const dateArray = [];

    while (currentDate <= stopDate) {
      dateArray.push( moment(currentDate).format('YYYY-MM-DD'));
      currentDate = moment(currentDate).add(1, 'days');
    }

    return dateArray;
  };

  formatDate = (dateArray) => {
    const { theme } = this.props;
    const color = theme.appBar;
    const dates = dateArray.reduce((c, v, i, arr) => {
      if (arr.length === 1) {
        return Object.assign(c, {[v]: {selected: true, startingDay: true, endingDay: true, marked: true, color: color}});
      }

      if (i === 0) {
        return Object.assign(c, {[v]: {selected: true, startingDay: true, marked: true, color: color}});
      }
      if (i === arr.length - 1) {
        return Object.assign(c, {[v]: {selected: true, endingDay: true, marked: true, color: color}});
      }

      return Object.assign(c, {[v]: {selected: true, marked: true, color: color}});
    }, {});

    return dates;
  };

  selectThisWeek = () => {
    const { firstDay, lastDay } = this.getWeek(new Date());
    const dateArray = this.getDaysInPeriod(firstDay, lastDay);

    const dates = this.formatDate(dateArray);

    this.setState({
      currentDate: firstDay,
      thisWeek: true,
      thisWeekend: false,
      nextWeek: false,
      selectedDates: dates
    });
  };

  selectNextWeek = () => {
    const curr = new Date();
    const { firstDay, lastDay } = this.getWeek(new Date(curr.getTime() + 7 * 24 * 60 * 60 * 1000));
    const dateArray = this.getDaysInPeriod(firstDay, lastDay);

    const dates = this.formatDate(dateArray);

    this.setState({
      currentDate: firstDay,
      thisWeek: false,
      thisWeekend: false,
      nextWeek: true,
      selectedDates: dates
    });
  };

  selectThisWeekend = () => {
    const { firstDay, lastDay } = this.getWeek(new Date());
    const dateArray = this.getDaysInPeriod(firstDay, lastDay);
    const dates = this.formatDate(dateArray.slice(5,7));
    this.setState({
      currentDate: firstDay,
      thisWeek: false,
      thisWeekend: true,
      nextWeek: false,
      selectedDates: dates
    });
  };

  selectDay = (day) => {
    const {
      isFirstDateSelected,
      isSecondDateSelected,
      firstDate,
      nextWeek,
      secondDate,
      isChoosing
    } = this.state;
    let dateArray = [];
    const { dateString } = day;
    // if (nextWeek) {
    //   this.setState({
    //     currentDate: day
    //   })
    // }

    if (!isFirstDateSelected || (isFirstDateSelected && isSecondDateSelected)) {
      dateArray = [dateString];
      this.setState({
        currentDate: dateString,
        isFirstDateSelected: true,
        isSecondDateSelected: false,
        firstDate: dateString
      });
    }

    if (isFirstDateSelected && !isSecondDateSelected) {
      dateArray = this.getDaysInPeriod(firstDate, dateString);
      this.setState({
        currentDate: dateString,
        isSecondDateSelected: true,
        secondDate: dateString
      })
    }

    const dates = this.formatDate(dateArray);
    this.setState({
      thisWeek: false,
      thisWeekend: false,
      nextWeek: false,
      selectedDates: dates
    });
  };

  render() {
    const {
      isCalendarVisible,
      onSubmitCalendar,
      onCloseCalendar,
      theme,
      t
    } = this.props;

    const {
      nextWeek,
      currentDate,
      thisWeek,
      thisWeekend,
      selectedDates
    } = this.state;

    const styles = getStyles(theme);

    const dates = Object.keys(selectedDates);
    const firstDate = dates[0];
    const secondDate = dates[dates.length - 1];



    return (
      <Modal
        animationIn={'slideInDown'}
        hasBackdrop={true}
        coverScreen={false}
        style={{ flex: 1, padding: 0, margin: 0 }}
        isVisible={isCalendarVisible}
        swipeDirection={'up'}
        swipeThreshhold={50}
        onSwipeComplete={onCloseCalendar}
      >
        {/*<TouchableWithoutFeedback style={{flex: 1}} onPress={onCloseCalendar}>*/}
          <View style={styles.container}>
            <Calendar
              current={currentDate}
              markedDates={selectedDates}
              markingType={'period'}
              onDayPress={this.selectDay}
              // Handler which gets executed on day long press. Default = undefined
              onDayLongPress={(day) => {console.log('selected day', day)}}
              // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
              monthFormat={'MMMM'}
              // Handler which gets executed when visible month changes in calendar. Default = undefined
              onMonthChange={(month) => {console.log('month changed', month)}}
              // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
              firstDay={1}
              // Show week numbers to the left. Default = false
              showWeekNumbers={true}
              // Handler which gets executed when press arrow icon left. It receive a callback can go back month
              onPressArrowLeft={substractMonth => substractMonth()}
              // Handler which gets executed when press arrow icon right. It receive a callback can go next month
              onPressArrowRight={addMonth => addMonth()}
            />
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={(thisWeek) ? styles.selectedButton : styles.button}
                onPress={this.selectThisWeek}
              >
                <Text
                  style={(thisWeek) ? styles.selectedButtonText : styles.buttonText}
                >
                  {t('thisWeek')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={(thisWeekend) ? styles.selectedButton : styles.button}
                onPress={this.selectThisWeekend}
              >
                <Text
                  style={(thisWeekend) ? styles.selectedButtonText : styles.buttonText}
                >
                  {t('thisWeekend')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={this.selectNextWeek}
                style={(nextWeek) ? styles.selectedButton : styles.button}
              >
                <Text
                  style={(nextWeek) ? styles.selectedButtonText : styles.buttonText}
                >
                  {t('nextWeek')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonsContainer}>
              <TextInput
                editable={false}
                style={styles.input}
                value={firstDate}
              />
              <Text style={{ alignSelf: 'center' }}>-</Text>
              <TextInput
                editable={false}
                style={styles.input}
                value={secondDate}
              />
            </View>
            <TouchableOpacity
              style={styles.findButton}
              onPress={() => onSubmitCalendar(firstDate, secondDate)}
            >
              <Text style={{color: 'white', fontWeight: '600', fontSize: 17}}>{t('findTickets')}</Text>
            </TouchableOpacity>
          </View>
        {/*</TouchableWithoutFeedback>*/}
      </Modal>
    );
  }
}

CalendarModal.propTypes = {
  isCalendarVisible: PropTypes.bool.isRequired
};

export default compose(
  withTheme,
  withTranslation()
)(CalendarModal);
