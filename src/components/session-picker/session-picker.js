import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  Picker
} from 'native-base';
import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import withTheme from '../../hoc/withTheme';

const getStyles = theme => StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'space-evenly'
  }
});

const SessionPicker = ({
  dates,
  types,
  onDateChange,
  onTypeChange,
  selectedDate,
  selectedType,
  theme,
  t
}) => {
  const styles = getStyles(theme);
  return (
    <View style={styles.root}>
      {/*<Picker*/}
      {/*  iosHeader={t('selectSessionDate')}*/}
      {/*  mode="dropdown"*/}
      {/*  style={{ width: 140 }}*/}
      {/*  placeholder={t('selectSessionDate')}*/}
      {/*  selectedValue={selectedDate}*/}
      {/*  onValueChange={onDateChange}*/}
      {/*>*/}
      {/*  {dates.map(el => (<Picker.Item key={el.value} label={el.label} value={el.value} />))}*/}
      {/*</Picker>*/}
      <Picker
        headerBackButtonText={t('back')}
        placeholderIconColor={theme.appBar}
        iosHeader={t('selectSessionType')}
        style={{ flex: 1 }}
        mode="dropdown"
        placeholder={t('selectSessionType')}
        selectedValue={selectedType}
        onValueChange={onTypeChange}
      >
        {types.map(el => (<Picker.Item key={el.value} label={el.label} value={el.value}  />))}
      </Picker>
    </View>
  );
};

SessionPicker.propTypes = {
  dates: PropTypes.array,
  types: PropTypes.array,
  onDateChange: PropTypes.func,
  onTypeChange: PropTypes.func,
  selectedDate: PropTypes.string,
  selectedType: PropTypes.string,
};

export default compose(withTheme, withTranslation())(SessionPicker);
