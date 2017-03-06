import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU,
  HANDLE_USER_LOGOUT,
  DELETE_ENTRY,
  UPDATE_TOTAL_DONATED_PIZZAS,
} from '../actions/types';

const INITIAL_STATE = {
  scope: 'global',
  shown: 'Requests',
  sideMenuOpen: false,
  loading: true,
  requests: [],
  thankYous: [],
  userRequests: [],
  userThankYous: [],
  userFulfilled: [],
  totalDonatedPizzas: 0,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_TOTAL_DONATED_PIZZAS:
      return {
        ...state,
        totalDonatedPizzas: action.payload,
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
      const userEntries = [
        ...state.requests.filter(request => request.creatorId === action.payload),
        ...state.thankYous.filter(thankYou => thankYou.creatorId === action.payload)
      ];
      const userRequests =
      userEntries.filter(entry => (entry.type === 'request' && entry.donorId === null));

      const userThankYous =
      userEntries.filter(entry => entry.type === 'thankYou');

      const userFulfilled =
      userEntries.filter(entry => entry.type === 'request' && entry.donorId !== null);

      return {
        ...state,
        userRequests,
        userThankYous,
        userFulfilled,
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
        shown: 'Requests',
      };
    default:
      return state;
  }
};
