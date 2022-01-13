import React from 'react';
import { Toolbar } from 'react-native-material-ui';
import { SafeAreaView } from 'react-native';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import { Keyboard } from 'react-native';
import withTheme from '../../hoc/withTheme';
import { withTranslation } from 'react-i18next';

class SearchHeader extends React.Component {
  state = {
    query: '',
    isActive: false,
    tintColor: 'white'
  };

  constructor(props) {
    super(props);
    Keyboard.addListener('keyboardDidHide', ()=>this.setState({isActive: false, tintColor: 'white'}));
    Keyboard.addListener('keyboardDidShow', () => this.setState({tintColor: 'black'}))
  }

  handleSubmit = () => {
    const { query } = this.state;
    const { navigation } = this.props;

    if (query !== '') {
      navigation.navigate('Search', { query });
    }
  };

  render() {
    const {
      theme,
      title,
      navigation,
      t,
      calendarEnabled = false,
      onCalendarPressed,
    } = this.props;

    const { tintColor } = this.state;

    return (
      <SafeAreaView style={{ backgroundColor: theme.appBar }}>
        <Toolbar
          style={{
            container: {
              backgroundColor: theme.appBar,
              height: 45
            },
            leftElement: {
              color: tintColor
            },
            rightElement: {
              color: theme.appBarFont
            },
            titleText: {
              color: tintColor,
            }
          }}
          leftElement="menu"
          onLeftElementPress={() => navigation.openDrawer()}
          centerElement={title}
          isSearchActive={this.state.isActive}
          searchable={{
            autoFocus: true,
            placeholder: t('search'),
            onSubmitEditing: () => {
              this.handleSubmit();
            },
            onChangeText: (text) => this.setState({
              query: text
            }),
            onSearchPressed: (query) => {this.setState({
              isActive: true
            })}
          }}
          rightElement={(calendarEnabled) ? "today" : null}
          onRightElementPress={calendarEnabled ? () => onCalendarPressed() : null}
        />
      </SafeAreaView>
    )
  }
}

SearchHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onCalendarPressed: PropTypes.func
};

export default compose(withTheme, withTranslation(), withNavigation)(SearchHeader);
