import React from 'react';
import ErrorBoundary from './src/components/error-boundary';
import { Provider } from 'react-redux';
import store from './src/store';
import { StatusBar, AppState } from 'react-native';
import { ThemeContext, themes } from './src/components/theme-context';
import { PushContext } from './src/utils/push-context';
import ErrorComponent from './src/components/error-component';
import OfflineNotice from './src/components/offline-notice/offline-notice';
import { Navigation } from './src/navigators';
import 'react-native-gesture-handler';


class App extends React.Component {
  state = {
    theme: themes.light,
    isConnected: true,
    isPush: false,
    currentState: AppState.currentState,
    authorized: false,
  };

  toggleTheme = () => {
    this.setState(state => ({
      theme:
        state.theme === themes.dark
          ? themes.light
          : themes.dark,
    }));
  };

  togglePush = () => {
    this.setState({
      isPush: false
    });
  }

  getActiveRouteName = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return this.getActiveRouteName(route);
    }
    return route.routeName;
  };
  

  render (){
    const { theme, isConnected, isPush } = this.state;
    const { t } = this.props;

    if (!isConnected) {
      return <ErrorComponent errorText={'connectToInternet'} />
    }
   
    return(
      <ErrorBoundary>
        <Provider store={store}>
        {/* <ThemeContext.Provider
              value={{ theme, toggleTheme: this.toggleTheme }}
            > */}
              <PushContext.Provider
                value={{ isPush, togglePush: this.togglePush }}
              >
                <StatusBar
                    backgroundColor={theme.headerBarBackground}
                    barStyle="light-content"
                  />
                  <OfflineNotice />
                 <Navigation/>
                  
              </PushContext.Provider>
        {/* </ThemeContext.Provider> */}
        </Provider>
      </ErrorBoundary>
     
    )
    }
}



export default App;
