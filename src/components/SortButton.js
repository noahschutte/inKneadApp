import React from 'react';
import { TouchableOpacity } from 'react-native';
import PlatformText from './PlatformText';

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
      <PlatformText type='bold' textStyle={styles.sortButtonText}>
        {children}
      </PlatformText>
    </TouchableOpacity>
  );
};

const styles = {
  sortButtonStyle: {
    backgroundColor: '#caecf4',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 1
  },
  shownSortButton: {
    backgroundColor: '#48beda',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  sortButtonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
};

export default SortButton;
