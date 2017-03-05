import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Request from './Request';
import SpinningPizza from './SpinningPizza';

export default class History extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      dataSource: null,
    };
  }

  sortHistory(historyType) {
    const collection = [];
    if (this.props.userRequests) {
      collection.push(...this.props.userRequests);
    }
    if (this.props.userThankYous) {
      collection.push(...this.props.userThankYous);
    }

    let userHistory;
    if (historyType === 'in knead') {
      const that = this;
      userHistory = collection.filter((obj) => obj.creator_id === that.props.user.id);
    } else if (historyType === 'doughnated') {
      const that = this;
      userHistory = collection.filter((obj) => obj.creator_id != that.props.user.id);
    }

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(this._genRows(userHistory.length)) });

    this.setState({ refreshing: false });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    const userID = this.props.user.id;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`)
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
      this.props.handleWelcomeUrl(responseJson.url);
      if (!responseJson.errorMessage) {
        this.props.collectUserRequests(responseJson.userRequests);
        this.props.collectUserThankYous(responseJson.userThankYous);
      }
    })
    .then((arbitrary) => {
      this.props.assembleHistory();
      this.sortHistory(this.props.historyType);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentWillMount() {
    if (this.props.user && this.props.userRequests === null) {
      const userID = this.props.user.id;
      fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
        this.props.handleWelcomeUrl(responseJson.url);
        if (!responseJson.errorMessage) {
          this.props.collectUserRequests(responseJson.userRequests);
          this.props.collectUserThankYous(responseJson.userThankYous);
        }
      })
      .then((arbitrary) => {
        this.props.assembleHistory();
        this.sortHistory(this.props.historyType);
      })
      .catch((error) => {
        console.error(error);
      });
    } else if (this.props.user) {
      this.props.collectUserRequests(this.props.userRequests);
      this.props.collectUserThankYous(this.props.userThankYous);
      this.props.assembleHistory();
      this.sortHistory(this.props.historyType);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.historyType && this.props.activeDonation === nextProps.activeDonation);
  }

  componentWillReceiveProps(props) {
    this.sortHistory(props.historyType);
  }

  _renderRow(rowData) {
    const collection = [];
    if (this.props.userRequests) {
      collection.push(...this.props.userRequests);
    }
    if (this.props.userThankYous) {
      collection.push(...this.props.userThankYous);
    }

    let userHistory;
    const historyType = this.props.historyType;
    if (historyType === 'in knead') {
      const that = this;
      userHistory = collection.filter((obj) => obj.creator_id === that.props.user.id);
    } else if (historyType === 'doughnated') {
      const that = this;
      userHistory = collection.filter((obj) => obj.creator_id != that.props.user.id);
    }

    userHistory.sort((a, b) => parseFloat(a.seconds) - parseFloat(b.seconds));

    return <Request history selectedRequest={userHistory[rowData]} {...this.props} />;
  }

  _genRows(length) {
    const result = [];
    for (let i = 0; i < length; i += 1) {
      result.push(i);
    }
    return result;
  }

  render() {
    const historyType = this.props.historyType;
    const collection = [];
    if (this.props.userRequests) {
      collection.push(...this.props.userRequests);
    }
    if (this.props.userThankYous) {
      collection.push(...this.props.userThankYous);
    }

    let userHistory;
    if (historyType === 'in knead') {
      const that = this;
      userHistory = collection.filter((obj) => obj.creator_id === that.props.user.id);
    } else if (historyType === 'doughnated') {
      userHistory = collection.filter((obj) => obj);
    }

    let display;
    if (this.state.refreshing || this.state.dataSource === null) {
      display = <SpinningPizza />;
    } else if (this.props.userHistory.length === 0) {
      display = <Text>No Activity Recorded.</Text>;
    } else {
      display =
        (<View style={styles.listViewWrapper}>
          <ListView
          style={styles.listViewContainer}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow.bind(this)}
          enableEmptySections
          refreshControl={
            <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            />
          }
          />
        </View>);
    }
    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: 'white',
  },
  listViewWrapper: {
    flex: 8,
  },
  listViewContainer: {
    flex: 1,
  },
});
