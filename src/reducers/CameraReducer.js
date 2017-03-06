import { constants } from 'react-native-camera';
import {
  START_RECORDING,
  STOP_RECORDING,
  RESET_CAMERA_STATE,
  SWITCH_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
  HANDLE_VIDEO_DATA,
} from '../actions/types';

const INITIAL_STATE = {
  aspect: constants.Aspect.fill,
  mode: constants.CaptureMode.video,
  captureTarget: constants.CaptureTarget.disk,
  type: constants.Type.front,
  orientation: constants.Orientation.portrait,
  flashMode: constants.FlashMode.off,
  torchMode: constants.TorchMode.off,
  captureQuality: constants.CaptureQuality.medium,
  isRecording: false,
  videoData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case RESET_CAMERA_STATE:
      return {
        ...state,
        type: constants.Type.front,
        flashMode: constants.FlashMode.off,
        torchMode: constants.TorchMode.off,
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
