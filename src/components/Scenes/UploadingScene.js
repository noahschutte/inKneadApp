import React from 'react';
import { View, Text, Platform } from 'react-native';
import SpinningPizza from '../SpinningPizza';

const UploadingScene = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.animationContainer}>
        <SpinningPizza />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.textStyle}>UPLOADING YOUR</Text>
        <Text style={styles.textStyle}>PIZZA REQUEST!</Text>
      </View>
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
  textWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Bold' : 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
  }
};

export default UploadingScene;
