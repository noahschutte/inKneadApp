import { Actions } from 'react-native-router-flux';
import {
  CLEAR_UPLOAD_PROGRESS,
  UPDATE_SELECTED_PIZZAS,
  UPDATE_SELECTED_VENDOR,
  UPLOAD_BEGIN,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  HANDLE_ERRORS,
} from './types';

export const clearUploadProgress = () => {
  Actions.MainScene({ type: 'reset' });
  return {
    type: CLEAR_UPLOAD_PROGRESS,
    payload: false,
  };
};

export const updateSelectedPizzas = (numberOfPizzas) => {
  return {
    type: UPDATE_SELECTED_PIZZAS,
    payload: numberOfPizzas,
  };
};

export const updateSelectedVendor = (selectedVendor) => {
  return {
    type: UPDATE_SELECTED_VENDOR,
    payload: selectedVendor,
  };
};

export const uploadBegin = () => {
  return {
    type: UPLOAD_BEGIN,
    payload: true,
  };
};

export const uploadProgress = (pct) => {
  return {
    type: UPLOAD_PROGRESS,
    payload: pct,
  };
};

export const uploadComplete = () => {
  return {
    type: UPLOAD_COMPLETE
  };
};

export const handleErrors = (errorMessageArray) => {
  return {
    type: HANDLE_ERRORS,
    payload: errorMessageArray,
  };
};
