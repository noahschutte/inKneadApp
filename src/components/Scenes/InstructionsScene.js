import React, { Component } from 'react';
import { Clipboard, Linking, Text, View } from 'react-native';
import { IndicatorViewPager } from 'rn-viewpager';
import { Actions } from 'react-native-router-flux';
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
    const { stepTextStyle, email, hyperlinkButton, hyperlink } = styles;

    const onPress = () => {
      this._setClipboardContent();
      console.log('this.props', this.props);
      Actions.InstructionsScene({
        page: 1,
        entry: {
          vendor: 'Dominos',
          pizzas: 2,
        }
      });
    };
    return (
      <View style={{ flex: 1 }}>
        <IndicatorViewPager
          style={{ flex: 1 }}
          initialPage={this.props.page}
        >

          <View style={styles.pageWrapper}>
            <PlatformText type='bold' textStyle={stepTextStyle}>Step 1:</PlatformText>
            <PlatformText type='demi-bold' textStyle={stepTextStyle}>Tap the email below to copy</PlatformText>
            <PlatformText type='bold' textStyle={[stepTextStyle, email]} onPress={onPress}>
              {this.props.recipientEmail}
            </PlatformText>
          </View>

          <View style={styles.pageWrapper}>
            <PlatformText type='bold' textStyle={stepTextStyle}>Step 2:</PlatformText>
            <PlatformText type='demi-bold' textStyle={stepTextStyle}>
              Follow the link below and paste the email where it says "recipient email"
            </PlatformText>

            <Button
              onPress={() => this.handleVendorSite(vendors[this.props.entry.vendor])}
              touchableOpacity
              buttonStyle={{ backgroundColor: '#ce0000', marginVertical: 25 }}
              textStyle={hyperlink}
            >
              {this.props.entry.vendor}
            </Button>
            <PlatformText type='demi-bold' textStyle={{ fontSize: 24, color: '#000', textAlign: 'center' }}>
              And wait for them to receive your awesome gift!
            </PlatformText>
          </View>

        </IndicatorViewPager>
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
  hyperlinkButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#ce0000',
    marginBottom: 10,
    borderRadius: 5,
  },
  hyperlink: {
    color: 'white',
    fontSize: 24,
  }
};

export default InstructionsScene;
