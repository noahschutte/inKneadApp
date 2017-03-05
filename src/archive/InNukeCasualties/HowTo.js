import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from './Swiper';
import Nav from './Nav';

export default class HowTo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Nav backButton {...this.props} />
        <View style={styles.wrapper}>
          <Swiper {...this.props} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
  },
});
