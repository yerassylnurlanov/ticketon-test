import React from 'react';
import {
} from 'react-native';
import { compose } from 'redux';
import ProfileEditView from './profile-edit-view';
import { withNavigation } from 'react-navigation';
import AuthService from '../../services/auth-service';
import { connect } from 'react-redux';

class ProfileEditContainer extends React.Component {
  state = {
    gender: 'male',
    showBirthday: false,
    birthday: null,
    firstName: '',
    lastName: '',
    middleName: '',
    country: '',
    city: '',
    about: '',
    iin: '',
  };

  componentDidMount()  {
    const { profile } = this.props;
    this.setState({
      ...profile,
      iin: (profile.iin) ? profile.iin.toString() : ''
    });
  }

  dateToYMD(date) {
    const d = date.getDate();
    const m = date.getMonth() + 1; //Month from 0 to 11
    const y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  onBirthdayPressed = () => {
    this.setState({
      showBirthday: true
    });
  };

  onChangeBirthday = (event, selectedDate) => {
    const formattedDate = this.dateToYMD(selectedDate).split('-').reverse().join('-');
    this.setState({
      birthday: formattedDate,
      showBirthday: false
    });
  };

  onChangeGender = (gender) => {
    this.setState({
      gender
    });
  };

  onClickedEmailPressed = () => {
    const { navigation } = this.props;
    navigation.push('ChangePassword');
  };

  onChangeFirstName = (firstName) => {
    this.setState({
      firstName
    });
  };

  onChangeLastName = (lastName) => {
    this.setState({
      lastName
    });
  };

  onChangeMiddleName = (middleName) => {
    this.setState({
      middleName
    });
  };

  onChangeCountry = (country) => {
    this.setState({
      country
    });
  };

  onChangeCity = (city) => {
    this.setState({
      city
    });
  };

  onChangeIIN = (iin) => {
    this.setState({
      iin
    });
  };

  onChangeAbout = (about) => {
    this.setState({
      about
    });
  };

  handleSubmit = () => {
    const {
      lastName,
      middleName,
      firstName,
      country,
      about,
      city,
      gender,
      showBirthday,
      birthday,
      iin
    } = this.state;
    const {
      token,
      navigation
    } = this.props;

    AuthService.editProfile(
      firstName,
      lastName,
      middleName,
      country,
      city,
      about,
      gender,
      birthday,
      parseInt(iin),
      token
    )
    .then(res => {
      navigation.pop();
    })
    .catch(err => {
    });
  };

  render() {
    const {
      birthday,
      showBirthday,
      gender,
      about,
      city,
      country,
      firstName,
      lastName,
      middleName,
      iin
    } = this.state;


    const formattedBirthday =  (birthday) ? birthday.split('-').reverse().join('-') : '12-12-12';
    // const formattedBirthday = '';

    return (
      <ProfileEditView
        about={about}
        onChangeAbout={this.onChangeAbout}
        city={city}
        onChangeCity={this.onChangeCity}
        country={country}
        onChangeCountry={this.onChangeCountry}
        firstName={firstName}
        onChangeFirstName={this.onChangeFirstName}
        lastName={lastName}
        onChangeLastName={this.onChangeLastName}
        middleName={middleName}
        onChangeMiddleName={this.onChangeMiddleName}
        gender={gender}
        onChangeGender={this.onChangeGender}
        birthday={new Date(formattedBirthday)}
        showBirthday={showBirthday}
        onChangeBirthday={this.onChangeBirthday}
        onClickedEmailPressed={this.onClickedEmailPressed}
        handleSubmit={this.handleSubmit}
        onBirthdayPressed={this.onBirthdayPressed}
        iin={iin}
        onChangeIIN={this.onChangeIIN}
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.auth.authData.token,
  profile: state.auth.profile
});

export default compose(withNavigation, connect(mapStateToProps))(ProfileEditContainer);
