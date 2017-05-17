import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ScopeButton = ({ scope, onPress }) => {
  const isGlobal = scope === 'global';
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isGlobal ? null : onPress} style={isGlobal ? styles.activeButtonStyle : styles.buttonStyle}>
        <Icon name='globe' style={isGlobal ? styles.activeIconStyle : styles.iconStyle} />
      </TouchableOpacity>
      <TouchableOpacity onPress={isGlobal ? onPress : null} style={isGlobal ? styles.buttonStyle : styles.activeButtonStyle}>
        <Icon name='user-circle-o' style={isGlobal ? styles.iconStyle : styles.activeIconStyle} />
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  container: {
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    flexDirection: 'row',
  },
  iconStyle: {
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 24,
  },
  activeIconStyle: {
    color: '#ce0000',
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 24
  },
  activeButtonStyle: {
    backgroundColor: '#fff',
  }
};

export default ScopeButton;
