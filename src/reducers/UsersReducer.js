import {
  CREATE_SESSION_SUCCESS,
  USER_VERIFIED,
  UPDATE_EMAIL,
  HANDLE_USER_LOGOUT,
} from '../actions/types';

const INITIAL_STATE = {
  userID: null,
  currentEmail: null,
  signupEmail: null,
  fb_userID: null,
  userVerified: false,
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
    case HANDLE_USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
