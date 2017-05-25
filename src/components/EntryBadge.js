import React from 'react';
import { View, Text } from 'react-native';

const EntryBadge = ({ entryData, origin, anonID }) => {
  let text;
  let textColor;
  if (entryData.type === 'thankYou') {
    if (origin === 'UserHistoryScene') {
      if (entryData.donorId === anonID) {
        text = 'RECEIVED THANKS';
        textColor = '#48beda';
      } else if (entryData.creatorId === anonID) {
        text = 'SENT THANKS';
        textColor = '#48beda';
      }
    } else {
      text = 'GRATITUDE';
      textColor = '#48beda';
    }
  } else if (entryData.status !== 'expired') {
    text = 'IN KNEAD';
    textColor = '#ce0000';
    if (entryData.status === 'active' && entryData.donorId !== null) {
      if (entryData.donorId === anonID) {
        text = 'DONATION PENDING';
        textColor = '#f5a623';
      } else {
        text = 'AWAITING DELIVERY';
        textColor = '#f5a623';
      }
    } else if (entryData.donorId && entryData.status === 'received') {
      if (entryData.donorId === anonID) {
        text = 'DONATED';
        textColor = '#f5a623';
      } else if (entryData.creatorId === anonID) {
        text = 'RECEIVED';
        textColor = '#f5a623';
      }
    } else {
      text = 'DELIVERED';
      textColor = '#f5a623';
    }
  }
  if (text) {
    return (
      <View style={styles.containerStyle}>
        <Text style={[styles.textStyle, { color: textColor }]}>{text}</Text>
      </View>
    );
  }
  return <View />;
};

const styles = {
  containerStyle: {
    maxHeight: 25,
    paddingVertical: 10,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ce0000',
  },
};

export default EntryBadge;
