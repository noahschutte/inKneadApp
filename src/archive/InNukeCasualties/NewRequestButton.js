import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class NewRequestButton extends Component {
  onNewRequestPress() {
    this.props.navigator.push({ name: 'newRequest' });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onNewRequestPress.bind(this)}>
          <Image
            style={styles.newRequestButton}
            source={require('../../assets/add.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newRequestButton: {
    height: 40,
    width: 40,
  },
});
