import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const SortButton = (props) => {
  const { children, onPress, shown } = props;
  const press = () => onPress(children);
  const buttonStyle = () => {
    if (shown) {
      return styles.shownSortButton;
    }
    return styles.sortButtonStyle;
  };

  return (
    <TouchableOpacity
      style={buttonStyle()}
      onPress={press}
      activeOpacity={0.7}
    >
      <Text style={styles.sortButtonText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  sortButtonStyle: {
    backgroundColor: '#caecf4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shownSortButton: {
    backgroundColor: '#48beda',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
    textAlign: 'center',
  },
};

export default SortButton;
