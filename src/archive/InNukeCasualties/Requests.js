import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text, StyleSheet } from 'react-native';
import Request from './Request';
import SpinningPizza from './SpinningPizza';

export default class Requests extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      dataSource: null,
    };
  }

  sortRequests(requestType) {
    this.setState({ loading: true });

    const collection = [];
    if (this.props.requests) {
      collection.push(...this.props.requests);
    }
    if (this.props.thankYous) {
      collection.push(...this.props.thankYous);
    }

    let activity;
    if (requestType === 'Requests') {
      activity = collection.filter((obj) => obj.donor_id === null);
    } else if (requestType === 'Received') {
      activity = collection.filter((obj) => obj.donor_id != null);
    } else if (requestType === 'Thank Yous') {
      activity = collection.filter((obj) => obj.type === 'thankYou');
    } else if (requestType === 'All') {
      activity = collection;
    }

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(this._genRows(activity.length)) });

    this.setState({ refreshing: false });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests')
    .then((response) => response.json())
    .then((responseJson) => {
      this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
      this.props.handleWelcomeUrl(responseJson.url);
      if (!responseJson.errorMessage) {
        this.props.collectRequests(responseJson.requests);
        this.props.collectThankYous(responseJson.thankYous);
      }
    })
    .then((arbitrary) => {
      this.props.assembleRequests();
      this.sortRequests(this.props.requestType);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  componentWillMount() {
    if (this.props.requests === null) {
      fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests')
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
        this.props.handleWelcomeUrl(responseJson.url);
        if (!responseJson.errorMessage) {
          this.props.collectRequests(responseJson.requests);
          this.props.collectThankYous(responseJson.thankYous);
        }
      })
      .then((arbitrary) => {
        this.props.assembleRequests();
        this.sortRequests(this.props.requestType);
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      this.props.collectRequests(this.props.requests);
      this.props.collectThankYous(this.props.thankYous);
      this.props.assembleRequests();
      this.sortRequests(this.props.requestType);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (nextProps.requestType && this.props.activeDonation === nextProps.activeDonation);
  }

  componentWillReceiveProps(props) {
    this.sortRequests(props.requestType);
  }

  _renderRow(rowData) {
    const collection = [];
    if (this.props.requests) {
      collection.push(...this.props.requests);
    }
    if (this.props.thankYous) {
      collection.push(...this.props.thankYous);
    }

    let activity;
    const requestType = this.props.requestType;
    if (requestType === 'Requests') {
      activity = collection.filter((obj) => obj.donor_id === null);
    } else if (requestType === 'Received') {
      activity = collection.filter((obj) => obj.donor_id != null);
    } else if (requestType === 'Thank Yous') {
      activity = collection.filter((obj) => obj.type === 'thankYou');
    } else if (requestType === 'All') {
      activity = collection;
    }

    activity.sort((a, b) => parseFloat(a.seconds) - parseFloat(b.seconds));
    return <Request selectedRequest={activity[rowData]} {...this.props} />;
  }

  _genRows(length) {
    const result = [];
    for (let i = 0; i < length; i += 1) {
      result.push(i);
    }
    return result;
  }

  render() {
    const requestType = this.props.requestType;

    const collection = [];
    if (this.props.requests) {
      collection.push(...this.props.requests);
    }
    if (this.props.thankYous) {
      collection.push(...this.props.thankYous);
    }

    let activity;
    if (requestType === 'Requests') {
      activity = collection.filter((obj) => obj.donor_id === null);
    } else if (requestType === 'Received') {
      activity = collection.filter((obj) => obj.donor_id !== null);
    } else if (requestType === 'Thank Yous') {
      activity = collection.filter((obj) => obj.type === 'thankYou');
    } else if (requestType === 'All') {
      activity = collection;
    }

    let display;
    if (this.state.refreshing || this.state.dataSource === null) {
      display = <SpinningPizza />;
    } else if (this.props.activity.length === 0) {
      display = <Text>No activity recorded</Text>;
    } else if (this.state.dataSource._cachedRowCount === 0) {
      display = <Text style={{ textAlign: 'center', marginTop: 10 }}>Nothing to show right now!</Text>;
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
    // flex: 8,
  },
  listViewContainer: {
    // flex: 1,
  },
});
