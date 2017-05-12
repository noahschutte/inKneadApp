import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toggleScope, redirectTo, toggleSideMenu, retrieveNotifications } from '../actions';
import {
  globalButton,
  historyButton,
  backButton,
} from '../assets';
import Button from './Button2';
// import NotificationAlert from './NotificationAlert';

class NavBar extends Component {

  renderTitle = () => {
    const { title } = this.props.navBarProps;
    const { scope, userID } = this.props;
    let result;
    let onPress;
    switch (title) {

      case 'scope':
      onPress = this.props.toggleScope.bind(this, scope, userID);
        switch (scope) {
          case 'global':
          result = (
            <Image
              style={styles.centerButtonStyle}
              source={globalButton}
            />
          );
          break;
          case 'private':
          result = (
            <Image
              style={styles.centerButtonStyle}
              source={historyButton}
            />
          );
          break;
          default:
            result = null;
            break;
        }
        break;
      case null:
        return null;
      default:
        return (
          <Text style={styles.titleStyle}>{title}</Text>
        );
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  renderLeftButton = () => {
    const { navBarProps, sideMenuOpen } = this.props;
    let result;
    let onPress;
    switch (navBarProps.leftButton) {
      case 'backButton':
        result = (
          <Image
            style={[styles.leftButtonStyle, { right: 15 }]}
            source={backButton}
          />
        );
        if (navBarProps.redirect) {
          onPress = () => this.props.redirectTo(navBarProps.redirect);
        } else {
          onPress = Actions.pop;
        }
        break;
      case 'sideMenu':
      case 'menuButton':
        result = <Icon name='navicon' style={{ fontSize: 36, color: '#ffffff' }} />;
        // Renders a little blue circle with an exclamation mark if notifications exist
        // if (this.props.doesHaveNotifications) {
        //   result = (
        //     <Image
        //       style={styles.leftButtonStyle}
        //       source={menuButton}
        //     >
        //       <NotificationAlert alertStyle={styles.alertStyle} />
        //     </Image>
        //   );
        // }
        onPress = () => this.props.toggleSideMenu(sideMenuOpen);
        break;
      default:
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  renderRightButton = () => {
    const { rightButton } = this.props.navBarProps;
    let result;
    let onPress;
    switch (rightButton) {
      case 'retrieveNotifications':
        return (
          <Button
            touchableOpacity
            buttonStyle={{ backgroundColor: '#ce0000', paddingTop: -3 }}
            onPress={() => this.props.retrieveNotifications(this.props.userID)}
          >
            Refresh
          </Button>
        );
      case 'newRequest':
        result = <Icon name='plus' style={{ fontSize: 36, color: '#ffffff' }} />;
        if (this.props.userID) {
          onPress = Actions.EntryCreationScene;
        } else {
          onPress = () => Actions.LoginScene({
            redirect: {
              scene: 'EntryCreationScene'
            }
          });
        }
        break;
      default:
        return null;
    }
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        {result}
      </TouchableWithoutFeedback>
    );
  }

  render() {
    let content;
    if (this.props.navBarProps) {
      content = (
        <View style={styles.navBarStyle}>
          {this.renderLeftButton()}
          {this.renderTitle()}
          {this.renderRightButton()}
        </View>
      );
    } else {
      content = <View style={styles.navBarStyle}><Text>No Nav Props</Text></View>;
    }

    return content;
  }
}

const styles = {
  navBarStyle: {
    position: 'absolute',
    height: 54,
    width: Dimensions.get('window').width,
    top: (Platform.OS === 'ios') ? 20 : 0, //if platform is iOS give it a height of 20, else no height (Android apps have their own status bar)
    flexDirection: 'row',
    backgroundColor: '#ce0000',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  titleStyle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 4,
  },
  centerButtonStyle: {
    flex: 4,
    resizeMode: 'contain',
    height: 40,
  },
  rightButtonStyle: {
    flex: 1.5,
    resizeMode: 'contain',
    height: 30,
    width: null,
  },
  leftButtonStyle: {
    flex: 1.5,
    resizeMode: 'contain',
    height: 30,
    width: null,
  },
  alertStyle: {
    backgroundColor: '#43cece',
    width: 20,
    height: 20,
    borderRadius: 20 / 2,
    position: 'relative',
    top: 11,
    left: 11,
  }
};

const mapStateToProps = ({ entries, user, nav, notifications }) => {
  const { scope } = entries;
  const { userID } = user;
  const { sideMenuOpen } = nav;
  const doesHaveNotifications = (notifications.userNotifications.length > 0 && userID);
  return { scope, userID, sideMenuOpen, doesHaveNotifications };
};

export default connect(mapStateToProps, { toggleScope, redirectTo, toggleSideMenu, retrieveNotifications })(NavBar);
