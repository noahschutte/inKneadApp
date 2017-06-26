import React, { Component } from 'react';
import { Clipboard, Linking, TouchableOpacity, View, Text } from 'react-native';
import { IndicatorViewPager } from 'rn-viewpager';
import { Actions } from 'react-native-router-flux';
import PlatformText from '../PlatformText';
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
    let stepTwo;
    let completed;

    if (this.state.copied) {
      completed = {
        textDecorationLine: 'line-through',
        color: '#bcbcbc',
      };
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
    }
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
        <IndicatorViewPager style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <DetailSection style={{ marginTop: 40 }}>
              <View style={{ alignItems: 'center', marginHorizontal: 25 }}>
                <PlatformText type='bold' textStyle={stepOneStyle}>Step 1:</PlatformText>
                <PlatformText type='demi-bold' textStyle={[stepOneStyle, completed]}>Tap the email below to copy</PlatformText>
                <PlatformText type='bold' textStyle={[stepOneStyle, email, completed]} onPress={onPress}>
                  {this.props.recipientEmail}
                </PlatformText>
              </View>
            </DetailSection>
            <DetailSection>
              {stepTwo}
            </DetailSection>
          </View>
        </IndicatorViewPager>
      </View>
    );
  }
}

const styles = {
  stepOneStyle: {
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
