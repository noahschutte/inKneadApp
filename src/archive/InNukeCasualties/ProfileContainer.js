/*
* @providesModule ProfileContainer
*/

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Profile2 from 'Profile2';

export default class ProfileContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      verify: (this.props.user.current_email),
      updatedEmail: '',
      errorMessage: '',
    };
    // this.onCurrentEmailChange = this.onCurrentEmailChange.bind(this);
  }

  render() {
    return (
      <Profile2 profileImage={require('../../assets/mobile-icons/profileIcon.png')} verified={this.state.verify} user={this.props.user} navigator={this.props.navigator} />
    );
  }

  // Not Jameson's code

  verifyEmail() {
    this.setState({ verify: true });
    const userID = this.props.user.id;
    const updatedEmail = this.props.user.signup_email;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ updatedEmail })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.currentEmail) {
        this.props.onUserChange(responseJson.user);
        this.props.onCurrentEmailChange(responseJson.currentEmail);
        this.setState({ updatedEmail: '' });
        this.setState({ errorMessage: responseJson.errorMessage });
      } else {
        this.setState({ errorMessage: responseJson.errorMessage });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onUpdateEmailPress() {
    const userID = this.props.user.id;
    const { updatedEmail } = this.state;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ updatedEmail })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.currentEmail) {
        this.props.onUserChange(responseJson.user);
        this.props.onCurrentEmailChange(responseJson.currentEmail);
        this.setState({ updatedEmail: '' });
        this.setState({ errorMessage: responseJson.errorMessage });
      } else {
        this.setState({ errorMessage: responseJson.errorMessage });
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

}
