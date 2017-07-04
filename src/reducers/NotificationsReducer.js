import { Actions } from 'react-native-router-flux';
import {
  NOTIFICATIONS_REFRESHING,
  REFRESH_COMPLETE,
  EMAIL_NOT_VERIFIED,
  ACTIVE_DONATION_REMINDER,
  INCOMING_PIZZA,
  CREATE_THANK_YOU_REMINDER,
  EULA_NOT_ACCEPTED,
  AWAITING_THANK_YOUS,
  INCOMING_GRATITUDE,
  REMOVE_NOTIFICATION,
  HANDLE_USER_LOGOUT,
  REMOVED_VIDEO,
} from '../actions/types';

const INITIAL_STATE = {
  loading: false,
  userNotifications: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATIONS_REFRESHING:
      return {
        loading: true,
        userNotifications: [],
      };
    case EMAIL_NOT_VERIFIED:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 0,
            text: 'PLEASE VERIFY YOUR EMAIL',
            expandable: {
              text: `Is ${action.payload} the best place to reach you at?`,
              buttons: [
                {
                  type: 'cancel',
                  text: 'No, update',
                  action: 'verifyEmailScene',
                },
                {
                  type: 'confirm',
                  text: 'Yes it is',
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
            text: 'YOU HAVE AN OUTSTANDING DONATION',
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
                recipientEmail: action.payload.recipientEmail,
                entry: action.payload.entry,
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
            text: 'INCOMING PIZZA!',
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
              scene: 'EntryCreationScene',
              parameter: action.payload
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
            text: 'THANK YOUR DONOR!',
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
            text: 'YOUR DONATION HAS BEEN RECEIVED',
            expandable: {
              text: 'You\'ve successfully made a donation! Be on the lookout for a thank you from your recipient',
              buttons: [
                {
                  type: 'cancel',
                  text: 'Cool',
                  action: 'nothing',
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
            text: 'INCOMING GRATITUDE!',
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
              parameter: action.payload.parameter,
              origin: action.payload.origin,
            },
          },
        ],
      };
    case REMOVE_NOTIFICATION: {
      const userNotifications = [...state.userNotifications];
      userNotifications.splice(userNotifications.indexOf(action.payload), 1);
      const hasNotifications = (userNotifications.length > 0);
      return {
        ...state,
        hasNotifications,
        userNotifications
      };
    }
    case EULA_NOT_ACCEPTED:
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 6,
            text: 'PLEASE ACCEPT OUR EULA',
            expandable: {
              buttons: [
                {
                  type: 'confirm',
                  text: 'Accept',
                  action: 'acceptEula',
                }
              ]
            }
          }
        ]
      };
    case REMOVED_VIDEO: {
      const timeFormat = createdAt => {
        const year = createdAt.substring(0, 4);
        const month = createdAt.substring(5, 7);
        const day = createdAt.substring(8, 10);
        return `${month}/${day}/${year}`;
      };
      return {
        ...state,
        userNotifications: [
          ...state.userNotifications,
          {
            id: 7,
            text: 'ONE OF YOUR VIDEOS HAS BEEN REMOVED',
            expandable: {
              text: `Due to receiving a number of reports, your video uploaded on ${timeFormat(action.payload.created_at)} has been removed.`,
              buttons: [
                {
                  type: 'confirm',
                  text: 'I understand',
                  action: 'acknowledgeRemoval',
                },
              ],
            },
            redirect: {
              parameter: action.payload,
            },
          },
        ],
      };
    }
    case REFRESH_COMPLETE:
      Actions.refresh({ key: 'NotificationsScene' });
      return {
        ...state,
        loading: false,
      };
    case HANDLE_USER_LOGOUT:
      return {
        loading: false,
        userNotifications: [],
      };
    default:
      return state;
  }
};
