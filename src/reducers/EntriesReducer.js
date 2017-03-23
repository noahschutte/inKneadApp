import {
  DELETE_REQUEST,
  DELETE_THANK_YOU,
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  HANDLE_USER_LOGOUT,
  MODIFY_ENTRY,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU,
  UPDATE_TOTAL_DONATED_PIZZAS,
  UPDATE_USER_HISTORY_ENTRIES,
} from '../actions/types';

const INITIAL_STATE = {
  reportedVideos: {
    requests: [],
    thankYous: [],
  },
  loading: true,
  requests: [],
  scope: 'global',
  shown: 'All',
  sideMenuOpen: false,
  thankYous: [],
  totalDonatedPizzas: 0,
  userCreatedRequests: [],
  userCreatedThankYous: [],
  userDonatedRequests: [],
  userDonatedThankYous: [],
  userHistoryEntries: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_REQUEST: {
      const requests = [...state.requests.filter(request => request.id !== action.payload)];
      return {
        ...state,
        requests,
      };
    }
    case DELETE_THANK_YOU: {
      const thankYous = [...state.thankYous.filter(request => request.id !== action.payload)];
      return {
        ...state,
        thankYous,
      };
    }
    case GET_ENTRIES:
      return {
        ...state,
        loading: true,
      };
    case GET_ENTRIES_SUCCESS:
      return {
        ...state,
        requests: action.payload.requests,
        thankYous: action.payload.thankYous,
        loading: false,
      };
    case GET_USER_ENTRIES: {
      const userCreatedRequests = [...state.requests.filter(request => request.creatorId === action.payload)];
      const userDonatedRequests = [...state.requests.filter(request => request.donorId === action.payload)];
      const userCreatedThankYous = [...state.thankYous.filter(thankYou => thankYou.creatorId === action.payload)];
      const userDonatedThankYous = [...state.thankYous.filter(thankYou => thankYou.donorId === action.payload)];
      return {
        ...state,
        userCreatedRequests,
        userDonatedRequests,
        userCreatedThankYous,
        userDonatedThankYous,
      };
    }
    case HANDLE_USER_LOGOUT:
      return {
        ...state,
        scope: 'global',
        shown: 'All',
      };
    case MODIFY_ENTRY: {
        const newEntry = action.payload;
        const requests = [...state.requests.filter(request => request.id !== newEntry.id)];
        requests.push(newEntry);
        return {
          ...state,
          requests,
        };
    }
    case SHOW_ENTRIES:
      return {
        ...state,
        shown: action.payload,
      };
    case TOGGLE_SCOPE:
      return {
        ...state,
        scope: action.payload.scope,
        shown: action.payload.shown
      };
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
         sideMenuOpen: action.payload
      };
    case UPDATE_TOTAL_DONATED_PIZZAS:
      return {
        ...state,
        totalDonatedPizzas: action.payload,
      };
    case UPDATE_USER_HISTORY_ENTRIES:
      return {
        ...state,
        userHistoryEntries: [
          ...action.payload.anonRequests,
          ...action.payload.anonThankYous,
        ],
        loading: false,
      };
    default:
      return state;
  }
};
