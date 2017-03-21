import { Actions } from 'react-native-router-flux';
import {
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  TOGGLE_SCOPE,
  SHOW_ENTRIES,
  TOGGLE_SIDE_MENU,
  REDIRECT,
  UPDATE_USER_HISTORY_ENTRIES,
  UPDATE_TOTAL_DONATED_PIZZAS,
  DELETE_REQUEST,
  DELETE_THANK_YOU,
  MODIFY_ENTRY,
  ADD_REPORTED_REQUEST,
  ADD_REPORTED_THANK_YOU,
} from './types';

// confirmDonation is invoked when a user commits to donating to a request
export const confirmDonation = (donatorId, entry) => {
  return (dispatch) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entry.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ userID: donatorId })
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errorMessage) {
        alert(responseJson.errorMessage);
      } else {
        const { anonEmail } = responseJson.request;
        dispatch({ type: MODIFY_ENTRY, payload: responseJson.request });
        dispatch({
          type: REDIRECT,
          payload: {
            scene: 'InstructionsScene',
            parameter: {
              recipientEmail: anonEmail,
              entry: responseJson.request,
            }
          }
        });
      }
    })
    .catch(error => console.error(error));
  };
};

export const confirmDelete = (entryId) => {
  return (dispatch) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entryId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(() => {
      dispatch({ type: DELETE_REQUEST, payload: entryId });
      Actions.MainScene({ type: 'reset' });
    })
    .catch(err => alert(err));
  };
};

export const getEntries = (userID = null) => {
  return (dispatch) => {
    dispatch({ type: GET_ENTRIES });
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET',
    })
    .then(data => data.json())
    .then(entries => {
      dispatch({ type: GET_ENTRIES_SUCCESS, payload: entries });
      dispatch({ type: UPDATE_TOTAL_DONATED_PIZZAS, payload: entries.totalDonatedPizzas });
      if (userID) {
        dispatch({ type: GET_USER_ENTRIES, payload: userID });
      }
    })
    .catch(err => console.error(err));
  };
};

export const getUserHistory = (userID) => {
  return (dispatch) => {
    dispatch({ type: GET_ENTRIES });
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/anon/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET'
    })
    .then(data => data.json())
    .then(entries => {
      dispatch({ type: UPDATE_USER_HISTORY_ENTRIES, payload: entries });
    })
    .catch(error => console.error(error));
  };
};

export const reportVideo = (userID, entry) => {
  return (dispatch) => {
    let url;
    if (entry.type === 'thankYou') {
      url = `https://d1dpbg9jbgrqy5.cloudfront.net/thank_you/${entry.id}`;
      dispatch({ type: DELETE_THANK_YOU, payload: entry.id });
      dispatch({ type: ADD_REPORTED_THANK_YOU, payload: entry.id });
    } else {
      url = `https://d1dpbg9jbgrqy5.cloudfront.net/requests/${entry.id}`;
      dispatch({ type: DELETE_REQUEST, payload: entry.id });
      dispatch({ type: ADD_REPORTED_REQUEST, payload: entry.id });
    }
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ userID, reportVideo: true })
    })
    .then(response => {
      if (response.status === 200) {
        Actions.MainScene();
        alert('Video successfully reported');
      } else {
        alert('Something went wrong...');
      }
    })
    .catch(err => alert(err));
  };
};

export const sideMenuToggle = (isMenuOpen) => {
  if (isMenuOpen) {
    return {
      type: TOGGLE_SIDE_MENU,
      payload: false
    };
  }
  return {
    type: TOGGLE_SIDE_MENU,
    payload: true
  };
};

export const sortEntries = (key) => {
  return ({
    type: SHOW_ENTRIES,
    payload: key,
  });
};

export const toggleScope = (currentScope, userID = null) => {
  if (currentScope === 'global') {
    if (!userID) {
      Actions.LoginScene();
    } else {
      return (dispatch) => {
        dispatch({
          type: TOGGLE_SCOPE,
          payload: {
            scope: 'private',
            shown: 'Requests ',
          }
        });
        if (userID) {
          dispatch({
            type: GET_USER_ENTRIES,
            payload: userID
          });
        }
      };
    }
  }
  return ({
    type: TOGGLE_SCOPE,
    payload: {
      scope: 'global',
      shown: 'All'
    }
  });
};
