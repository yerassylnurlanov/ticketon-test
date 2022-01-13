import React from 'react';
import HomeContainer from '../../containers/home-container';

import SearchHeader from '../../components/search-header';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps: { theme, t } }) => ({
    headerBackTitle: t('back'),
    headerTruncatedBackTitle: t('back'),
    header: <SearchHeader calendarEnabled title={t('home')} onCalendarPressed={navigation.getParam('onCalendarPressed')}/>,
    headerTintColor: theme.appBarFont,
    headerStyle: { marginTop: 24 }
  });

  render() {
    return (
      <HomeContainer />
    );
  }
}

export default HomeScreen;
