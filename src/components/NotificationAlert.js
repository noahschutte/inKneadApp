import React from 'react';
import { View, Text } from 'react-native';

const NotificationAlert = () => {
  return (
    <View style={styles.notificationAlertStyle}>
      <Text style={styles.textStyle}>!</Text>
    </View>
  );
};

const styles = {
  notificationAlertStyle: {
    width: 25,
    height: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#ce0000',
    alignSelf: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gillsans',
  },
};

export default NotificationAlert;
