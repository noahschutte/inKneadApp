import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Video from './Video';

export default class Entry extends Component {
  handleInstructions() {
    this.props.navigator.push({ name: 'instructions' });
  }
  showEntry() {
    const entry = this.props.selectedEntry;
    this.props.collectEntry(entry);
    this.props.navigator.push({ name: 'entryShow' });
  }

  render() {
    const request = this.props.selectedEntry;

    let action;
    // if the user is the same as the request's creator
    if (request.creator_id === this.props.anonID) {
      action = 'requested';
    } else if (request.donor_id === this.props.anonID) {
      action = 'donated';
    }

    let requestText;
    if (request.pizzas > 1) {
      requestText =
        (<Text style={styles.request}>
          {request.pizzas} pizzas from {request.vendor}
        </Text>);
    } else {
      requestText =
        (<Text style={styles.request}>
          {request.pizzas} pizza from {request.vendor}
        </Text>);
    }

    let timeAgo;
    let displayTime;
    const minutes = Math.round(request.seconds / 60);
    if (minutes === 1) {
      timeAgo = minutes;
      displayTime = `${timeAgo} minute ago`;
    } else if (minutes < 60) {
      timeAgo = minutes;
      displayTime = `${timeAgo} minutes ago`;
    } else if (Math.round(minutes / 60) === 1) {
      timeAgo = Math.round(minutes / 60);
      displayTime = `${timeAgo} hour ago`;
    } else if (Math.round(minutes / 60) < 24) {
      timeAgo = Math.round(minutes / 60);
      displayTime = `${timeAgo} hours ago`;
    } else if (Math.round(minutes / 1440) === 1) {
      timeAgo = Math.round(minutes / 1440);
      displayTime = `${timeAgo} day ago`;
    } else {
      timeAgo = Math.round(minutes / 1440);
      displayTime = `${timeAgo} days ago`;
    }
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showEntry.bind(this)} style={styles.wrapper}>
          <View style={styles.videoContainer}>
            <Video anonEntry {...this.props} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.header}>
              <Text style={styles.anon}>
                Anon {action}
              </Text>
                {requestText}
              <Text style={styles.dateTime}>
                {displayTime}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
  },
  videoContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 1,
  },
  header: {
    justifyContent: 'center',
  },
  anon: {
    flex: 1,
    textAlign: 'center',
    color: '#ce0000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  dateTime: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },
  request: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
