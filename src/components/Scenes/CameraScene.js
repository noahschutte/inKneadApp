import React, { Component } from 'react';
import { View, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import Camera from 'react-native-camera';
import {
  startRecording,
  stopRecording,
  switchCameraType,
  changeFlashMode,
  handleVideoData
} from '../../actions';
import {
  leftCaretImage,
  cameraSceneCamcorder,
  cameraSceneStopImage,
  cameraFrontIcon,
  cameraBackIcon,
  cameraFlashOn,
  cameraFlashOff,
  cameraFlashAuto,
} from '../../assets';


class CameraScene extends Component {
  camera = null;

  beginRecording = () => {
    const { handleVideoData, startRecording } = this.props;
    if (this.camera) {
      this.camera.capture({ mode: Camera.constants.CaptureMode.video })
      .then(data => {
        if (data.duration > 20.0) {
          alert('Video length must be less than 20 seconds.');
        } else if (data.duration < 5.0) {
          alert('Video length must be longer than 5 seconds');
        } else {
          handleVideoData(data);
        }
      })
      .catch(err => console.error(err));
      startRecording();
    }
  }

  endRecording = () => {
    if (this.camera) {
      this.camera.stopCapture();
      this.props.stopRecording();
      Actions.pop();
    }
  }

  switchType = () => {
    let newType;
    const { back, front } = Camera.constants.Type;
    if (this.props.camera.type === back) {
      newType = front;
    } else if (this.props.camera.type === front) {
      newType = back;
    }
    this.props.switchCameraType(newType);
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.props.camera.type === back) {
      icon = cameraBackIcon;
    } else if (this.props.camera.type === front) {
      icon = cameraFrontIcon;
    }
    return icon;
  }

  switchFlash = () => {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.FlashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.FlashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.FlashMode === off) {
      newFlashMode = auto;
    }
    this.props.changeFlashMode(newFlashMode);
  }

  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.props.camera.flashMode === auto) {
      icon = cameraFlashAuto;
    } else if (this.props.camera.flashMode === on) {
      icon = cameraFlashOn;
    } else if (this.props.camera.flashMode === off) {
      icon = cameraFlashOff;
    }
    return icon;
  }

  cancelRecording = () => {
    Actions.pop();
  }

  render() {
    const {
      aspect,
      captureTarget,
      type,
      flashMode,
      isRecording,
    } = this.props.camera;

    let showRecordButton;
    if (!isRecording) {
      showRecordButton = (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={this.beginRecording}
        >
          <Image source={cameraSceneCamcorder} />
        </TouchableOpacity>
      );
    } else {
      showRecordButton = (
        <TouchableOpacity
          style={styles.captureButton}
          onPress={this.endRecording}
        >
          <Image source={cameraSceneStopImage} />
        </TouchableOpacity>
      );
    }

    let typeDisplay;
    if (!isRecording) {
      typeDisplay = (
        <TouchableOpacity
          style={styles.typeButton}
          onPress={this.switchType}
        >
          <Image source={this.typeIcon} />
        </TouchableOpacity>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor='#ce0000' />
        <Camera
          captureAudio
          ref={cam => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={aspect}
          captureTarget={captureTarget}
          type={type}
          flashMode={flashMode}
          defaultTouchToFocusComponent
          defaultOnFocus
          mirrorImage
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={Actions.pop}
          >
            <Image source={leftCaretImage} />
          </TouchableOpacity>
          {typeDisplay}
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonSpace}>
            {showRecordButton}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    // backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  }
};

const mapStateToProps = (state) => {
  const camera = state.camera;
  return { camera };
};

export default connect(mapStateToProps, {
  startRecording,
  stopRecording,
  switchCameraType,
  changeFlashMode,
  handleVideoData
})(CameraScene);
