import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text } from 'react-native';
import { connect } from 'react-redux';
import Entry from './Entry';

class Entries extends Component {
  state = {
    dataSource: null,
  };

  componentWillMount() {
    this.updateDataSource();
  }

  componentWillReceiveProps(nextProps) {
    this.updateDataSource(nextProps.entryRows);
  }

  entryNotBlocked = (entry) => {
    const { userID, blockedVideos, blockedUsers } = this.props;
    if (!userID) {
      return true;
    } else if (blockedUsers.indexOf(entry.creatorId) !== -1) {
      return false;
    } else if (entry.type === 'thankYou') {
      return blockedVideos.thankYous.indexOf(entry.id) === -1;
    }
    return blockedVideos.requests.indexOf(entry.id) === -1;
  }

  updateDataSource = (array = this.props.entryRows) => {
    const filteredArray = array.filter(this.entryNotBlocked);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(this._genRows(filteredArray)) });
  }

  _genRows(array) {
    const result = [];
    for (const index of array) {
      result.push(index);
    }
    return result.sort(this.compareEntries);
  }

  _onRefresh = () => {
    this.props.getEntries();
  }

  compareEntries = (a, b) => {
    if (a.seconds < b.seconds) {
      return -1;
    }
    if (a.seconds > b.seconds) {
      return 1;
    }
    return 0;
  }

  render() {
    const { dataSource } = this.state;
    let content;
    let refreshPrompt;

    if (dataSource === null) {
      content = (
        <View />
      );
    } else {
      /* eslint no-underscore-dangle: 0 */
      if (dataSource._cachedRowCount === 0) {
        refreshPrompt = (
          <View style={{ alignItems: 'center', marginTop: 25 }}>
            <Text style={{ fontSize: 20, color: '#555' }}>NO REQUESTS?</Text>
            <Text style={{ fontSize: 20, color: '#555' }}>PULL DOWN TO REFRESH!</Text>
          </View>
          // <Text style={{ position: 'absolute', marginHorizontal: 30, textAlign: 'center', paddingTop: 20 }}>
          //   There doesn't seem to be anything here... {'\n'}Pull down to refresh
          // </Text>
        );
      }
      content = (
        <ListView
          refreshControl={
            <RefreshControl
              refreshing={this.props.loading}
              onRefresh={this._onRefresh}
            />
          }
          dataSource={dataSource}
          renderRow={
            (rowData) => (
              <Entry
                userEntry={this.props.userID === rowData.creatorId}
                anonID={this.props.anonID}  // For determining EntryBadge wording, used to determine whether a user was sending or receiving a thank you video, donation, etc.
                origin={this.props.origin}
                selectedRequest={rowData}
              />
            )
          }
          enableEmptySections
        />
      );
    }
    return (
      <View style={{ flex: 8 }}>
        {refreshPrompt}
        {content}
      </View>
    );
  }
}

const mapStateToProps = ({ user }) => {
  const { blockedUsers, blockedVideos, userID } = user;
  return { blockedUsers, blockedVideos, userID };
};

export default connect(mapStateToProps, {})(Entries);
