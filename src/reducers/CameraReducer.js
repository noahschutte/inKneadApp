import Camera from 'react-native-camera';
import {
  START_RECORDING,
  STOP_RECORDING,
  RESET_CAMERA_STATE,
  SWITCH_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
  HANDLE_VIDEO_DATA,
} from '../actions/types';

const INITIAL_STATE = {
  aspect: Camera.constants.Aspect.fill,
  mode: Camera.constants.CaptureMode.video,
  captureTarget: Camera.constants.CaptureTarget.disk,
  type: Camera.constants.Type.front,
  orientation: Camera.constants.Orientation.portrait,
  flashMode: Camera.constants.FlashMode.off,
  torchMode: Camera.constants.TorchMode.off,
  captureQuality: Camera.constants.CaptureQuality.medium,
  isRecording: false,
  videoData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_CAMERA_STATE:
      return {
        ...state,
        type: Camera.constants.Type.front,
        flashMode: Camera.constants.FlashMode.off,
        torchMode: Camera.constants.TorchMode.off,
        isRecording: false,
      };
    case START_RECORDING:
      return {
        ...state,
        isRecording: true,
      };
    case STOP_RECORDING:
      return {
        ...state,
        isRecording: false,
      };
    case SWITCH_CAMERA_TYPE:
      return {
        ...state,
        type: action.payload,
      };
    case CHANGE_FLASH_MODE:
      return {
        ...state,
        flashMode: action.payload
      };
    case HANDLE_VIDEO_DATA:
      return {
        ...state,
        videoData: action.payload,
      };
    default:
      return state;
  }
};
