import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Nav from './Nav';
import Requests from './Requests';
import Menu from './Menu';
import SideMenu from 'react-native-side-menu';
import History from './History';
import GuestView from './GuestView';
import SortRequests from './SortRequests';
import SortHistory from './SortHistory';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activity: [],
      userHistory: [],
      isOpen: false,
      scope: 'Requests',
      requestType: 'Requests',
      historyType: 'doughnated',
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.changeScope = this.changeScope.bind(this);
    this.changeRequestType = this.changeRequestType.bind(this);
    this.changeHistoryType = this.changeHistoryType.bind(this);
    this.assembleRequests = this.assembleRequests.bind(this);
    this.assembleHistory = this.assembleHistory.bind(this);
  }

  toggleMenu(isOpen) {
    this.setState({ isOpen });
  }

  changeScope(scope) {
    if (this.state.scope !== scope) {
      this.setState({ scope });
    }
  }

  changeRequestType(requestType) {
    if (this.state.requestType !== requestType) {
      this.setState({ requestType });
    }
  }

  changeHistoryType(historyType) {
    if (this.state.historyType !== historyType) {
      this.setState({ historyType });
    }
  }

  assembleRequests() {
    const activity = [];
    if (this.props.requests) {
      activity.push(...this.props.requests);
    }
    if (this.props.thankYous) {
      activity.push(...this.props.thankYous);
    }
    this.setState({ activity });
  }

  assembleHistory() {
    const userHistory = [];
    if (this.props.userRequests) {
      userHistory.push(...this.props.userRequests);
    }
    if (this.props.userThankYous) {
      userHistory.push(...this.props.userThankYous);
    }
    this.setState({ userHistory });
  }

  render() {
    const menu =
      <Menu toggleMenu={this.toggleMenu} changeScope={this.changeScope} {...this.props} />;

    let display;
    let sort;
    if (this.state.scope === 'Requests') {
      display = <Requests assembleRequests={this.assembleRequests} activity={this.state.activity} requestType={this.state.requestType} scope={this.state.scope} {...this.props} />;
      sort = (<SortRequests
        requestType={this.state.requestType}
        changeRequestType={this.changeRequestType}
        style={styles.container} {...this.props}
      />);
    } else if (this.state.scope === 'History' && !this.props.user) {
      display = <GuestView {...this.props} />;
    } else if (this.state.scope === 'History') {
      display = <History assembleHistory={this.assembleHistory} userHistory={this.state.userHistory} historyType={this.state.historyType} scope={this.state.scope} {...this.props} />;
      sort = (<SortHistory
        historyType={this.state.historyType}
        changeHistoryType={this.changeHistoryType}
        style={styles.container} {...this.props}
      />);
    }

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        {...this.props}
      >

        <View style={styles.container}>

          <Nav toggleMenu={this.toggleMenu} isOpen={this.state.isOpen} currentScope={this.state.scope} changeScope={this.changeScope} {...this.props} />

          {sort}

          {display}

        </View>
      </SideMenu>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
