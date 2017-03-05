import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LoginContainer from './LoginContainer';

export default class GuestView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image style={styles.image} source={require('../../assets/pizza-icon/pizza-icon.png')} />
          <Text style={styles.title}>
            in knead
          </Text>
          <Text style={styles.text}>
            "The power of kindness, one pizza at a time."
          </Text>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>
            Please log in:
          </Text>
          <LoginContainer
            onUserChange={this.props.onUserChange}
            navigator={this.props.navigator}
            {...this.props}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 9,
    justifyContent: 'center',
    backgroundColor: '#ce0000',
  },
  top: {
    flex: 3,
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    height: 205,
    width: 200,
    borderRadius: 100 / 2,
  },
  title: {
    marginVertical: 20,
    fontSize: 55,
    color: 'white',
    fontFamily: 'Gillsans'
  },
  text: {
    marginBottom: 30,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Gillsans',
  },
});
