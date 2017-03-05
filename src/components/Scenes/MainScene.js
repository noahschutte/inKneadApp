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
      userRequests,
      userFulfilled,
      userThankYous
    } = this.props.entries;
    const { userID } = this.props;

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
      case 'Requested':
        return userRequests;
      case 'Received':
        return userFulfilled;
      case 'Donated':
        return requests.filter(request => (request.donorId === userID));
      case 'Gratitude':
        return userThankYous;
      default:
        return requests;
    }
  }

  // Returns a boolean describing whether a user has waiting notifications
  doesHaveNotifications = () => {
    return this.props.notifications.userNotifications.length > 0;
  }

  assembleOptions = () => {
    const globalOptions = ['Requests', 'Fulfilled', 'Thanks', 'All'];
    const userHistoryOptions = ['Requested', 'Received', 'Donated', 'Gratitude'];
    if (this.props.entries.scope === 'requests_and_thank_yous') {
      return globalOptions;
    }
    return userHistoryOptions;
  }


  render() {
    const { userID, entries, sideMenuOpen } = this.props;
    const { shown, loading, totalDonatedPizzas } = entries;
    const menu = (
      <ToggleMenu
        doesHaveNotifications={this.doesHaveNotifications()}
        userID={userID}
        toggle={this.props.toggleSideMenu}
        totalDonatedPizzas={totalDonatedPizzas}
      />
    );

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
