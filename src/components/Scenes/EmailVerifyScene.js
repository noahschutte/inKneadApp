import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateEmail } from '../../actions';
import DetailSection from '../DetailSection';
import Button from '../Button2';

class EmailVerifyScene extends Component {

  state = {
    newEmailText: '',
    update: false,
  };

  onPress = () => {
    const { currentEmail, signupEmail, userID, redirect } = this.props;
    if (this.state.newEmailText === '') {
      const newEmail = currentEmail || signupEmail;
      this.props.updateEmail(newEmail, userID, redirect);
    } else {
      this.props.updateEmail(this.state.newEmailText, userID, redirect);
    }
  }

  updateEmailText = (newEmailText) => {
    this.setState({ newEmailText });
  }

  render() {
    const currentEmail = this.props.currentEmail || this.props.signupEmail;
    let bottomHalf;
    if (this.props.userVerified || this.state.update) {
      bottomHalf = (
        <View style={{ flex: 4 }}>
          <DetailSection style={{ flex: 5, flexDirection: 'column' }} bannerText='New Email'>
            <View style={{ height: 25, borderColor: 'black', borderWidth: 0.5 }}>
              <TextInput
                onChangeText={this.updateEmailText}
                maxLength={254}
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={this.state.newEmailText}
                style={{ flex: 1, width: 150, textAlign: 'center' }}
              />
            </View>
          </DetailSection>
          <DetailSection
            style={styles.buttonSectionStyle}
            contentStyle={{ justifyContent: 'space-around' }}
          >
            <Button
              touchableOpacity
              onPress={Actions.pop}
              buttonStyle={{ backgroundColor: '#bebebe', borderColor: '#bebebe' }}
            >
              <Text style={[styles.buttonStyle]}>Cancel</Text>
            </Button>
            <Button
              touchableOpacity
              onPress={this.onPress}
              buttonStyle={{ backgroundColor: '#ce0000' }}
            >
              <Text style={styles.buttonStyle}>Update</Text>
            </Button>
          </DetailSection>
        </View>
      );
    } else {
      bottomHalf = (
        <DetailSection
          style={styles.buttonSectionStyle}
          contentStyle={{ justifyContent: 'space-around' }}
        >
          <Button
            touchableOpacity
            onPress={this.onPress}
            buttonStyle={{ backgroundColor: '#ce0000' }}
          >
            <Text style={styles.buttonStyle}>Verify</Text>
          </Button>
          <Button
            touchableOpacity
            onPress={() => this.setState({ update: true })}
            buttonStyle={{ backgroundColor: '#ce0000' }}
          >
            <Text style={styles.buttonStyle}>Update</Text>
          </Button>
        </DetailSection>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <DetailSection style={{ flex: 3, marginTop: 15 }} bannerText='Current Email'>
          <Text>{currentEmail}</Text>
        </DetailSection>
        {bottomHalf}
      </View>
    );
  }
}

const styles = {
  sectionStyle: {
    marginTop: 15,
  },
  buttonSectionStyle: {
    flex: 4,
  },
  buttonStyle: {
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  }
};

const mapStateToProps = ({ user }) => {
  const { currentEmail, signupEmail, userVerified, userID } = user;
  return { currentEmail, signupEmail, userVerified, userID };
};

export default connect(mapStateToProps, { updateEmail })(EmailVerifyScene);
