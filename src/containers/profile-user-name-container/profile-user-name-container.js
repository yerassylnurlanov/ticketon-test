import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators, compose} from 'redux';
import { withNavigation } from 'react-navigation';
import ProfileUseNameView from './profile-user-name-view';
import { setUserName } from '../../store/actions/profile-actions';

class ProfileUserNameContainer extends React.Component {

  state={
    firstName: this.props.firstName,
    lastName: this.props.lastName
  };

  handleSubmit = () => {
    const { navigation, setUserName } = this.props;
    const { firstName, lastName } = this.state;
    setUserName(firstName, lastName);
    navigation.goBack();
  };

  handleFirstNameChange = (value) => {
    this.setState({
      firstName: value
    });
  };

  handleLastNameChange = (value) => {
    this.setState({
      lastName: value
    });
  };

  render() {
    const { firstName, lastName } = this.state;
    return (
      <ProfileUseNameView
        firstName={firstName}
        handleFirstNameChange={this.handleFirstNameChange}
        handleLastNameChange={this.handleLastNameChange}
        lastName={lastName}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firstName: state.profile.userName.firstName,
    lastName: state.profile.userName.lastName
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUserName
  }, dispatch);
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withNavigation)(ProfileUserNameContainer);
