import React, { Component } from 'react';
import { Alert, View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Video from './Video';
import Button from './Button';
import TimeAgo from 'TimeAgo';

export default class RequestShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true,
      errorMessage: '',
    };
    this.requestShowToggle = this.requestShowToggle.bind(this);
  }
  requestShowToggle(toggle) {
    this.setState({ paused: toggle });
  }
  onDonatePress(request) {
    if (this.props.user === null) {
      this.props.handleGuestDonation(true);
      this.props.navigator.push({ name: 'profile' });
    } else if (this.props.user.id === this.props.request.creator_id) {
      this.setState({ errorMessage: 'Really, you want to donate to yourself?' });
    } else if (this.props.activeDonation) {
      this.setState({ errorMessage: 'You have recently made a donation.' });
    } else {
      Alert.alert(
        `Are you sure you want to donate ${request.pizzas} pizza(s)?`,
        'You will have 30 minutes to send an online gift card. Failure to complete the donation could have you removed from the community.',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Donate',
            onPress: this.onConfirmPress.bind(this, request),
          }
        ]
      );
    }
  }
  onConfirmPress(request) {
    this.requestShowToggle(true);
    const userID = this.props.user.id;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${request.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ userID })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage) {
        this.setState({ errorMessage: responseJson.errorMessage });
      } else {
        this.setState({ errorMessage: ' ' });
        this.props.collectRequests(responseJson.requests);
        this.props.collectThankYous(responseJson.thankYous);
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
        this.props.collectActiveDonation(request);
        this.props.collectAnonEmail(responseJson.anonEmail);
        this.props.navigator.push({ name: 'instructions' });
        this.props.collectRequest(responseJson.request);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }
  handleInstructions() {
    this.setState({ paused: true });
    this.props.navigator.push({ name: 'instructions' });
  }
  showAnonHistory() {
    this.setState({ paused: true });
    this.props.selectAnon(this.props.request.creator_id);
    this.props.navigator.push({ name: 'anonHistory' });
  }
  render() {
    let hasDonor;
    let showDonateButton;
    const request = this.props.request;
    let activeDonation;

    if (request.type === 'thankYou') {

    } else if (request.donor_id) {
      hasDonor =
        (<Image
          style={styles.received}
          source={require('../../assets/received.png')}
        />);
      showDonateButton =
        (<Image
          style={styles.disabledDonateButton}
          source={require('../../assets/donate.png')}
        />);
    } else if (this.props.user === null || this.props.user.id === request.creator_id || this.props.activeDonation) {
      showDonateButton =
        (<TouchableOpacity onPress={this.onDonatePress.bind(this)} >
          <Image
            style={styles.disabledDonateButton}
            source={require('../../assets/donate.png')}
          />
        </TouchableOpacity>);
    } else {
      showDonateButton =
      (<TouchableOpacity onPress={this.onDonatePress.bind(this, request)} >
        <Image
          style={styles.donateButton}
          source={require('../../assets/donate.png')}
        />
      </TouchableOpacity>);
    }

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

    let userHistoryDisplay;
    if (!this.props.user || this.props.user && request.creator_id != this.props.user.id) {
      userHistoryDisplay =
        (<TouchableOpacity onPress={this.showAnonHistory.bind(this)} >
          <Text style={styles.history}>
            User History
          </Text>
        </TouchableOpacity>);
    }

    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />

        <View style={styles.wrapper}>

          <View style={styles.videoContainer}>
            <Video requestShow requestShowPaused={this.state.paused} requestShowToggle={this.requestShowToggle} {...this.props} />
          </View>

          <View style={styles.content}>

            <View style={styles.videoFooter}>
              <Text style={styles.dateTime}>
                <TimeAgo secondsOld={request.seconds} />
              </Text>
              {userHistoryDisplay}
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

            {hasDonor}
            <View style={styles.bottomHalf}>
              <View style={styles.donationButtonContainer}>
                {showDonateButton}
              </View>

              <View style={styles.errorMessageContainer}>
                <Text style={styles.errorMessage}>
                  {this.state.errorMessage}
                </Text>
              </View>

              <View >
                {activeDonation}
              </View>
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
