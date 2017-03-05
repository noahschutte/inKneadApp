import {
  NOTIFICATIONS_REFRESHING,
  REFRESH_COMPLETE,
  EMAIL_NOT_VERIFIED,
  ACTIVE_DONATION_REMINDER,
  INCOMING_PIZZA,
  CREATE_THANK_YOU_REMINDER,
  AWAITING_THANK_YOUS,
  INCOMING_GRATITUDE,
  HANDLE_USER_LOGOUT,
} from '../actions/types';

const INITIAL_STATE = {
  refreshing: false,
  userNotifications: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REFRESHING:
      return {
        refreshing: true,
        userNotifications: [],
      };
    case EMAIL_NOT_VERIFIED:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 0,
            text: 'Please verify your email',
            expandable: {
              text: 'Gift cards are sent to you by email, it\'s import that yours is up to date!',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Not Now',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'Verify',
                  action: 'verifyEmail',
                }
              ]
            },
            redirect: {
              scene: 'EmailVerifyScene',
            },
          },
        ],
      };
    case ACTIVE_DONATION_REMINDER:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 1,
            text: 'You have an outstanding donation',
            expandable: {
              text: 'Once your recipient acknowledges the donation, they\'ll send you a thank you video!',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Close',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'Instructions',
                  action: 'completeDonation',
                }
              ]
            },
            redirect: {
              scene: 'InstructionsScene',
              parameter: {
                recipientEmail: action.payload.anonEmail,
                entry: action.payload,
              },
            },
          },
        ]
      };
    case INCOMING_PIZZA:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 2,
            text: 'Incoming Pizza!',
            expandable: {
              text: 'Someone has donated to a recent request of yours, watch for a gift card to arrive in your email!',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Not yet...',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'Got it!',
                  action: 'confirmDonation',
                },
              ],
            },
            redirect: {
              userID: action.payload.userID,
              requestID: action.payload.requestID,
            },
          },
        ],
      };
    case CREATE_THANK_YOU_REMINDER:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 3,
            text: 'Thank your donor!',
            expandable: {
              text: 'Reward the community by letting them see the impact of their good will',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Not yet',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'Okay!',
                  action: 'createThankYou',
                },
              ],
            },
            redirect: {
              scene: 'EntryCreationScene',
              parameter: {
                createThankYou: true,
                entry: action.payload,
              },
            },
          },
        ],
      };
    case AWAITING_THANK_YOUS:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 4,
            text: 'Your donation has been received',
            expandable: {
              text: 'You\'ve successfully made a donation! Be on the lookout for a thank you from your recipient',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Cool',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'Clear',
                  action: 'clear',
                },
              ],
            },
          },
        ],
      };
    case INCOMING_GRATITUDE:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 5,
            text: 'Incoming Gratitude!',
            expandable: {
              text: 'Someone you donated pizza to wants to send you some thanks!',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Later',
                  action: 'nothing',
                },
                {
                  type: 'confirm',
                  text: 'View now!',
                  action: 'viewThankYou',
                },
              ],
            },
            redirect: {
              scene: 'EntryScene',
              parameter: action.payload,
            },
          },
        ],
      };
    case REFRESH_COMPLETE:
      return {
        ...state,
        refreshing: false,
      };
    case HANDLE_USER_LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
