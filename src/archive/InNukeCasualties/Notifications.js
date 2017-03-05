import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Nav from './Nav';
import Notification from './Notification';
import GuestView from './GuestView';
import Button from './Button';

export default class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false,
    };
    this.refreshNotifications = this.refreshNotifications.bind(this);
  }
  refreshNotifications(toggle) {
    this.setState({ refresh: toggle });
  }
  componentWillMount() {
    if (this.props.user) {
      const userID = this.props.user.id;
      fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
        this.props.handleWelcomeUrl(responseJson.url);
        if (responseJson.errorMessage === 'No current requests.') {
        } else {
          this.props.collectUserRequests(responseJson.userRequests);
          this.props.collectUserThankYous(responseJson.userThankYous);
          this.props.handleRecentSuccessfulRequest(responseJson.recentSuccessfulRequest);
        }
      })
      .then((arbitrary) => {
        this.refreshNotifications(true);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
  render() {
    let activeDonationDisplay;
    if (this.props.activeDonation) {
      activeDonationDisplay = <Notification activeDonationDisplay {...this.props} />;
    }

    let receivedDonationDisplay;
    if (this.props.recentSuccessfulRequest && this.props.recentSuccessfulRequest.received === 1 && this.props.recentThankYou && this.props.recentThankYou.request_id === this.props.recentSuccessfulRequest.id) {
      // leave receivedDonationDisplay as undefined
    } else if (this.props.recentSuccessfulRequest) {
      receivedDonationDisplay = <Notification receivedDonationDisplay refreshNotifications={this.refreshNotifications} {...this.props} />;
    }

    let noNotificationsDisplay;
    if (activeDonationDisplay === undefined && receivedDonationDisplay === undefined && this.props.user && this.props.user.current_email) {
      noNotificationsDisplay = <Text>No current notifications.</Text>;
    }

    let updateEmailDisplay;
    if (this.props.user && !this.props.user.current_email) {
      updateEmailDisplay =
        (<View style={styles.currentEmailContainer}>
          <Text>You should really verify your email.</Text>
          <Text>Go to your profile page.</Text>
        </View>);
    }

    let display;
    if (this.props.user === null) {
      display = <GuestView {...this.props} />;
    } else {
      display =
        (<View style={styles.wrapper}>
          <View style={styles.portion}>
            {noNotificationsDisplay}
            {updateEmailDisplay}
          </View>
          <View style={styles.portion}>
            {activeDonationDisplay}
          </View>
          <View style={styles.portion}>
            {receivedDonationDisplay}
          </View>
        </View>);
    }
    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
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
    flex: 9,
  },
  currentEmailContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  refreshWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  portion: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
