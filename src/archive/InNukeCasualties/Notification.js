import React, { Component } from 'react';
import { Alert, View, Text, StyleSheet } from 'react-native';
import Button from './Button';

export default class Notification extends Component {
  handleInstructions() {
    this.props.navigator.push({ name: 'instructions' });
  }
  confirmDonationReceived() {
    const userID = this.props.user.id;
    const receivedDonation = true;
    const recentSuccessfulRequestID = this.props.recentSuccessfulRequest.id;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${recentSuccessfulRequestID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        userID,
        receivedDonation
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.handleRecentSuccessfulRequest(responseJson.recentSuccessfulRequest);
      this.props.refreshNotifications(true);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  denyDonationReceived() {
    Alert.alert(
      'No luck yet?',
      'Check your email again in another 30 minutes.',
      [
        { text: 'Okay.', onPress: () => console.log('OK Pressed') },
      ]
    );
  }
  onCreateThankYouPress() {
    this.props.navigator.push({ name: 'createThankYou' });
  }

  render() {
    let display;
    if (this.props.activeDonationDisplay) {
      display =
        (<View style={styles.wrapper}>
          <Button
            text="Complete your recent donation now."
            backgroundColor="green"
            onPress={this.handleInstructions.bind(this)}
          />
        </View>);
    } else if (this.props.recentSuccessfulRequest && this.props.recentSuccessfulRequest.received === 0) {
      display =
        (<View style={styles.wrapper}>
          <View style={styles.prompt}>
            <Text>
              Please go check your email now.
            </Text>
            <Text>
              Did you receive your donation by email yet?
            </Text>
          </View>
          <View style={styles.options}>
            <View style={styles.half}>
              <Button
                text="Not yet..."
                backgroundColor="green"
                onPress={this.denyDonationReceived.bind(this)}
              />
            </View>
            <View style={styles.half}>
              <Button
                text="Yes!"
                backgroundColor="green"
                onPress={this.confirmDonationReceived.bind(this)}
              />
            </View>
          </View>
        </View>);
    } else if (this.props.recentSuccessfulRequest && this.props.recentSuccessfulRequest.received === 1 && this.props.recentThankYou === null || this.props.recentSuccessfulRequest && this.props.recentSuccessfulRequest.received === 1 && this.props.recentThankYou && this.props.recentThankYou.request_id != this.props.recentSuccessfulRequest.id) {
      display =
        (<View style={styles.wrapper}>
          <View style={styles.prompt}>
            <Text>
              Awesome Sauce!
            </Text>
            <Text>
              Are you ready to send a "Thank you" video now?
            </Text>
          </View>
          <View style={styles.options}>
            <Button
            text="Heck Yeah!"
            backgroundColor="green"
            onPress={this.onCreateThankYouPress.bind(this)}
            />
          </View>
        </View>);
    }

    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prompt: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  options: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  half: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
