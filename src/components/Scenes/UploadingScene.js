import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { clearUploadProgress } from '../../actions';
import Button from '../Button2';
import SpinningPizza from '../SpinningPizza';

class UploadingScene extends Component {
  render() {
    let content = (
      <View style={styles.containerStyle}>
        <View style={styles.animationContainer}>
          <SpinningPizza />
        </View>
        <Text style={styles.textStyle}>Uploading your video now...</Text>
      </View>
    );
    if (this.props.uploading === 'complete') {
      content = (
        <View style={styles.containerStyle}>
          <View>
            <Text style={{ textAlign: 'center' }}>Upload Complete!</Text>
            <Text style={{ textAlign: 'center' }}>Give the video some time to be processed</Text>
          </View>
          <View style={{ margin: 15, padding: 15 }}>
            <Button textStyle={{ marginHorizontal: 10 }} touchableOpacity onPress={this.props.clearUploadProgress}>Okay!</Button>
          </View>
        </View>
      );
    }
    return content;
  }
}

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

export default connect(mapStateToProps, { clearUploadProgress })(UploadingScene);
