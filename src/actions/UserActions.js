import { Actions } from 'react-native-router-flux';
import {
  CREATE_SESSION_SUCCESS,
  NOTIFICATIONS_REFRESHING,
  INCOMING_PIZZA,
  CREATE_THANK_YOU_REMINDER,
  AWAITING_THANK_YOUS,
  USER_VERIFIED,
  ACTIVE_DONATION_REMINDER,
  INCOMING_GRATITUDE,
  EMAIL_NOT_VERIFIED,
  REMOVE_NOTIFICATION,
  HANDLE_USER_LOGOUT,
  UPDATE_EMAIL,
  REDIRECT,
} from './types';

export const retrieveNotifications = (userID) => {
  return (dispatch) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => {
      dispatch({ type: NOTIFICATIONS_REFRESHING });
      return response.json();
    })
    .then(responseJson => {
      //  Expect:
      const {
        currentEmail, // The user's current email. Returns null if email has not yet been verified
        // userRequests, An array of requests for which the user is either the donor OR recipient
        // userThankYous, An array of thankYous for which the user is either donor OR recipient
        recentSuccessfulRequests, // An array containing a user's request that has been donated to, but not yet received
        thankYouReminders, // An array of requests the user has received but not uploaded a thankYou for
        recentDonations,  // An array of donations that have not been received
        awaitingThankYous, // An array of requests with status 'received' and no corresponding thankYou
        receivedThankYous, // An array of thankYous which the user (donor) has yet to view
      } = responseJson;

      if (currentEmail) {
        dispatch({ type: USER_VERIFIED });
      } else {
        dispatch({ type: EMAIL_NOT_VERIFIED });
      }
      if (recentDonations.length > 0) {
        for (const recentDonation of recentDonations) {
          dispatch({
            type: ACTIVE_DONATION_REMINDER,
            payload: recentDonation,
          });
        }
      }
      if (recentSuccessfulRequests.length > 0) {
        dispatch({
          type: INCOMING_PIZZA,
          payload: recentSuccessfulRequests[0]
        });
      }
      if (thankYouReminders.length > 0) {
        for (const thankYouReminder of thankYouReminders) {
          dispatch({
            type: CREATE_THANK_YOU_REMINDER,
            payload: thankYouReminder
          });
        }
      }
      if (awaitingThankYous.length > 0) {
        dispatch({ type: AWAITING_THANK_YOUS });
      }
      if (receivedThankYous.length > 0) {
        for (const receivedThankYou of receivedThankYous) {
          dispatch({
            type: INCOMING_GRATITUDE,
            payload: receivedThankYou,
            origin: 'notifications'
          });
        }
      }
    })
    .catch(error => console.error(error));
  };
};

export const removeNotification = (notificationID) => {
  return ({ type: REMOVE_NOTIFICATION, payload: notificationID });
};

export const createSession = (userInfo, redirect = { scene: 'MainScene', parameter: 'root' }) => {
  return (dispatch) => {
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/users', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ userInfo })
    })
    .then((response) => response.json())
    .then(responseJson => {
      dispatch({ type: CREATE_SESSION_SUCCESS, payload: responseJson.user });
    })
    .then(() => {
      dispatch({ type: REDIRECT, payload: redirect });
    })
    .catch(error => console.log(error));
  };
};

export const confirmDonationReceived = (successfulRequest) => {
  return dispatch => {
    const userID = successfulRequest.creator_id;
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/requests/${successfulRequest.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        userID,
        receivedDonation: true,
      })
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: CREATE_THANK_YOU_REMINDER, payload: successfulRequest });
        dispatch({ type: REMOVE_NOTIFICATION, payload: 3 });
        Actions.EntryCreationScene({ createThankYou: true, entry: successfulRequest });
      }
    })
    .catch(error => {
      console.error(error);
    });
  };
};

export const updateEmail = (updatedEmail, userID, redirect = null) => {
  return (dispatch) => {
    fetch(`https://d1dpbg9jbgrqy5.cloudfront.net/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({ updatedEmail })
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: UPDATE_EMAIL, payload: updatedEmail });
        dispatch({ type: USER_VERIFIED });
        if (!redirect) {
          dispatch({ type: REDIRECT, payload: { scene: 'ProfileScene' } });
        } else {
          dispatch({ type: REDIRECT, payload: redirect });
        }
      } else {
        return response.json();
      }
    })
    .then(responseJson => {
      if (responseJson) {
        alert(responseJson.errorMessage);
      }
    })
    .catch(error => console.error(error));
  };
};

export const userLogout = () => {
  const redirectToMainScene = new Promise((resolve) => {
    Actions.root({ type: 'reset' });
    resolve('success');
  });
  return dispatch => {
    redirectToMainScene.then(() => {
      dispatch({ type: HANDLE_USER_LOGOUT });
    })
    .catch(err => console.log(err));
  };
};
