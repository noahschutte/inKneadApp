import React, { Component } from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import { toggleScope, redirectTo, toggleSideMenu, retrieveNotifications } from '../actions';
import ScopeButton from './ScopeButton';
// import NotificationAlert from './NotificationAlert';

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
          <Text style={styles.titleStyle}>{title}</Text>
        );
    }
  }

  renderLeftButton = () => {
    const { navBarProps, sideMenuOpen } = this.props;
    let result;
    let onPress;
    switch (navBarProps.leftButton) {
      case 'backButton':
        result = <Icon name='angle-left' style={{ paddingRight: 25, fontSize: 36, color: '#ffffff' }} />;
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
    paddingTop: (Platform.OS === 'ios') ? 25 : 0,
    // paddingBottom: 5,
    flexDirection: 'row',
    backgroundColor: '#ce0000',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingVertical: 5,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  titleStyle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: (Platform.OS === 'ios') ? 'AvenirNext-Regular' : 'sans-serif',
    textAlign: 'center',
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
