import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import { clearUploadProgress } from '../../actions';
import Button from '../Button2';

const UploadCompleteScene = ({ clearUploadProgress }) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.textStyle}>Upload Complete! {'\n'}Please give the video some time to be processed</Text>
      <View style={{ margin: 15, padding: 15 }}>
        <Button buttonType='confirm' textStyle={{ marginHorizontal: 10, fontWeight: 'bold', }} touchableOpacity onPress={clearUploadProgress}>Okay!</Button>
      </View>
    </View>
  );
};

const styles = {
  textStyle: {
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif',
    fontSize: 24,
    fontWeight: 'bold',
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
