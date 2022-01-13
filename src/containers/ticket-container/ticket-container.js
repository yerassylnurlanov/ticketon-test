import React from 'react';
import { TouchableOpacity, View, Text, Linking } from 'react-native';
import { Icon } from 'native-base';
import { compose, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import TicketView from './ticket-view';
import withTheme from '../../hoc/withTheme';
import Axios from 'axios';

class TicketContainer extends React.Component {

  componentDidMount() {
    const { navigation, theme } = this.props;
    navigation.setParams({
      headerRight: (
        <View style={{ flexDirection: 'row' }}>
          {/*<TouchableOpacity*/}
          {/*  style={{ padding: 4 }}*/}
          {/*  onPress={this.handleQRPressed}*/}
          {/*>*/}
          {/*  <Icon*/}
          {/*    style={{ color: theme.headerBarTint }}*/}
          {/*    name="qrcode"*/}
          {/*    type="AntDesign"*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity*/}
          {/*  style={{ padding: 4 }}*/}
          {/*  onPress={this.handlePDFPressed}*/}
          {/*>*/}
          {/*  <Icon*/}
          {/*    style={{ color: theme.headerBarTint }}*/}
          {/*    name="pdffile1"*/}
          {/*    type="AntDesign"*/}
          {/*  />*/}
          {/*</TouchableOpacity>*/}
        </View>
      )
    });
  }

  handleQRPressed = () => {

  };

  handlePDFPressed = () => {
    const { order, authData } = this.props;
    if (authData) {
      Axios.get(`https://api.ticketon.kz/download_tickets?sale=${order.sale}&version=0.2.0`,
        {
          headers: {
            Authorization: `Bearer ${authData.token}`
          }
        }
      )
        .then(res => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          Linking.openURL(url);

        })
        .catch((err) => console.error('An error occurred', err));
    }
  };

  render() {
    const { order } = this.props;
    return (
      <TicketView order={order}/>
    );
  }
}

const mapStateToProps = state => ({
  authData: state.auth.authData
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default compose(
  withNavigation,
  withTheme,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(TicketContainer);
