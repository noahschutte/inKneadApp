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

  componentWillReceiveProps(nextProps) {
    if (!this.props.userID && nextProps.userID) {
      this.props.retrieveNotifications(nextProps.userID);
    }
    if (!this.props.refreshEntries && nextProps.refreshEntries) {
      this.props.getEntries(nextProps.userID);
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
      case 'ALL':
        return [...requests, ...thankYous];
      case 'OPEN':
        if (requests) {
          return requests.filter(request => request.donorId === null);
        }
        return [];
      case 'DONE':
        return [...thankYous, ...requests.filter(request => request.donorId !== null)];
      case 'MY ENTRIES':
        return [...userCreatedRequests, ...userCreatedThankYous];
      case 'MY DONATIONS':
        return [...userDonatedRequests, ...userDonatedThankYous];
      default:
        return requests;
    }
  }

  assembleOptions = () => {
    const globalOptions = ['ALL', 'OPEN', 'DONE'];
    const userHistoryOptions = ['MY ENTRIES', 'MY DONATIONS'];
    if (this.props.entries.scope === 'global') {
      return globalOptions;
    }
    return userHistoryOptions;
  }


  render() {
    const { userID, entries, sideMenuOpen, doesHaveNotifications } = this.props;
    const { shown, loading, totalDonatedPizzas } = entries;
    const menu = (
      <ToggleMenu
        doesHaveNotifications={doesHaveNotifications}
        userID={userID}
        toggle={this.props.toggleSideMenu}
        totalDonatedPizzas={totalDonatedPizzas}
        retrieveNotifications={this.props.retrieveNotifications.bind(null, userID)}
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
  const doesHaveNotifications = (notifications.userNotifications.length > 0 && userID);
  return { entries, userID, doesHaveNotifications, logOut, sideMenuOpen };
};

export default connect(mapStateToProps, {
  getEntries,
  sortEntries,
  retrieveNotifications,
  toggleSideMenu,
  userLogout
})(MainScene);
