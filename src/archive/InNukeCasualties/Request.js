import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TimeAgo from 'TimeAgo';
import GlobalStyles from 'InKneadStyle';

export default class Request extends Component {
  showRequest() {
    if (this.props.anonActivity) {
      const entry = this.props.selectedRequest;
      this.props.collectEntry(entry);
      this.props.navigator.push({ name: 'entryShow' });
    } else {
      this.props.collectRequest(this.props.selectedRequest);
      this.props.navigator.push({ name: 'requestShow' });
    }
  }

  render() {
    const request = this.props.selectedRequest;
    const pImageElements = [];

    for (let i = 0; i < request.pizzas; i++) {
      const pizzaImage = <Image style={GlobalStyles.pizzaImage} source={require('../../assets/pizza-icon-for-requests/whole-pizza.png')} key={i} />;
      pImageElements.push(pizzaImage);
    }

    const requestPizzas = <View style={GlobalStyles.pizzas}>{pImageElements}</View>;

    let requestText;
    if (request.received === undefined) {
      requestText = <Text>Thanks for </Text>;
    } else if (this.props.anonActivity && request.donor_id === this.props.anonID) {
      requestText = <Text>Donated </Text>;
    } else if (this.props.anonActivity && request.donor_id !== null) {
      requestText = <Text>Received </Text>;
    } else if (this.props.anonActivity && request.creator_id === this.props.anonID) {
      requestText = <Text>Requested </Text>;
    } else if (this.props.history && request.donor_id === this.props.user.id) {
      requestText = <Text>You Donated </Text>;
    } else if (this.props.history && request.creator_id === this.props.user.id && request.donor_id === null) {
      requestText = <Text>You Requested </Text>;
    } else if (this.props.history && request.creator_id === this.props.user.id && request.donor_id !== null) {
      requestText = <Text>You Received </Text>;
    } else if (request.donor_id) {
      requestText = <Text>Received </Text>;
    } else {
      requestText = <Text>Request for </Text>;
    }

    const content = this.props.selectedRequest.thumbnail;
    const thumbnail =
      (<Image
        style={styles.thumbnail}
        source={{ uri: content }}
      />);

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.showRequest.bind(this)} style={styles.wrapper}>
          <View style={styles.imageContainer}>
            {thumbnail}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.date}>
              <TimeAgo style={styles.dateTime} secondsOld={request.seconds} />
            </View>
            <View style={styles.content}>
              {requestText}
              {requestPizzas}
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
    marginTop: 2,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#BDBDBD',
    borderTopColor: '#BDBDBD',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  imageContainer: {
    flex: 1,
    margin: 2,
  },
  thumbnail: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  infoContainer: {
    flex: 1,
    margin: 5,
  },
  date: {
    alignItems: 'flex-end',
  },
  dateTime: {
    flex: 1,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  }
});
