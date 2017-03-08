import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU,
  HANDLE_USER_LOGOUT,
  DELETE_ENTRY,
  MODIFY_ENTRY,
  UPDATE_USER_HISTORY_ENTRIES,
  UPDATE_TOTAL_DONATED_PIZZAS,
} from '../actions/types';

const INITIAL_STATE = {
  scope: 'global',
  shown: 'All',
  sideMenuOpen: false,
  loading: true,
  requests: [],
  thankYous: [],
  userCreatedRequests: [],
  userCreatedThankYous: [],
  userDonatedRequests: [],
  userDonatedThankYous: [],
  userHistoryEntries: [],
  totalDonatedPizzas: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    case SHOW_ENTRIES:
      return {
        ...state,
        shown: action.payload,
      };
    case DELETE_ENTRY: {
      const requests = [...state.requests.filter(request => request.id !== action.payload)];
      return {
        ...state,
        requests,
      };
    }
    case MODIFY_ENTRY: {
      const newEntry = action.payload;
      const requests = [...state.requests.filter(request => request.id !== newEntry.id)];
      requests.push(newEntry);
      return {
        ...state,
        requests,
      };
    }
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
    case HANDLE_USER_LOGOUT:
      return {
        ...state,
        scope: 'global',
        shown: 'All',
      };
    default:
      return state;
  }
};
