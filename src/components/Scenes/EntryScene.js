import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { confirmDonation } from '../../actions';
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

  deleteEntry = (entryId) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entryId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(() => {
      Actions.MainScene({ type: 'reset' });
    })
    .catch(err => alert(err));
  };

  navigateToUser = () => {
    this.setState({ paused: true });
    Actions.UserHistoryScene({ userID: this.props.entry.creatorId });
  }

  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }

  render() {
    const { entry } = this.props;
    // showUserHistory: a boolean that determines whether to show a  link to the history
    // of this entry's creator, depending on how you reached this particular entry.
    const showUserHistory = (this.props.origin === 'MainScene');
    // ownEntry: a boolean that determines whether the user viewing this entry
    // is the user that created the entry.
    const ownEntry = (this.props.entry.creatorId === this.props.userID);
    let onButtonPress;
    let buttonText;

    if (entry.status === 'active' && ownEntry) {
      onButtonPress = this.deleteEntry.bind(this, entry.id);
      buttonText = 'REMOVE';
    } else if (entry.status === 'received') {
      onButtonPress = null;
      buttonText = 'RECEIVED';
    } else if (entry.type === 'request' && entry.donorId === null) {
      onButtonPress = this.onDonatePress;
      buttonText = 'DONATE';
    } else {
      onButtonPress = this.onThankYouPress;
      buttonText = this.state.thanksText;
    }

    return (
      <View style={styles.container}>
        <EntryVideo
          togglePlay={this.togglePlay}
          source={entry.compressedVideo}
          paused={this.state.paused}
        />
        <EntryDetails
          showUserHistory={showUserHistory}
          entryData={entry}
          deleteEntry={this.props.deleteEntry}
          navigateToUser={this.navigateToUser}
          onButtonPress={onButtonPress}
          buttonText={buttonText}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { userID } = user;
  return { userID };
};

const styles = {
  container: {
    flex: 1,
  },
};

export default connect(mapStateToProps, { confirmDonation })(EntryScene);
