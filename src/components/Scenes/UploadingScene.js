import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import SpinningPizza from '../SpinningPizza';

const UploadingScene = ({ uploading }) => {
  if (uploading === true) {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.animationContainer}>
          <SpinningPizza />
        </View>
        <Text style={styles.textStyle}>Uploading your video now...</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>
        Video successfully uploaded!
      </Text>
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

const mapStateToProps = ({ newEntry }) => {
  const { uploading } = newEntry;
  return { uploading };
};

export default connect(mapStateToProps, {})(UploadingScene);
