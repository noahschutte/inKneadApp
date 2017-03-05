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
    backgroundColor: '#fe0000',
    flex: 1,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shownSortButton: {
    backgroundColor: '#ce0000',
    flex: 1,
    borderWidth: 1,
    borderColor: '#ce0000',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
};

export default SortButton;
