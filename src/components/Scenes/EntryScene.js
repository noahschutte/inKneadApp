import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { MenuContext } from 'react-native-popup-menu';
import { confirmDonation, confirmDelete, reportVideo } from '../../actions';
import EntryVideo from '../EntryVideo';
import EntryDetails from '../EntryDetails';

class EntryScene extends Component {
  state = {
    paused: true,
    thanksText: 'YAY PIZZA!'
  };

  onDonatePress = () => {
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
        'You will have 30 minutes to send an online gift card',
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
    Actions.UserHistoryScene({ userID: this.props.entry.creatorId });
  }

  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }

  render() {
    const { entry, userID } = this.props;

    // showUserHistory: a boolean that determines whether to show a  link to the history
    // of this entry's creator, depending on how you reached this particular entry.
    const showUserHistory = (this.props.origin === 'MainScene');

    // ownEntry: a boolean that determines whether the user viewing this entry
    // is the user that created the entry.
    const ownEntry = (this.props.entry.creatorId === this.props.userID);
    let onButtonPress;
    let buttonText;


    if (entry.status === 'active' && entry.donorId === userID && userID !== null) { // Has the current user committed to this request?
      onButtonPress = this.completeDonation;
      buttonText = 'FINISH DONATION';
    } else if (entry.type === 'request' && entry.donorId !== null) { // Has someone committed to making this donation?
      onButtonPress = null;              // Ignores whether recipient has acknowledged receipt or not.
      buttonText = 'RECEIVED';
    } else if (entry.status === 'active' && entry.donorId === null) { // Is this an active request?
      onButtonPress = this.onDonatePress;
      buttonText = 'DONATE';
      if (ownEntry) { // Does this entry lack a donor AND belong to the current user?
        onButtonPress = this.deleteEntry.bind(this, entry.id);
        buttonText = 'REMOVE';
      }
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
        <EntryDetails
          showUserHistory={showUserHistory}
          entryData={entry}
          reportVideo={() => this.props.reportVideo(userID, entry.id)}
          deleteEntry={this.props.deleteEntry}
          navigateToUser={this.navigateToUser}
          onButtonPress={onButtonPress}
          buttonText={buttonText}
        />
      </MenuContext>
    );
  }
}

const mapStateToProps = ({ user, notifications }) => {
  const { userID } = user;
  const activeDonationNotifications = notifications.userNotifications.filter(notification => notification.id === 1);
  const redirects = [];
  for (const notification of activeDonationNotifications) {
    redirects.push(notification.redirect);
  }
  return { userID, redirects };
};

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(mapStateToProps, { confirmDonation, confirmDelete, reportVideo })(EntryScene);
