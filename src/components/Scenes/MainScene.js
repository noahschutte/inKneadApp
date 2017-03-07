import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import {
  retrieveNotifications,
  getEntries,
  sortEntries,
  toggleSideMenu,
  userLogout,
} from '../../actions';
import ToggleMenu from '../ToggleMenu';
import SortBar from '../SortBar';
import Entries from '../Entries';


class MainScene extends Component {

  componentDidMount() {
    if (this.props.userID) {
      this.props.retrieveNotifications(this.props.userID);
    }
  }

  onChange = (isOpen) => {
    if (isOpen === false) {
      this.props.toggleSideMenu(true);
    }
  }

  getEntryRows = () => {
    const {
      shown,
      requests,
      thankYous,
      userCreatedRequests,
      userCreatedThankYous,
      userDonatedRequests,
      userDonatedThankYous,
    } = this.props.entries;
    switch (shown) {
      case 'All':
        return [...requests, ...thankYous];
      case 'Requests':
        if (requests) {
          return requests.filter(request => request.donorId === null);
        }
        return [];
      case 'Thanks':
        return thankYous;
      case 'Fulfilled':
        return requests.filter(request => request.donorId !== null);
      case 'Requests ':
        return userCreatedRequests;
      case 'Thank Yous':
        return userCreatedThankYous;
      case 'Donated':
        return userDonatedRequests;
      case 'Gratitude':
        return userDonatedThankYous;
      default:
        return requests;
    }
  }

  assembleOptions = () => {
    // Global requests is called 'Requests'
    // Private requests is called 'Requests '
    // The space is a hack, but it works so hey.
    const globalOptions = ['Requests', 'Fulfilled', 'Thanks', 'All'];
    const userHistoryOptions = ['Requests ', 'Thank Yous', 'Donated', 'Gratitude'];
    if (this.props.entries.scope === 'global') {
      return globalOptions;
    }
    return userHistoryOptions;
  }


  render() {
    const { userID, entries, sideMenuOpen, notifications } = this.props;
    const { shown, loading, totalDonatedPizzas } = entries;
    const menu = (
      <ToggleMenu
        doesHaveNotifications={notifications.hasNotifications}
        userID={userID}
        toggle={this.props.toggleSideMenu}
        totalDonatedPizzas={totalDonatedPizzas}
        retrieveNotifications={this.props.retrieveNotifications.bind(null, userID)}
      />
    );
    console.log('notifications', notifications.hasNotifications);
    return (
      <SideMenu
        onChange={this.onChange}
        menu={menu}
        isOpen={sideMenuOpen}
      >
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <SortBar
            options={this.assembleOptions()}
            shown={shown}
            onPress={this.props.sortEntries}
          />
          <Entries
            userID={userID}
            origin='MainScene'
            entryRows={this.getEntryRows()}
            getEntries={() => this.props.getEntries(userID)}
            loading={loading}
          />
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = ({ entries, user, nav, notifications }) => {
  const { userID, logOut } = user;
  const { sideMenuOpen } = nav;
  return { entries, userID, notifications, logOut, sideMenuOpen };
};

export default connect(mapStateToProps, {
  getEntries,
  sortEntries,
  retrieveNotifications,
  toggleSideMenu,
  userLogout
})(MainScene);
