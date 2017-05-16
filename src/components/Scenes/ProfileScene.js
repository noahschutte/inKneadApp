import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import AccountButton from '../AccountButton';

class ProfileScene extends Component {

  shouldComponentUpdate(nextProps) {
    if (!nextProps.user.userID) {
      return false;
    }
    return true;
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AccountButton onPress={Actions.EmailVerifyScene}>Edit Email</AccountButton>
        <AccountButton onPress={Actions.LoginScene}>Facebook</AccountButton>
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, {})(ProfileScene);
