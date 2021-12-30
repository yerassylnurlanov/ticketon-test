import React from 'react';
import {
  View,
  Text
} from 'react-native';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null
  };
  constructor(props) {
    super(props);
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error: error
    };
  }

  // componentDidCatch(error, info) {
  //   // Можно также сохранить информацию об ошибке в соответствующую службу журнала ошибок
  //   firebase.crashlytics().log(error);
  //   firebase.crashlytics().recordError(1, info);
  // }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontWeight: '600', fontSize: 25 }}>{(this.state.error)}</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
