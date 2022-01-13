import React from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { setLanguage as setLanguageAction } from '../../store/actions/app-actions';
import ChooseLanguageView from './choose-language-view';

class ChooseLanguageContainer extends React.Component {
  handleValueChange = (itemValue, itemIndex) => {
    const { setLanguage } = this.props;
    setLanguage(itemValue);
  };

  onPressNext = () => {
    const { navigation } = this.props;
    navigation.navigate('Walkthrough');
  };

  onPressLanguageButton = (language) => {
    const { setLanguage } = this.props;
    setLanguage(language);
  };

  render() {
    const { language } = this.props;
    return (
      <ChooseLanguageView
        language={language}
        handleValueChange={this.handleValueChange}
        onPressLanguageButton={this.onPressLanguageButton}
        onPressNext={this.onPressNext}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { app } = state;
  return { language: app.language };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setLanguage: setLanguageAction
  }, dispatch);
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNavigation
)(ChooseLanguageContainer);
