import React from 'react';
import { Dimensions, StatusBar, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Camera from 'react-native-camera';

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fit,
        mode: Camera.constants.CaptureMode.video,
        captureTarget: Camera.constants.CaptureTarget.disk,
        type: Camera.constants.Type.front,
        orientation: Camera.constants.Orientation.portrait,
        flashMode: Camera.constants.FlashMode.off,
        torchMode: Camera.constants.TorchMode.off,
        captureQuality: Camera.constants.CaptureQuality.medium,
      },
      isRecording: false,
    };

    this.startRecording = this.startRecording.bind(this);
    this.stopRecording = this.stopRecording.bind(this);
    this.switchType = this.switchType.bind(this);
    this.switchFlash = this.switchFlash.bind(this);
  }
  startRecording() {
    if (this.camera) {
      this.camera.capture({ mode: Camera.constants.CaptureMode.video })
          .then((data) => {
            if (data.duration > 20.0) {
              this.props.onChangeNewRequestErrorMesssage('Video length must be less than 20 seconds.');
            } else if (data.duration < 5.0) {
              this.props.onChangeNewRequestErrorMesssage('Video length must be at least 5 seconds.');
            } else {
              this.props.onChangeVideoData(data);
            }
          })
          .catch(err => console.error(err));
      this.setState({
        isRecording: true
      });
    }
  }
  stopRecording() {
    if (this.camera) {
      this.camera.stopCapture();
      this.setState({
        isRecording: false
      });
      this.props.navigator.pop();
    }
  }
  switchType() {
    let newType;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      newType = front;
    } else if (this.state.camera.type === front) {
      newType = back;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        type: newType,
      },
    });
  }

  get typeIcon() {
    let icon;
    const { back, front } = Camera.constants.Type;

    if (this.state.camera.type === back) {
      icon = require('../../assets/ic_camera_rear_white.png');
    } else if (this.state.camera.type === front) {
      icon = require('../../assets/ic_camera_front_white.png');
    }

    return icon;
  }

  switchFlash() {
    let newFlashMode;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.FlashMode === auto) {
      newFlashMode = on;
    } else if (this.state.camera.FlashMode === on) {
      newFlashMode = off;
    } else if (this.state.camera.FlashMode === off) {
      newFlashMode = auto;
    }

    this.setState({
      camera: {
        ...this.state.camera,
        FlashMode: newFlashMode,
      },
    });
  }
  get flashIcon() {
    let icon;
    const { auto, on, off } = Camera.constants.FlashMode;

    if (this.state.camera.FlashMode === auto) {
      icon = require('../../assets/ic_flash_auto_white.png');
    } else if (this.state.camera.FlashMode === on) {
      icon = require('../../assets/ic_flash_on_white.png');
    } else if (this.state.camera.FlashMode === off) {
      icon = require('../../assets/ic_flash_off_white.png');
    }

    return icon;
  }
  cancelRecording() {
    this.props.navigator.pop();
  }
  render() {
    const statusBarHidden = true;

    let showRecordButton;
    if (!this.state.isRecording) {
      showRecordButton =
        (<TouchableOpacity
          style={styles.captureButton}
          onPress={this.startRecording}
        >
          <Image
            source={require('../../assets/ic_videocam_36pt.png')}
          />
        </TouchableOpacity>);
    } else {
      showRecordButton =
        (<TouchableOpacity
          style={styles.captureButton}
          onPress={this.stopRecording}
        >
          <Image
            source={require('../../assets/ic_stop_36pt.png')}
          />
        </TouchableOpacity>);
    }
    let typeDisplay;
    let flashDisplay;
    if (!this.state.isRecording) {
      typeDisplay =
        (<TouchableOpacity
          style={styles.typeButton}
          onPress={this.switchType}
        >
          <Image
            source={this.typeIcon}
          />
        </TouchableOpacity>);
      flashDisplay =
        (<TouchableOpacity
          style={styles.flashButton}
          onPress={this.switchFlash}
        >
          <Image
            source={this.flashIcon}
          />
        </TouchableOpacity>);
    }
    return (
      <View style={styles.container}>
        <StatusBar
          hidden={statusBarHidden}
        />
        <Camera
          captureAudio
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={this.state.camera.aspect}
          captureTarget={this.state.camera.captureTarget}
          type={this.state.camera.type}
          flashMode={this.state.camera.FlashMode}
          defaultTouchToFocusComponent
          defaultOnFocus
          mirrorImage
        />

        <View style={[styles.overlay, styles.topOverlay]}>
          <TouchableOpacity
            style={styles.typeButton}
            onPress={this.cancelRecording.bind(this)}
          >
            <Image
              source={require('../../assets/left_caret.png')}
            />
          </TouchableOpacity>
          {typeDisplay}
        </View>

        <View style={[styles.overlay, styles.bottomOverlay]}>
          <View style={styles.buttonsSpace} />
          {showRecordButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
});
