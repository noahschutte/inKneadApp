import React from 'react';
import { View, Image } from 'react-native';
import { connect } from 'react-redux';
import { clearUploadProgress } from '../../actions';
import { flyingPizza } from '../../assets';
import PlatformText from '../PlatformText';
import Button from '../Button2';

const UploadCompleteScene = ({ clearUploadProgress }) => {
  return (
    <View style={styles.containerStyle}>
      <PlatformText type='demi-bold' textStyle={styles.uploadComplete}>Upload Complete!</PlatformText>
      <Image source={flyingPizza} />
      <PlatformText type='demi-bold' textStyle={styles.mainText}>It will take a second for your request to be processed.</PlatformText>
      <View style={{ margin: 15, padding: 15 }}>
        <Button buttonType='confirm' textStyle={{ marginHorizontal: 10, fontWeight: 'bold', }} touchableOpacity onPress={clearUploadProgress}>Okay!</Button>
      </View>
    </View>
  );
};

const styles = {
  uploadComplete: {
    fontSize: 30,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  mainText: {
    fontSize: 24,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
};

export default connect(null, { clearUploadProgress })(UploadCompleteScene);
