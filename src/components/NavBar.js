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
import { toggleScope, redirectTo, toggleSideMenu, retrieveNotifications } from '../actions';
import {
  globalButton,
  historyButton,
  backButton,
  menuButton,
  newRequestButton
} from '../assets';
import Button from './Button2';

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
          case 'requests_and_thank_yous':
          result = (
            <Image
              style={styles.centerButtonStyle}
              source={globalButton}
            />
          );
          break;
          case 'user_history':
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
        result = (
          <Image
            style={styles.leftButtonStyle}
            source={menuButton}
          />
        );
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
        result = (
          <Image
            style={styles.rightButtonStyle}
            source={newRequestButton}
          />
        );
        if (this.props.userID) {
          onPress = Actions.EntryCreationScene;
        } else {
          onPress = Actions.LoginScene;
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
    padding: 5,
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
  }
};

const mapStateToProps = ({ entries, user, nav }) => {
  const { scope } = entries;
  const { userID } = user;
  const { sideMenuOpen } = nav;
  return { scope, userID, sideMenuOpen };
};

export default connect(mapStateToProps, { toggleScope, redirectTo, toggleSideMenu, retrieveNotifications })(NavBar);
