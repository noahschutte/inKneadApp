import React, { Component } from 'react';
import { View, Text, TextInput, Platform, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { updateEmail } from '../../actions';
import DetailSection from '../DetailSection';
import Button from '../Button2';

class EmailVerifyScene extends Component {

  state = {
    newEmailText: '',
    validEmail: false,
  };

  onPress = () => {
    const { userID, redirect } = this.props;
    if (this.state.newEmailText === '' || this.state.newEmailText < 'A') {
      alert('Please enter a valid email address');
    } else {
      this.props.updateEmail(this.state.newEmailText, userID, redirect);
    }
  }

  updateEmailText = (newEmailText) => {
    this.setState({ newEmailText });
    /* eslint no-useless-escape: off */
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({ validEmail: emailRegex.test(newEmailText) });
  }

  render() {
    const currentEmail = this.props.currentEmail || this.props.signupEmail;
    let textInput = (
      <TextInput
        autoFocus
        onChangeText={this.updateEmailText}
        maxLength={254}
        autoCorrect={false}
        keyboardType='email-address'
        autoCapitalize='none'
        value={this.state.newEmailText}
        style={Platform.OS === 'android' ? styles.androidTextInput : styles.iOSTextInput}
      />
    );
    let iOSContainer;
    if (Platform.OS !== 'android') {
      textInput = (
        <View style={styles.iOSTextInputWrapper}>
          {textInput}
        </View>
      );
      iOSContainer = {
        marginBottom: Dimensions.get('window').height / 3,
      };
    }
    return (
      <View style={[{ flex: 1 }, iOSContainer]}>

        <DetailSection style={{ flex: 3, marginTop: 15 }} bannerText='Current Email'>
          <Text>{currentEmail}</Text>
        </DetailSection>

        <View style={{ flex: 4 }}>
          <DetailSection style={{ flex: 5 }} bannerText='New Email'>
            {textInput}
          </DetailSection>
          <DetailSection
            style={styles.buttonSectionStyle}
            contentStyle={{ justifyContent: 'space-around' }}
          >
            <Button
              touchableOpacity
              onPress={Actions.pop}
              buttonType={'cancel'}
            >
              <Text style={[styles.buttonStyle]}>Cancel</Text>
            </Button>
            <Button
              touchableOpacity
              onPress={this.state.validEmail ? this.onPress : () => alert('Please enter a valid email')}
              buttonStyle={this.state.validEmail ? styles.submitStyle : styles.inactiveStyle}
            >
              <Text style={styles.buttonStyle}>Update</Text>
            </Button>
          </DetailSection>
        </View>

      </View>
    );
  }
}

const styles = {
  sectionStyle: {
    marginTop: 15,
  },
  androidTextInput: {
    flex: 1,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  iOSTextInput: {
    flex: 1,
    width: 300,
    textAlign: 'center',
  },
  iOSTextInputWrapper: {
    height: 25,
    borderBottomWidth: 1,
  },
  buttonSectionStyle: {
    flex: 4,
  },
  buttonStyle: {
    fontWeight: 'bold',
    color: 'white',
    margin: 10,
  },
  submitStyle: {
    backgroundColor: '#ce0000'
  },
  inactiveStyle: {
    backgroundColor: '#cecece',
    borderColor: '#cecece',
  }
};

const mapStateToProps = ({ user }) => {
  const { currentEmail, signupEmail, userVerified, userID } = user;
  return { currentEmail, signupEmail, userVerified, userID };
};

export default connect(mapStateToProps, { updateEmail })(EmailVerifyScene);
