import React from 'react';
import { View } from 'react-native';
import SortButton from './SortButton';

const SortBar = ({ shown, options, onPress }) => {
  return (
    <View style={styles.sortBarStyle}>
      {options.map(option => {
        return (
          <SortButton
            key={option}
            onPress={onPress}
            shown={option === shown}
          >
            {option}
          </SortButton>
        );
      })}
    </View>
  );
};

const styles = {
  sortBarStyle: {
    flex: 0.5,
    flexDirection: 'row',
  }
};

export default SortBar;
