import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image } from 'react-native';

export default class Menu extends Component {
  onMainButtonPress() {
    this.props.toggleMenu(false);
  }
  onNotificationsPress() {
    this.props.navigator.push({ name: 'notifications' });
    this.props.toggleMenu(false);
  }
  onHowToButtonPress() {
    this.props.navigator.push({ name: 'howTo' });
    this.props.toggleMenu(false);
  }
  onProfileButtonPress() {
    this.props.navigator.push({ name: 'profile' });
    this.props.toggleMenu(false);
  }
  render() {
    return (
      <View style={styles.container}>

        <Image
          source={require('../../assets/profile.png')}
          style={styles.image}
        />

        <TouchableHighlight
onPress={this.onMainButtonPress.bind(this)}
        style={styles.button}
        >
          <Text style={styles.instructions}>
            Requests
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
onPress={this.onNotificationsPress.bind(this)}
        style={styles.button}
        >
          <Text style={styles.instructions}>
            Notifications
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onHowToButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.instructions}>
            How-To
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.onProfileButtonPress.bind(this)} style={styles.button}>
          <Text style={styles.instructions}>
            Profile
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

{ /* <TouchableHighlight onPress={this.onHistoryButtonPress.bind(this)}
style={styles.button}>
  <Text style={styles.instructions}>
    History
  </Text>
</TouchableHighlight> */ }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 100,
  },
  button: {
    alignSelf: 'stretch',
  },
  instructions: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gillsans',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
  }
});
