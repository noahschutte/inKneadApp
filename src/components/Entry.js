import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import EntryBadge from './EntryBadge';
import TimeAgo from './TimeAgo';
import RequestPizzas from './RequestPizzas';

const Entry = ({ userEntry, selectedRequest, origin, anonID }) => {
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

      <EntryBadge
        anonID={anonID}
        entryData={selectedRequest}
        style={styles.badgeStyle}
      />

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
    alignItems: 'center',
    marginBottom: 3,
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    padding: 5,
  },
  userEntry: {
    backgroundColor: '#ceabab',
  },
  badgeStyle: {
    alignItems: 'center',
    flex: 3,
  },
  thumbnailContainer: {
    flex: 3,
  },
  infoContainer: {
    flex: 3,
    alignItems: 'flex-end'
  },
  timeContainer: {
    flex: 1,
  },
  thumbnail: {
    flex: 1,
    width: 50,
    resizeMode: 'contain',
  },
};

export default Entry;
