import React, { Component } from 'react';
import { Clipboard, Linking, TouchableOpacity, View, Text } from 'react-native';
import DetailSection from '../DetailSection';

const vendors = {
  'Pizza Hut': 'https://pizzahutstore.wgiftcard.com/chrome/pizzahut/',
  Dominos: 'https://dominosstore.wgiftcard.com/responsive/personalize_responsive/chooseDesign/dominos_responsive/1',
  'Papa Johns': 'https://papajohns-m.cashstar.com/buy/?ref=PJ1',
};

class InstructionsScene extends Component {

  state = {
    copied: false,
    content: '',
    errorMessage: '',
  };

  handleVendorSite = vendorURL => {
    Linking.openURL(vendorURL);
  }

  _setClipboardContent = async () => {
    this.setState({ copied: true });
    Clipboard.setString(this.props.recipientEmail);
    try {
      const content = await Clipboard.getString();
      this.setState({ content });
    } catch (e) {
      this.setState({ errorMessage: e.message });
    }
  };

  render() {
    const { stepOneStyle, email, stepTwoStyle, hyperlinkButton, hyperlink } = styles;
    let status;
    let statusText;
    let stepTwo;
    let completed;

    if (this.state.copied) {
      completed = {
        textDecorationLine: 'line-through',
        color: '#bcbcbc',
      };
      status = {
        paddingTop: 15,
        fontWeight: 'bold',
        color: 'green',
      };
      statusText = 'Copied!';
      stepTwo = (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text style={stepTwoStyle}>Step 2:</Text>
          <Text style={stepTwoStyle}>
            Great! Now paste that email address into the "recipient email" form on the following page and complete your donation!</Text>
          <TouchableOpacity
            onPress={() => this.handleVendorSite(vendors[this.props.entry.vendor])}
            style={hyperlinkButton}
          >
            <Text style={hyperlink}>
              {this.props.entry.vendor}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      statusText = 'Not Copied Yet';
      status = {
        paddingTop: 15,
        fontWeight: 'bold',
        color: 'red',
      };
    }
    return (
      <View style={{ flex: 1 }}>
        <DetailSection>
          <View style={{ alignItems: 'center' }}>
            <Text style={[stepOneStyle, completed]}>Step 1: Tap the email below to copy it</Text>
            <Text style={[stepOneStyle, email, completed]} onPress={this._setClipboardContent}>
              {this.props.recipientEmail}
            </Text>
            <Text style={status}>Status: {statusText}</Text>
          </View>
        </DetailSection>
        <DetailSection>
          {stepTwo}
        </DetailSection>
      </View>
    );
  }
}

const styles = {
  stepOneStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 15,
    textDecorationLine: 'none',
    color: 'black',
  },
  email: {
    fontSize: 20,
    color: 'black',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 4,
  },
  stepTwoStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  status: {
    paddingTop: 15,
    fontWeight: 'bold',
    color: 'green',
  },
  hyperlinkButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ce0000',
    marginBottom: 10,
    borderRadius: 2,
  },
  hyperlink: {
    color: 'white',
    fontWeight: 'bold',
  }
};

export default InstructionsScene;
