import React from 'react';
import { View, Text } from 'react-native';

const EntryBadge = ({ entryData, anonID }) => {
  let text;
  let textColor;
  if (entryData.type === 'thankYou') {
    text = 'GRATITUDE';
    textColor = '#48beda';
  } else if (entryData.status !== 'expired') {
    text = 'IN KNEAD';
    textColor = '#ce0000';
    if (entryData.status === 'active' && entryData.donorId !== null) {
      text = 'WAITING DELIVERY';
      textColor = '#f5a623';
    }
    if (anonID === entryData.donorId && entryData.status === 'received') {
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
