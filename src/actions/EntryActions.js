import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import {
  ACTIVE_DONATION_REMINDER,
  ADD_REPORTED_REQUEST,
  ADD_REPORTED_THANK_YOU,
  DELETE_REQUEST,
  DELETE_THANK_YOU,
  GET_ENTRIES,
  GET_ENTRIES_SUCCESS,
  GET_USER_ENTRIES,
  MODIFY_ENTRY,
  REDIRECT,
  SHOW_ENTRIES,
  TOGGLE_SCOPE,
  TOGGLE_SIDE_MENU,
  UPDATE_USER_HISTORY_ENTRIES,
  UPDATE_TOTAL_DONATED_PIZZAS,
} from './types';

export const confirmDelete = (entryId) => {
  return (dispatch) => {
    fetch(`https://in-knead.herokuapp.com/requests/${entryId}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: DELETE_REQUEST, payload: entryId });
      }
      return response.json();
    })
    .then((responseJson) => {
      Actions.MainScene({ type: 'reset' });
      alert(responseJson.errorMessage);
    })
    .catch(err => alert(err));
  };
};

// confirmDonation is invoked when a user commits to donating to a request
export const confirmDonation = (donatorId, entry) => {
  return (dispatch) => {
    fetch(`https://in-knead.herokuapp.com/requests/${entry.id}`, {
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
        Alert.alert(
          'Alert',
          responseJson.errorMessage,
          [
            {
              text: 'OK',
              onPress: () => Actions.MainScene({ refreshEntries: true }),
            }
          ]
        );
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
        dispatch({
          type: ACTIVE_DONATION_REMINDER,
          payload: {
            entry,
            recipientEmail: anonEmail,
          },
        });
      }
    })
    .catch(error => console.error(error));
  };
};

export const getEntries = (userID = null) => {
  return (dispatch) => {
    dispatch({ type: GET_ENTRIES });
    fetch('https://in-knead.herokuapp.com/requests', {
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
    fetch(`https://in-knead.herokuapp.com/anon/${userID}`, {
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
      url = `https://in-knead.herokuapp.com/thank_you/${entry.id}`;
      dispatch({ type: DELETE_THANK_YOU, payload: entry.id });
      dispatch({ type: ADD_REPORTED_THANK_YOU, payload: entry.id });
    } else {
      url = `https://in-knead.herokuapp.com/requests/${entry.id}`;
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
        Actions.MainScene({ refreshEntries: true });
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
