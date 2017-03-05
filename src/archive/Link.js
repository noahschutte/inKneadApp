import React, { Component } from 'react';
import React, { Component } from 'react';
import { Linking, View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Link extends Component {
  propTypes: {
    url: React.PropTypes.string,
  };
  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log(`Don't know how to open URI: ${this.props.url}`);
      }
    });
  };
  render() {
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={this.handleClick}
      >
        <View style={styles.button}>
          <Text style={styles.text}>
            Open {this.props.url}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 30,
  },
  button: {
    padding: 10,
    backgroundColor: '#3B5998',
    marginBottom: 10,
  },
  text: {
    color: 'white',
  },
});
