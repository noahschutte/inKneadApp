import React, { Component } from 'react';
import { Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MenuContext } from 'react-native-popup-menu';
import { confirmDonation, confirmDelete, reportVideo, blockUser } from '../../actions';
import EntryVideo from '../EntryVideo';
import EntryDetails from '../EntryDetails';

class EntryScene extends Component {
  state = {
    paused: true,
    thanksText: 'YAY PIZZA!',
    receivedText: 'RECEIVED'
  };

  onDonatePress = () => {
    if (!this.shouldUserBeHere()) {
      Actions.MainScene();
      return;
    }
    this.setState({ paused: true });
    const { userID, entry } = this.props;
    // Direct user to log in if not logged in already
    if (!userID) {
      Actions.LoginScene({
        redirect: {
          scene: 'EntryScene',
          parameter: entry
        }
      });
    } else {
      Alert.alert(
        `Are you sure you want to donate ${entry.pizzas} pizza(s)?`,
        'You will have 30 minutes to send an online gift card. We do not take any payments on our application. The gift card will be purchased directly from a pizza vendor\'s website. You can make that purchase from your phone or on a computer.',
        [
          {
            text: 'Cancel',
          },
          {
            text: 'Donate',
            onPress: this.confirmDonation
          }
        ]
      );
    }
  }

  onThankYouPress = () => {
    let thanksText = this.state.thanksText;
    thanksText += ' PIZZA!';
    this.setState({ thanksText });
  }

  onReceivedPress = () => {
    let receivedText = this.state.receivedText;
    receivedText += ' PIZZA!';
    this.setState({ receivedText });
  }

  confirmDonation = () => {
    this.props.confirmDonation(this.props.userID, this.props.entry);
  }

  completeDonation = () => {
    let recipientEmail;
    const { redirects, entry } = this.props;
    for (const redirect of redirects) {
      if (redirect.parameter.entry.id === entry.id) {
        recipientEmail = redirect.parameter.recipientEmail;
      }
    }
    Actions.InstructionsScene({
      entry: this.props.entry,
      recipientEmail,
    });
  }

  deleteEntry = (entryId) => {
    Alert.alert(
      'Are you sure you want to delete this request?',
      null,
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => this.props.confirmDelete(entryId)
        },
      ]
    );
  }

  navigateToUser = () => {
    this.setState({ paused: true });
    Actions.root();
    Actions.UserHistoryScene({ type: 'reset', userID: this.props.entry.creatorId });
  }

  shouldUserBeHere = () => {
    const { requests, thankYous } = this.props.blockedVideos;
    const { entry, blockedUsers } = this.props;
    for (const blockedRequest of requests) {
      if (blockedRequest === entry.id && entry.type === 'request') {
        return false;
      }
    }
    for (const blockedThankYou of thankYous) {
      if (blockedThankYou === entry.id && entry.type === 'thankYou') {
        return false;
      }
    }
    for (const blockedUser of blockedUsers) {
      if (blockedUser === entry.creatorId) {
        return false;
      }
    }
    return true;
  }

  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }

  render() {
    const { entry, userID } = this.props;

    // showUserHistory: a boolean that determines whether to show a  link to the history
    // of this entry's creator, depending on how you reached this particular entry.
    const showUserHistory = (this.props.origin !== 'UserHistoryScene');

    // ownEntry: a boolean that determines whether the user viewing this entry
    // is the user that created the entry.
    const ownEntry = (this.props.entry.creatorId === this.props.userID);
    let onButtonPress;
    let buttonText;

    if (entry.status === 'active' && entry.donorId === userID && userID !== null && entry.type === 'request') { // Has the current user committed to this request?
      onButtonPress = this.completeDonation;
      buttonText = 'FINISH DONATION';
    } else if (entry.type === 'request' && entry.donorId !== null) { // Has someone committed to making this donation?
      onButtonPress = this.onReceivedPress;              // Ignores whether recipient has acknowledged receipt or not.
      buttonText = this.state.receivedText;
    } else if (entry.status === 'active' && entry.donorId === null) { // Is this an active request?
      onButtonPress = this.onDonatePress;
      buttonText = 'DONATE';
      if (ownEntry) { // Does this entry lack a donor AND belong to the current user?
        onButtonPress = this.deleteEntry.bind(this, entry.id);
        buttonText = 'REMOVE';
      }
    } else if (entry.status === 'expired') {
      buttonText = 'EXPIRED';
    } else { // Default Yay pizza button
      onButtonPress = this.onThankYouPress;
      buttonText = this.state.thanksText;
    }
    return (
      <MenuContext style={styles.container}>
        <EntryVideo
          togglePlay={this.togglePlay}
          source={entry.compressedVideo}
          thumbnail={entry.thumbnail}
          paused={this.state.paused}
        />
        <ScrollView style={{ flex: 5 }}>
        <EntryDetails
          shouldUserBeHere={this.shouldUserBeHere()}
          userID={userID}
          showUserHistory={showUserHistory}
          entryData={entry}
          reportVideo={() => this.props.reportVideo(userID, entry)}
          blockUser={() => this.props.blockUser(userID, entry)}
          deleteEntry={this.props.deleteEntry}
          navigateToUser={this.navigateToUser}
          onButtonPress={onButtonPress}
          buttonText={buttonText}
        />
      </ScrollView>
      </MenuContext>
    );
  }
}

const mapStateToProps = ({ user, notifications }) => {
  const { userID, blockedUsers, blockedVideos } = user;
  const activeDonationNotifications = notifications.userNotifications.filter(notification => notification.id === 1);
  const redirects = [];
  for (const notification of activeDonationNotifications) {
    redirects.push(notification.redirect);
  }
  return { blockedUsers, blockedVideos, userID, redirects };
};

const styles = {
  container: {
    flex: 1,
    overflow: 'scroll',
  },
};

export default connect(mapStateToProps, { confirmDonation, confirmDelete, reportVideo, blockUser })(EntryScene);
