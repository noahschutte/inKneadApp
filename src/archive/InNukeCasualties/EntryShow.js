import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Video from './Video';
import Button from './Button';
import TimeAgo from 'TimeAgo';

export default class EntryShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      errorMessage: '',
    };
    this.entryShowToggle = this.entryShowToggle.bind(this);
  }
  entryShowToggle(toggle) {
    this.setState({ paused: toggle });
  }
  handleInstructions() {
    this.setState({ paused: true });
    this.props.navigator.push({ name: 'instructions' });
  }
  render() {
    const entry = this.props.entry;
    let activeDonation;

    if (this.props.activeDonation) {
      activeDonation =
      (<View style={styles.instructionsContainer}>
        <Button
          text="Complete your recent donation now."
          backgroundColor='green'
          onPress={this.handleInstructions.bind(this)}
        />
      </View>);
    }

    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />

        <View style={styles.wrapper}>

          <View style={styles.videoContainer}>
            <Video entryShow entryShowPaused={this.state.paused} entryShowToggle={this.entryShowToggle} {...this.props} />
          </View>

          <View style={styles.content}>

            <View style={styles.videoFooter}>
              <Text style={styles.dateTime}>
                <TimeAgo secondsOld={entry.seconds} />
              </Text>

              <View>
                <Text>
                  (3 Dots)
                </Text>
              </View>
            </View>

            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                REQUESTED
              </Text>
            </View>

            <View style={styles.pizzaPlaceholder}>
              <Text style={{ textAlign: 'center' }}>
                (Image Placeholder)
              </Text>
            </View>

            <View style={styles.banner}>
              <Text style={styles.bannerText}>
                VENDOR
              </Text>
            </View>

            <View style={styles.logoPlaceholder}>
              <Text style={{ textAlign: 'center' }}>
                (Image Placeholder)
              </Text>
            </View>

            <View style={styles.bottomHalf}>
              {activeDonation}
            </View>
          </View>
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
    backgroundColor: 'white',
  },
  videoContainer: {
    flex: 2,
  },
  content: {
    flex: 3,
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  history: {
    textDecorationLine: 'underline',
    fontWeight: 'bold'
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#424242',
    alignSelf: 'stretch',
    padding: 5
  },
  bannerText: {
    color: 'white',
  },
  bottomHalf: {
    padding: 20,
  },
  dateTime: {
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  donationButtonContainer: {
    alignItems: 'center',
    paddingTop: 10,
  },
  donateButton: {
    borderRadius: 25,
    width: 150,
    height: 75,
  },
  disabledDonateButton: {
    borderRadius: 25,
    width: 150,
    height: 75,
  },
  received: {
    position: 'absolute',
    zIndex: 1,
    width: 150,
    height: 150,
    left: 100,
  },
  instructionsContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessageContainer: {
    marginTop: 20,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    fontWeight: 'bold',
  },
  pizzaPlaceholder: {
    paddingTop: 5,
    paddingBottom: 5,
  },
  logoPlaceholder: {
    paddingTop: 5,
    paddingBottom: 5,
  },
});
