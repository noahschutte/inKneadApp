import React, { Component } from 'react';
import { View } from 'react-native';
import {
  AccessToken,
  LoginButton,
  GraphRequest,
  GraphRequestManager
} from 'react-native-fbsdk';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { createSession, redirectTo, userLogout } from '../actions';

class ReduxLogin extends Component {
  handleLogoutFinished = (error, result) => {
    if (error) {
      alert(`Logout failed with error: ${result.error}`);
    } else {
      this.props.userLogout();
    }
  }
  handleLoginFinished = (error, result) => {
    if (error) {
      alert(`Login failed with error ${error}`);
    } else if (result.isCancelled) {
      alert('Login was cancelled');
    } else {
      AccessToken.getCurrentAccessToken().then(
        data => {
          if (data) {
            const accessToken = data.accessToken;
            const responseInfoCallback = (err, res) => {
              if (err) {
                alert(`Error fetching data: ${err.toString()}`);
              } else {
                this.props.createSession(res, this.props.redirect);
              }
            };
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              responseInfoCallback
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          } else {
            alert('reached');
            Actions.root({ type: 'reset' });
          }
        }
      );
    }
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <LoginButton
          readPermissions={['email', 'public_profile']}
          onLogoutFinished={this.handleLogoutFinished}
          onLoginFinished={this.handleLoginFinished}
        />
      </View>
    );
  }
}

export default connect(null, { createSession, redirectTo, userLogout })(ReduxLogin);
