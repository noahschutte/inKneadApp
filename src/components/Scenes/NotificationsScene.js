import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import {
  acceptEULA,
  donorViewed,
  redirectTo,
  confirmDonationReceived,
  removeNotification,
  updateEmail
} from '../../actions';
import Button from '../Button2';
import DetailSection from '../DetailSection';

class NotificationsScene extends Component {

  state = {
    expanded: [],
  }

  onPress = (action, notificationID, redirect = null, key) => {
    const { signupEmail, userID } = this.props;
    switch (action) {
      case 'viewThankYou':
      /* eslint no-fallthrough: 0 */
        this.props.donorViewed(redirect.parameter.id);
      case 'verifyEmailScene':
      case 'completeDonation':
      case 'createThankYou':
        return () => this.props.redirectTo(redirect);
      case 'confirmDonation':
        return () => this.props.confirmDonationReceived(redirect.parameter);
      case 'verifyEmail':
        return () => {
          this.props.updateEmail(signupEmail, userID, { scene: 'NotificationsScene' });
          this.props.removeNotification(notificationID);
        };
      case 'acceptEula':
        return () => {
          this.props.acceptEULA(userID);
          this.props.removeNotification(notificationID);
        };
      case 'acknowledgeRemoval':
        return () => {
          this.acknowledgeRemoval(redirect.parameter);
          this.props.removeNotification(notificationID);
        };
      case 'nothing':
        return () => this.collapseNotification(key);
      case 'clear':
        return () => this.props.removeNotification(notificationID);
      default:
        return () => alert('this will work eventually');
    }
  }

  acknowledgeRemoval = (entry) => {
    let url = `https://in-knead.herokuapp.com/requests/${entry.id}`;
    if (entry.donor_viewed === true || entry.donor_viewed === false) {
      url = `https://in-knead.herokuapp.com/thank_you/${entry.id}`;
    }
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ removalViewed: true }),
    })
    .then(response => {
      if (response.status === 400) {
        alert('Something went wrong...');
      }
    })
    .catch(err => alert(err));
  }

  buttonContent = (notification, key) => {
    const { text, expandable, id, redirect } = notification;
    if (expandable && this.state.expanded.indexOf(key) !== -1) {
      return (
        <DetailSection contentStyle={{ flexDirection: 'column' }}>
          <Text style={styles.text}>{text}</Text>
          <Text style={[styles.text, styles.subText]}>{expandable.text}</Text>
          <DetailSection contentStyle={{ justifyContent: 'space-around' }}>

            {expandable.buttons.map(button => {
              return (
                <Button
                  key={id + button.type}
                  touchableOpacity
                  buttonType={button.type}
                  onPress={this.onPress(button.action, id, redirect, key)}
                >
                  {button.text}
                </Button>
              );
            })}

          </DetailSection>
        </DetailSection>
      );
    }
    return (
      <DetailSection style={{ margin: 0, padding: 0, elevation: 0 }}>
        <Text style={styles.text}>{text}</Text>
      </DetailSection>
    );
  }

  expandNotification = (key) => {
    const expanded = [key, ...this.state.expanded];
    this.setState({ expanded });
  }

  collapseNotification = (key) => {
    const expanded = [...this.state.expanded];
    const index = expanded.indexOf(key);
    expanded.splice(index, 1);
    this.setState({ expanded });
  }

  render() {
    const { notifications } = this.props;
    let content;
    if (notifications.length > 0) {
      content = notifications.map(notification => {
        const key = notifications.indexOf(notification);
        let onPress;
        if (notification.redirect && !notification.expandable) {
          onPress = () => this.props.redirectTo(notification.redirect);
        } else if (notification.expandable) {
          const index = this.state.expanded.indexOf(key);
          if (index === -1) {
            onPress = () => this.expandNotification(key);
          } else {
            onPress = () => this.collapseNotification(key);
          }
        }
        const buttonContent = this.buttonContent(notification, key);
        return (
          <View key={key} style={{ marginTop: 10, marginHorizontal: -5 }}>
            <Button touchableOpacity buttonStyle={styles.buttonStyle} onPress={onPress}>
              {buttonContent}
            </Button>
          </View>
        );
      });
    } else {
      content = <Text style={{ textAlign: 'center', marginTop: 50 }}>Nothing to show...</Text>;
    }
    return (
      <View style={{ flex: 1, marginTop: 25 }}>
          {content}
      </View>
    );
  }
}

const buttonStyleIOS = {
    borderWidth: 0,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderColor: 'black',
    paddingLeft: 5,
  };

const buttonStyleAndroid = {
  borderWidth: 0,
  borderRadius: 0,
  borderBottomWidth: 1,
  alignItems: 'flex-start',
  borderColor: 'black',
  paddingLeft: 5,
};

const styles = {
  text: {
    textAlign: 'left',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: 'normal',
    color: 'black',
  },
  buttonStyle: Platform.OS === 'ios' ? buttonStyleIOS : buttonStyleAndroid,
};

const mapStateToProps = (state) => {
  const notifications = state.notifications.userNotifications;
  const { signupEmail, userID } = state.user;
  return { notifications, signupEmail, userID };
};
export default connect(mapStateToProps, {
  acceptEULA,
  donorViewed,
  redirectTo,
  confirmDonationReceived,
  removeNotification,
  updateEmail,
})(NotificationsScene);
