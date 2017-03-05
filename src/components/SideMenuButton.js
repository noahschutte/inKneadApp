import React from 'react';
import { TouchableHighlight } from 'react-native';

const SideMenuButton = (props) => {
  const { children, onPress } = props;
  return (
    <TouchableHighlight onPress={onPress} style={styles.container}>
      {children}
    </TouchableHighlight>
  );
};

const styles = {
  container: {
    alignSelf: 'stretch',
  },
};

export default SideMenuButton;
