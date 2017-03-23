import {
  ADD_REPORTED_REQUEST,
  ADD_REPORTED_THANK_YOU,
  BLOCK_USER,
  CREATE_SESSION_SUCCESS,
  HANDLE_USER_LOGOUT,
  USER_VERIFIED,
  UPDATE_EMAIL,
} from '../actions/types';

const INITIAL_STATE = {
  userID: null,
  currentEmail: null,
  signupEmail: null,
  fb_userID: null,
  userVerified: false,
  blockedUsers: [],
  blockedVideos: {
    thankYous: [],
    requests: [],
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_REPORTED_REQUEST:
      return {
        ...state,
        blockedVideos: {
          thankYous: state.blockedVideos.thankYous,
          requests: [
            ...state.blockedVideos.requests,
            action.payload
          ]
        }
      };
    case ADD_REPORTED_THANK_YOU:
      return {
        ...state,
        blockedVideos: {
          requests: state.blockedVideos.requests,
          thankYous: [
            ...state.blockedVideos.thankYous,
            action.payload
          ]
        }
      };
    case BLOCK_USER:
      return {
        ...state,
        blockedUsers: [
          ...state.blockedUsers,
          action.payload,
        ],
      };
    case CREATE_SESSION_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        userID: user.id,
        currentEmail: user.current_email,
        signupEmail: user.signup_email,
        fb_userID: user.fb_userID,
        blockedUsers: user.blocked,
        blockedVideos: {
          thankYous: user.reported_thank_yous,
          requests: user.reported_requests,
        }
      };
    }
    case HANDLE_USER_LOGOUT:
      return INITIAL_STATE;
    case UPDATE_EMAIL:
      return {
        ...state,
        currentEmail: action.payload,
      };
    case USER_VERIFIED:
      return {
        ...state,
        userVerified: true,
      };
    default:
      return state;
  }
};
