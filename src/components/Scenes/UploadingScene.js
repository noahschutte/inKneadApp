import React from 'react';
import { View } from 'react-native';
import PlatformText from '../PlatformText';
import SpinningPizza from '../SpinningPizza';

const UploadingScene = () => {
  return (
    <View style={styles.containerStyle}>
      <View style={styles.animationContainer}>
        <SpinningPizza />
      </View>
      <View style={styles.textWrapper}>
        <PlatformText type='bold' fontSize={24}>UPLOADING YOUR</PlatformText>
        <PlatformText type='bold' fontSize={24}>VIDEO NOW!</PlatformText>
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
};

export default UploadingScene;
