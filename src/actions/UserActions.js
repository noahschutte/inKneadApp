import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import {
  ACCEPT_EULA,
  ACTIVE_DONATION_REMINDER,
  AWAITING_THANK_YOUS,
  BLOCK_USER,
  CREATE_SESSION_SUCCESS,
  CREATE_THANK_YOU_REMINDER,
  EMAIL_NOT_VERIFIED,
  EULA_NOT_ACCEPTED,
  HANDLE_USER_LOGOUT,
  INCOMING_GRATITUDE,
  INCOMING_PIZZA,
  NOTIFICATIONS_REFRESHING,
  REMOVE_NOTIFICATION,
  REMOVED_VIDEO,
  REDIRECT,
  UPDATE_EMAIL,
  USER_VERIFIED,
} from './types';

export const acceptEULA = (userID) => {
  return dispatch => {
    fetch(`https://in-knead.herokuapp.com/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({ acceptEULA: true })
    })
    .then(() => dispatch({ type: ACCEPT_EULA }))
    .catch((err) => alert(err));
  };
};

export const blockUser = (userID, entry) => {
  return dispatch => {
    fetch(`https://in-knead.herokuapp.com/requests/${entry.id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify({
        blockUser: entry.creatorId,
        userID,
      })
    })
    .then(response => {
      if (response.status === 200) {
        dispatch({ type: BLOCK_USER, payload: entry.creatorId });
        alert('User successfully blocked');
        Actions.root();
        Actions.MainScene({ refreshEntries: true });
      } else if (response.status === 400) {
        const json = response.json();
        alert(`Something went wrong... \n ${json.errorMessage}`);
      } else {
        alert('Something went wrong...');
      }
    })
    .catch(err => alert(err));
  };
};

export const confirmDonationReceived = (successfulRequest) => {
  return dispatch => {
    const userID = successfulRequest.creator_id;
    fetch(`https://in-knead.herokuapp.com/requests/${successfulRequest.id}`, {
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

export const createSession = (userInfo, redirect = { scene: 'MainScene', parameter: 'root' }) => {
  return (dispatch) => {
    fetch('https://in-knead.herokuapp.com/users', {
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
      if (!responseJson.user.eula_accepted) {
        const acceptEula = new Promise((resolve) => {
          Alert.alert(
            'End User License Agreement',
            'By using in knead you agree to upload content that excludes potentially objectionable content, such as nudity, pornography, and profanity. \n\nRead the agreement here:\nwww.inknead.pizza',
            [
              {
                text: 'I Agree',
                onPress: () => resolve('accept'),
              },
            ],
          );
        });
        acceptEula.then((result) => {
          if (result === 'accept') {
            dispatch({ type: REDIRECT, payload: redirect });
            fetch(`https://in-knead.herokuapp.com/users/${responseJson.user.id}`, {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              method: 'PATCH',
              body: JSON.stringify({ acceptEULA: true })
            })
            .then(() => dispatch({ type: ACCEPT_EULA, payload: true }))
            .catch((err) => alert(err));
          } else if (result === 'logout') {
            const handleUserLogout = new Promise(resolve => {
              dispatch({ type: HANDLE_USER_LOGOUT });
              resolve();
            });
            handleUserLogout.then(() => {
              dispatch({ type: REDIRECT, payload: redirect });
            });
          }
        })
        .catch(() => {
        });
      } else {
        dispatch({ type: REDIRECT, payload: redirect });
      }
    })
    // .then(() => {
    //   dispatch({ type: REDIRECT, payload: redirect });
    // })
    .catch(error => console.log(error));
  };
};

export const removeNotification = (notificationID) => {
  return ({ type: REMOVE_NOTIFICATION, payload: notificationID });
};

export const retrieveNotifications = (userID) => {
  return (dispatch) => {
    fetch(`https://in-knead.herokuapp.com/users/${userID}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'GET'
    })
    .then(response => response.json())
    .then(responseJson => {
      dispatch({ type: NOTIFICATIONS_REFRESHING });
      //  Expect:
      const {
        eulaAccepted,
        currentEmail, // The user's current email. Returns null if email has not yet been verified
        signupEmail, // The user's signup email. Used for email verify workflow.
        recentSuccessfulRequests, // An array containing a user's request that has been donated to, but not yet received
        thankYouReminders, // An array of requests the user has received but not uploaded a thankYou for
        recentDonations,  // An array of donations that have not been received
        awaitingThankYous, // An array of requests with status 'received' and no corresponding thankYou
        receivedThankYous, // An array of thankYous which the user (donor) has yet to view
        removedRequests, // An array of any of the users requests that have been removed
        removedThankYous, // An array of any of the users thank yous that have been removed
      } = responseJson;

      if (currentEmail && eulaAccepted) {
        dispatch({ type: USER_VERIFIED });
      } else {
        if (!currentEmail) {
          dispatch({ type: EMAIL_NOT_VERIFIED, payload: signupEmail });
        }
        if (!eulaAccepted) {
          dispatch({ type: EULA_NOT_ACCEPTED });
        }
      }
      if (recentDonations.length > 0) {
        for (const recentDonation of recentDonations) {
          dispatch({
            type: ACTIVE_DONATION_REMINDER,
            payload: {
              entry: recentDonation,
              recipientEmail: recentDonation.anonEmail,
            },
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
            payload: {
              parameter: receivedThankYou,
              origin: 'notifications',
            }
          });
        }
      }
      if (removedRequests.length > 0 || removedThankYous.length > 0) {
        for (const removedRequest of removedRequests) {
          dispatch({ type: REMOVED_VIDEO, payload: removedRequest });
        }
        for (const removedThankYou of removedThankYous) {
          dispatch({ type: REMOVED_VIDEO, payload: removedThankYou });
        }
      }
    })
    .catch(error => console.error(error));
  };
};

export const updateEmail = (updatedEmail, userID, redirect = null) => {
  return (dispatch) => {
    fetch(`https://in-knead.herokuapp.com/users/${userID}`, {
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
    resolve([]);
  });
  return dispatch => {
    redirectToMainScene.then((payload) => {
      dispatch({ type: HANDLE_USER_LOGOUT, payload });
      Actions.refresh({ key: 'MainScene', refreshEntries: true });
    })
    .catch(err => console.log(err));
  };
};
