import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import TimeAgo from './TimeAgo';
import RequestPizzas from './RequestPizzas';

const Entry = ({ userEntry, selectedRequest, origin }) => {
  const {
    seconds,
    pizzas,
    thumbnail,
  } = selectedRequest;
  return (
    <TouchableOpacity
      onPress={() => Actions.EntryScene({ entry: selectedRequest, origin })}
      style={[styles.container, (userEntry ? styles.userEntry : null)]}
    >

      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.timeContainer}>
          <TimeAgo style={styles.time} secondsOld={seconds} />
        </View>
        <View style={styles.requestContent}>
          <RequestPizzas pizzas={pizzas} style={styles.pizzas} />
        </View>
      </View>

    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 3,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    padding: 5,
  },
  userEntry: {
    backgroundColor: '#ceabab',
  },
  thumbnailContainer: {
    flex: 3,
  },
  infoContainer: {
    flex: 7,
    alignItems: 'flex-end'
  },
  timeContainer: {
    flex: 1,
  },
  thumbnail: {
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 25,
  },
};

export default Entry;
