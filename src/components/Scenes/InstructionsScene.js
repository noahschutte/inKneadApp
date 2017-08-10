import React, { Component } from 'react';
import { Clipboard, Linking, View } from 'react-native';
import PlatformText from '../PlatformText';
import Button from '../Button2';

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
    subScene: () => this.step1(),
  };

  onPress = () => {
    this._setClipboardContent();
    this.setState({ subScene: this.step2 });
  };

  step1 = () => {
    return (
      <View style={styles.pageWrapper}>
        <PlatformText type='bold' textStyle={styles.stepTextStyle}>Step 1:</PlatformText>
        <PlatformText type='demi-bold' textStyle={styles.stepTextStyle}>Tap the email below to copy</PlatformText>
        <PlatformText type='bold' textStyle={[styles.stepTextStyle, styles.email]} onPress={this.onPress}>
          {this.props.recipientEmail}
        </PlatformText>
      </View>
    );
  }

  step2 = () => {
    return (
      <View style={styles.pageWrapper}>
        <PlatformText type='bold' textStyle={styles.stepTextStyle}>Step 2:</PlatformText>
        <PlatformText type='demi-bold' textStyle={styles.stepTextStyle}>
          Follow the link below and paste the email where it says "recipient email"
        </PlatformText>

        <Button
          onPress={() => this.handleVendorSite(vendors[this.props.entry.vendor])}
          touchableOpacity
          buttonStyle={{ backgroundColor: '#ce0000', marginVertical: 25 }}
          textStyle={styles.hyperlink}
        >
          {this.props.entry.vendor}
        </Button>
        <PlatformText type='demi-bold' textStyle={{ fontSize: 24, color: '#000', textAlign: 'center' }}>
          And wait for them to receive your awesome gift!
        </PlatformText>
      </View>
    );
  }

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
    return (
      <View style={{ flex: 1 }}>
          {this.state.subScene()}
      </View>
    );
  }
}

const styles = {
  pageWrapper: {
    flex: 1,
    paddingVertical: 40,
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  stepTextStyle: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 15,
    textDecorationLine: 'none',
    color: 'black',
  },
  email: {
    fontSize: 24,
    color: '#ce0000',
  },
  hyperlink: {
    color: 'white',
    fontSize: 24,
  }
};

export default InstructionsScene;
