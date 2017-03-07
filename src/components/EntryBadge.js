import React from 'react';
import { View, Text } from 'react-native';

const EntryBadge = ({ entryData, anonID }) => {
  let text;
  if (entryData.type === 'thankYou') {
    if (anonID === entryData.donorId) {
      text = 'Thanked!';
    } else {
      text = 'Thanks!';
    }
  } else if (entryData.status !== 'expired') {
    text = entryData.status;
    text = text.charAt(0).toUpperCase() + text.slice(1);
    if (entryData.status === 'active' && entryData.donorId !== null) {
      text = 'Awaiting Pizza';
    }
    if (anonID === entryData.donorId && entryData.status === 'received') {
      text = 'Donated';
    }
  }
  if (text) {
    return (
      <View style={[styles.containerStyle, (entryData.status === 'active' ? styles.activeStyle : null)]}>
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    );
  }
  return <View />;
};

const styles = {
  containerStyle: {
    maxHeight: 25,
    borderRadius: 4,
    backgroundColor: '#00cece',
    padding: 6,
    justifyContent: 'center',
  },
  textStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
  activeStyle: {
    backgroundColor: '#ce0000',
  }
};

export default EntryBadge;
