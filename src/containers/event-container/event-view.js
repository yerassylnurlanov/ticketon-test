import React from 'react';
import {
  Tab,
  Tabs
} from 'native-base';
import { withTranslation } from 'react-i18next';
import { compose } from 'redux';
import withTheme from '../../hoc/withTheme';

const EventView = ({
  sessions,
  reviews,
  description,
  theme,
  t,
}) => {

  return (
    <Tabs
      tabBarUnderlineStyle={{ backgroundColor: theme.fontMain }}
      initialPage={1}
    >
      <Tab
        heading={t('sessions')}
        textStyle={{color: theme.fontMain}}
        activeTextStyle={{color: theme.headerBarTint}}
        tabStyle={{backgroundColor: theme.appBar}}
        activeTabStyle={{backgroundColor: theme.appBar}}
      >
        {sessions}
      </Tab>
      <Tab
        heading={t('description')}
        textStyle={{color: theme.fontMain}}
        activeTextStyle={{color: theme.headerBarTint}}
        tabStyle={{backgroundColor: theme.appBar}}
        activeTabStyle={{backgroundColor: theme.appBar}}
      >
        {description}
      </Tab>
      <Tab
        heading={t('reviews')}
        textStyle={{color: theme.fontMain}}
        activeTextStyle={{color: theme.headerBarTint}}
        tabStyle={{backgroundColor: theme.appBar}}
        activeTabStyle={{backgroundColor: theme.appBar}}
      >
        {reviews}
      </Tab>
    </Tabs>
  );
};

export default compose(withTranslation(), withTheme)(EventView);
