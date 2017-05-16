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

      <View style={styles.infoContainer}>
        <View style={styles.requestContent}>
          <EntryBadge
            anonID={anonID}
            entryData={selectedRequest}
            style={styles.badgeStyle}
          />
          <RequestPizzas pizzas={pizzas} size='medium' />
        </View>
      </View>

      <View style={styles.thumbnailContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
        <View style={styles.timeContainer}>
          <TimeAgo style={styles.time} secondsOld={seconds} />
        </View>
      </View>

    </TouchableOpacity>
  );
};

const styles = {
  container: {
    height: 125,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
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
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  infoContainer: {
    flex: 3,
    alignItems: 'flex-start'
  },
  thumbnail: {
    flex: 1,
    width: 58,
    borderWidth: 0.5,
    resizeMode: 'contain',
  },
};

export default Entry;
