import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class ProfileButton extends Component {
  onProfilePress() {
    this.props.navigator.push({ name: 'userProfile' });
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onProfilePress.bind(this)}>
          <Image
            style={styles.profileButton}
            source={require('../../assets/profile.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileButton: {
    height: 40,
    width: 30,
  },
});
