import React, { Component } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, BackAndroid } from 'react-native';

export default class BackButton extends Component {
  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      this.props.navigator.pop();
      return true;
    });
  }
  
  onBackPress() {
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={this.onBackPress.bind(this)}
        >
            <Image
              style={styles.backButton}
              source={require('../../assets/backButton.png')}
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
  backButton: {
    height: 40,
    width: 40,
  },
});
