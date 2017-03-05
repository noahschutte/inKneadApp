import React, { Component } from 'react';
import { Clipboard, Linking, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';

const vendors = {
  'Pizza Hut': 'https://pizzahutstore.wgiftcard.com/chrome/pizzahut/',
  Dominos: 'https://dominosstore.wgiftcard.com/responsive/personalize_responsive/chooseDesign/dominos_responsive/1',
  'Papa Johns': 'https://papajohns-m.cashstar.com/buy/?ref=PJ1',
};

export default class Instructions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      vendor: this.props.activeDonation.vendor,
      copied: false,
      content: '',
      errorMessage: '',
    };
  }

  handleVendorSite = (vendorURL) => {
    Linking.openURL(vendorURL);
  }

  _setClipboardContent = async () => {
    this.setState({ copied: true });
    Clipboard.setString(this.props.anonEmail);
    try {
      const content = await Clipboard.getString();
      this.setState({ content });
    } catch (e) {
      this.setState({ content: e.message });
    }
  };

  stepTwo() {
    if (this.state.copied) {
      return (
        <View>
        <Text style={styles.instructions}>
          Step 2:
        </Text>
        <Text>
          Great! Now paste that email address into the "recipient email" form on the following page and complete your donation!
        </Text>
        <TouchableOpacity
          onPress={this.handleVendorSite.bind(this, vendors[this.state.vendor])}
          style={styles.hyperlinkButton}
        >
          <Text style={styles.hyperlink}>
            {this.state.vendor}
          </Text>
        </TouchableOpacity>
        </View>
      );
    }
  }

  render() {
    let status;
    if (this.state.copied) {
      status = 'Email copied to clipboard!';
    } else {
      status = 'You have not copied the email.';
    }

    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />

        <View style={styles.wrapper}>
          <Text style={styles.header}>
            Donation Instructions Page
          </Text>
          <Text style={styles.instructions}>
            Step 1: Tap the email below to copy it
          </Text>
          <Text onPress={this._setClipboardContent}>
            {this.props.anonEmail}
          </Text>
          <Text style={styles.instructions}>
            Status:
          </Text>
          <Text>
            {status}
          </Text>
          {this.stepTwo()}
          <Text>
            {this.state.errorMessage}
          </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginHorizontal: 30,
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 15,
    textAlign: 'center',
  },
  hyperlinkButton: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  hyperlink: {
    color: 'white',
    fontWeight: 'bold',
  },
});
