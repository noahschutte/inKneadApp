import {
  UPDATE_SELECTED_PIZZAS,
  UPDATE_SELECTED_VENDOR,
  UPLOAD_BEGIN,
  UPLOAD_PROGRESS,
  UPLOAD_COMPLETE,
  HANDLE_ERRORS,
} from '../actions/types';

const INITIAL_STATE = {
  pizzas: 0,
  vendor: '',
  videoKey: '',
  uploading: false,
  uploadPercentage: 0,
  errorMessages: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_SELECTED_PIZZAS:
      return {
        ...state,
        pizzas: action.payload
      };
    case UPDATE_SELECTED_VENDOR:
      return {
        ...state,
        vendor: action.payload
      };
    case UPLOAD_BEGIN:
      return {
        ...state,
        uploading: true,
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        uploadPercentage: action.payload
      };
    case UPLOAD_COMPLETE:
      return INITIAL_STATE;
    case HANDLE_ERRORS:
      return {
        ...state,
        errorMessages: action.payload,
      };
    default:
      return state;
  }
};
