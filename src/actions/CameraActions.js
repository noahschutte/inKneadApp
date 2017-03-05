import {
  START_RECORDING,
  STOP_RECORDING,
  RESET_CAMERA_STATE,
  SWITCH_CAMERA_TYPE,
  CHANGE_FLASH_MODE,
  HANDLE_VIDEO_DATA,
} from './types';

export const resetCameraState = () => {
  return {
    type: RESET_CAMERA_STATE,
  };
};

export const startRecording = () => {
  return {
    type: START_RECORDING,
  };
};

export const stopRecording = () => {
  return {
    type: STOP_RECORDING,
  };
};

export const switchCameraType = (newType) => {
  return {
    type: SWITCH_CAMERA_TYPE,
    payload: newType
  };
};

export const changeFlashMode = (flashMode) => {
  return {
    type: CHANGE_FLASH_MODE,
    payload: flashMode,
  };
};

export const handleVideoData = (videoData) => {
  return {
    type: HANDLE_VIDEO_DATA,
    payload: videoData
  };
};
