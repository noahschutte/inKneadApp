import React, { Component } from 'react';
import {
  Dimensions,
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import PlatformText from './PlatformText';
import { handleVideoData, toggleScope, redirectTo, toggleSideMenu, retrieveNotifications } from '../actions';
import ScopeButton from './ScopeButton';

class NavBar extends Component {

  renderTitle = () => {
    const { title } = this.props.navBarProps;
    const { scope, userID } = this.props;
    let onPress;
    switch (title) {
      case 'scope':
        onPress = this.props.toggleScope.bind(this, scope, userID);
        return <ScopeButton onPress={onPress} scope={scope} />;
      case null:
        return null;
      default:
        return (
          <View style={styles.titleStyle}>
            <PlatformText type='medium' textStyle={{ color: '#fff', fontSize: 20 }}>{title}</PlatformText>
          </View>
        );
    }
  }

  renderLeftButton = () => {
    const { handleVideoData, navBarProps, sideMenuOpen } = this.props;
    let result;
    let onPress;
    const ecbb = () => {
      handleVideoData(null);
      Actions.pop();
    };
    switch (navBarProps.leftButton) {
      case 'backButton':
        result = <Icon name='angle-left' style={{ paddingRight: 25, fontSize: 36, color: '#ffffff' }} />;
        if (navBarProps.redirect) {
          onPress = () => this.props.redirectTo(navBarProps.redirect);
        } else {
          onPress = Actions.pop;
        }
        break;
      case 'entryCreationBackButton':
        result = <Icon name='angle-left' style={{ paddingRight: 25, fontSize: 36, color: '#ffffff' }} />;
        onPress = ecbb;
        break;
      case 'sideMenu':
      case 'menuButton':
        result = <Icon name='navicon' style={{ fontSize: 36, color: '#ffffff' }} />;
        onPress = () => this.props.toggleSideMenu(sideMenuOpen);
        break;
      default:
        return <View />;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        {result}
      </TouchableOpacity>
    );
  }

  renderRightButton = () => {
    const { rightButton } = this.props.navBarProps;
    let result;
    let onPress;
    switch (rightButton) {
      case 'retrieveNotifications':
        return (
          <TouchableOpacity
            onPress={() => this.props.retrieveNotifications(this.props.userID)}
          >
            <Icon name='refresh' style={{ fontSize: 28, color: '#ffffff' }} />
          </TouchableOpacity>
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
        return <View />;
    }
    return (
      <TouchableOpacity onPress={onPress}>
        {result}
      </TouchableOpacity>
    );
  }

  render() {
    let statusBar;
    if (Platform.OS === 'ios') {
      statusBar = <StatusBar barStyle='light-content' />;
    }

    return (
      <View style={styles.navBarStyle}>
        {statusBar}
        {this.renderLeftButton()}
        {this.renderTitle()}
        {this.renderRightButton()}
      </View>
    );
  }
}

const styles = {
  navBarStyle: {
    position: 'absolute',
    height: (Platform.OS === 'ios') ? 74 : 54,
    width: Dimensions.get('window').width,
    top: 0,
    paddingTop: (Platform.OS === 'ios') ? 15 : 0,
    flexDirection: 'row',
    backgroundColor: '#ce0000',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    elevation: 2,
  },
  titleStyle: {
    // position: 'absolute', This causes issues with iOS TouchableOpacity
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Platform.OS === 'ios') ? 33 : 15
  },
};

const mapStateToProps = ({ entries, user, nav, notifications }) => {
  const { scope } = entries;
  const { userID } = user;
  const { sideMenuOpen } = nav;
  const doesHaveNotifications = (notifications.userNotifications.length > 0 && userID);
  return { scope, userID, sideMenuOpen, doesHaveNotifications };
};

export default connect(mapStateToProps, { handleVideoData, toggleScope, redirectTo, toggleSideMenu, retrieveNotifications })(NavBar);
