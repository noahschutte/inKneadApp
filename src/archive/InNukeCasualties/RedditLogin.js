import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from './Button';

export default class RedditLogin extends Component {
  redditAuthorization() {
    const cliendId = 'djH1sd6Q0amUNw';
    const uri = 'inkneadscheme://response';
    const scope = 'identity';
    this.props.navigator.push({ name: 'webViewExample' });
  }
  render() {
    return (
      <View style={styles.container}>
        <Button
          text={'Log in with Reddit'}
          onPress={this.redditAuthorization.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
