import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default class MenuButton extends Component {
  onMenuButtonPress() {
    this.props.toggleMenu(true);
  }
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onMenuButtonPress.bind(this)}>
          <Image
            style={styles.menuButton}
            source={require('../../assets/menuButton.png')}
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
  menuButton: {
    height: 30,
    width: 30,
  },
});
