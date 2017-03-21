import {
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  UPDATE_EMAIL,
  HANDLE_USER_LOGOUT,
  ADD_REPORTED_REQUEST,
  ADD_REPORTED_THANK_YOU,
} from '../actions/types';

const INITIAL_STATE = {
  userID: null,
  currentEmail: null,
  signupEmail: null,
  fb_userID: null,
  userVerified: false,
  reportedVideos: {
    thankYous: [],
    requests: [],
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_SESSION_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        userID: user.id,
        currentEmail: user.current_email,
        signupEmail: user.signup_email,
        fb_userID: user.fb_userID,
        reportedVideos: {
          thankYous: user.reported_thank_yous,
          requests: user.reported_requests,
        }
      };
    }
    case USER_VERIFIED: {
      return {
        ...state,
        userVerified: true,
      };
    }
    case UPDATE_EMAIL:
      return {
        ...state,
        currentEmail: action.payload,
      };
    case ADD_REPORTED_REQUEST:
      return {
        ...state,
        reportedVideos: {
          thankYous: state.reportedVideos.thankYous,
          requests: [
            ...state.reportedVideos.requests,
            action.payload
          ]
        }
      };
    case ADD_REPORTED_THANK_YOU:
      return {
        ...state,
        reportedVideos: {
          requests: state.reportedVideos.requests,
          thankYous: [
            ...state.reportedVideos.thankYous,
            action.payload
          ]
        }
      };
    case HANDLE_USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
