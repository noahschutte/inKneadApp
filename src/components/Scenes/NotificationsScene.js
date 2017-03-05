import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { redirectTo, confirmDonationReceived } from '../../actions';
import Button from '../Button2';
import DetailSection from '../DetailSection';

class NotificationsScene extends Component {

  state = {
    expanded: [],
  }

  onPress = (action, notificationID, redirect = null) => {
    switch (action) {
      case 'verifyEmail':
      case 'completeDonation':
        return () => this.props.redirectTo(redirect);
      case 'confirmDonation':
        return () => this.props.confirmDonationReceived(redirect.userID, redirect.requestID);
      case 'createThankYou':
        return () => this.props.redirectTo(redirect);
      case 'viewThankYou':
        return () => this.props.redirectTo(redirect);
      case 'nothing':
        return () => this.collapseNotification(this.state.expanded.indexOf(notificationID));
      default:
        return () => alert('this will work eventually');
    }
  }

  buttonContent = (notification) => {
    const { text, expandable, id, redirect } = notification;
    if (expandable && this.state.expanded.indexOf(id) !== -1) {
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
                  onPress={this.onPress(button.action, id, redirect)}
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
      <DetailSection>
        <Text style={styles.text}>{text}</Text>
      </DetailSection>
    );
  }

  expandNotification = (id) => {
    const expanded = [id, ...this.state.expanded];
    this.setState({ expanded });
  }

  collapseNotification = (index) => {
    const expanded = [...this.state.expanded];
    expanded.splice(index, 1);
    this.setState({ expanded });
  }

  render() {
    const { notifications } = this.props;
    let content;
    if (notifications.length > 0) {
      content = notifications.map(notification => {
        let onPress;
        if (notification.redirect && !notification.expandable) {
          onPress = () => this.props.redirectTo(notification.redirect);
        } else if (notification.expandable) {
          const index = this.state.expanded.indexOf(notification.id);
          if (index === -1) {
            onPress = () => this.expandNotification(notification.id);
          } else {
            onPress = () => this.collapseNotification(index);
          }
        }
        const buttonContent = this.buttonContent(notification);
        return (
          <View key={notification.text} style={{ marginTop: 10 }}>
            <Button touchableOpacity onPress={onPress}>
              {buttonContent}
            </Button>
          </View>
        );
      });
    } else {
      content = <Text style={{ textAlign: 'center', marginTop: 50 }}>Nothing to show...</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
          {content}
      </View>
    );
  }
}

const styles = {
  text: {
    textAlign: 'center',
    fontSize: 22,
    padding: 5,
    fontWeight: 'bold',
    color: '#00cece',
  },
  subText: {
    fontSize: 14,
    lineHeight: 22,
    fontWeight: 'normal',
    color: 'black',
  },
};

const mapStateToProps = (state) => {
  const notifications = state.notifications.userNotifications;
  return { notifications };
};

export default connect(mapStateToProps, {
  redirectTo,
  confirmDonationReceived
})(NotificationsScene);
