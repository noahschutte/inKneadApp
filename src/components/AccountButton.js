import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AccountButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.textStyle}>{children}</Text>
      <View style={styles.angleContainer}>
        <Icon name='angle-right' style={styles.angleStyle} />
      </View>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 75,
    alignItems: 'center',
  },
  textStyle: {
    color: '#ce0000',
    fontSize: 24,
    marginLeft: 20,
  },
  angleContainer: {
    flex: 1,
  },
  angleStyle: {
    color: '#cecece',
    fontSize: 40,
    textAlign: 'right',
    marginRight: 20,
  },
};

export default AccountButton;
