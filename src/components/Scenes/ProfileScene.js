import React, { Component } from 'react';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { facebookImage } from '../../assets';
import DetailSection from '../DetailSection';
import ProfileDetailButton from '../ProfileDetailButton';
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
        {/* <DetailSection bannerText='Email Address'>
          <ProfileDetailButton onPress={Actions.EmailVerifyScene}>
            {email}
          </ProfileDetailButton>
        </DetailSection>

        <DetailSection bannerText='Linked Accounts'>
          <ProfileDetailButton
            onPress={Actions.LoginScene.bind(this, { logOut: true })}
            marginImage={facebookImage}
          >
            {social}
          </ProfileDetailButton>
        </DetailSection> */}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

export default connect(mapStateToProps, {})(ProfileScene);
