import React from 'react';
import { TouchableHighlight, View } from 'react-native';

const SideMenuButton = (props) => {
  const { children, onPress } = props;
  return (
    <TouchableHighlight onPress={onPress} style={styles.container}>
      <View>
        {children}
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
};

export default SideMenuButton;
