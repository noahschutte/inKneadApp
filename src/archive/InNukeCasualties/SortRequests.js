import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';

export default class SortRequests extends Component {
  render() {
    const scope = [
      'Requests',
      'Received',
      'Thank Yous',
      'All',
    ];
    return (
      <View style={styles.container}>
        <SegmentedControls
          containerBorderTint={'white'}
          containerBorderWidth={1}
          containerBorderRadius={5}
          backTint={'#ce0000'}
          tint={'white'}
          options={scope}
          onSelection={this.props.changeRequestType.bind(this)}
          selectedOption={this.props.requestType}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ce0000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
});
