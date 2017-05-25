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

      <View style={styles.leftContainer}>
        <EntryBadge
          anonID={anonID}
          entryData={selectedRequest}
        />
        <RequestPizzas pizzas={pizzas} size='medium' />
      </View>

      <View style={styles.rightContainer}>
        <Image style={styles.thumbnail} source={{ uri: thumbnail }} />
        <View>
          <TimeAgo secondsOld={seconds} />
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
  // userEntry: {
  //   backgroundColor: '#ceabab',
  // },
  rightContainer: {
    flex: 1.2,
    alignItems: 'center',
    paddingVertical: 5,
  },
  leftContainer: {
    flex: 3,
    alignItems: 'flex-start'
  },
  thumbnail: {
    flex: 1,
    minWidth: 100,
    minHeight: 100,
    maxWidth: 400,
    maxHeight: 400,
    resizeMode: 'contain',
  },
};

export default Entry;
