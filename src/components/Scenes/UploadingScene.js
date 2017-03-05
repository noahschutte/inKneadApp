import React from 'react';
import { View, Text } from 'react-native';
import SpinningPizza from '../SpinningPizza';

const UploadingScene = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.animationContainer}>
        <SpinningPizza />
      </View>
      <Text style={styles.textStyle}>Uploading your video now...</Text>
    </View>
  );
};

const styles = {
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    flex: 1,
  },
  textStyle: {
    flex: 2,
  }
};

export default UploadingScene;
