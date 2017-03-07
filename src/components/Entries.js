import React, { Component } from 'react';
import { View, ListView, RefreshControl, Text } from 'react-native';
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

  updateDataSource = (array = this.props.entryRows) => {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({ dataSource: ds.cloneWithRows(this._genRows(array)) });
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
          <Text style={{ position: 'absolute', marginHorizontal: 30, textAlign: 'center', paddingTop: 20 }}>
            There doesn't seem to be anything here... {'\n'}Pull down to refresh
          </Text>
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
                anonID={this.props.anonID}
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

export default Entries;
