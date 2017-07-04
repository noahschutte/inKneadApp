import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Button from './Button2';

const Notification = ({ children, onPress }) => {
  return (
    <View>
      <Button buttonStyle={styles.buttonStyle} touchableOpacity onPress={onPress}>
        {children}
      </Button>
      <View style={{ borderWidth: 1, borderColor: '#000' }} />
    </View>
  );
};

const styles = {
  buttonStyle: {
    // flex: 1,
    borderColor: '#000',
    borderWidth: 0,
  },
};

export default Notification;
