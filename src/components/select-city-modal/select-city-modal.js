import React, { Component } from 'react';
import {
  FlatList,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import Modal from "react-native-modal";

import { Icon } from "native-base";
import { bindActionCreators, compose } from 'redux';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';
import { selectCityAndSave } from '../../store/actions/city-actions';
import { getEventsByCategory } from '../../store/actions/events-actions';
import { getCategoriesAndPlaces } from '../../store/actions/places-actions';
import { getHomepage as getHomepageAction } from '../../store/actions/home-actions';
import { connect } from 'react-redux';


const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(250, 250, 250, 0.7)'
  },
  container: {
    padding: 24,
    backgroundColor: 'white',
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0
  },
  closeBtn: {
    position: 'absolute',
    top: -10,
    right: 25,
    backgroundColor: theme.appBar,
    width: 30,
    height: 30,
  },
  closeBtnText: {
    flex: 1,
    color: 'white',
    textAlign: 'center'
  },
  header: {
    // flex: 1,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 23,
    letterSpacing: 0.1,
    width: '75%'
  },
  description: {
    paddingTop: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 17,
    opacity: 0.6,
    letterSpacing: 0.1,
    width: '75%'
  },
  inputContainer: {
    // backgroundColor: 'red'
  },
  inputUnselected: {
    width: '100%',
    borderBottomWidth: (Platform.OS === 'ios') ? 2 : 0,
    borderBottomColor: 'grey',
    paddingBottom: 6,
    marginBottom: 12,
    color: 'black',
    // borderBottomColor:
    fontSize: 18,
  },
  inputSelected: {
    width: '100%',
    borderBottomWidth: (Platform.OS === 'ios') ? 2 : 0,
    borderBottomColor: 'orange',
    paddingBottom: 6,
    marginBottom: 12,
    color: 'black',
    // borderBottomColor:
    fontSize: 18,
  },
  subscribeButton: {
    backgroundColor: theme.appBar,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  subscribeButtonText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.02,
    color: 'white',
  },
  checkbox: {
  },
  checkboxLabel: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 13,
    lineHeight: 17,
    opacity: 0.6,
    letterSpacing: 0.1,
  }
});

class SelectCityModal extends Component {
  state={
    query: ''
  };

  changeQuery = (query) => {
    this.setState({
      query
    });
  };

  selectCity = (id) => {
    const { getHomepage, selectCity, refreshPlaces, language, selectedCategory, refreshEvents, onCloseCityModal } = this.props;
    onCloseCityModal();
    selectCity(id);
    getHomepage(language, id);
    refreshEvents(selectedCategory, language, id, 1, 100);
    refreshPlaces(id, language);
  };

  render() {
    const {
      isVisible,
      cities,
      theme,
      onCloseCityModal,
      t,
    } = this.props;
    const {
      query
    } = this.state;

    const styles = getStyles(theme);
    const filteredCities = cities.filter(city => city.name.toLowerCase().includes(query.toLowerCase()));

    return (
      <Modal
        style={{
          margin: 0,
          padding: 0,
        }}
        animationIn="slideInDown"
        transparent={true}
        hasBackdrop={true}
        visible={isVisible}
      >
        <View style={styles.root}>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={onCloseCityModal}
              style={styles.closeBtn}
            >
              <Icon
                name="close"
                style={styles.closeBtnText}
              />
            </TouchableHighlight>
            <TextInput
              style={styles.inputUnselected}
              value={query}
              onChangeText={this.changeQuery}
              placeholder={t('selectCity')}
            />
            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item.key}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    style={{ marginVertical: 14}}
                    onPress={() => this.selectCity(item.id)}
                  >
                    <Text style={{ fontSize: 17 }}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  cities: state.city.cities,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  selectCity: selectCityAndSave,
  refreshEvents: getEventsByCategory,
  refreshPlaces: getCategoriesAndPlaces,
  getHomepage: getHomepageAction
}, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps), withTheme, withTranslation())(SelectCityModal);
