import { Actions } from 'react-native-router-flux';
import { REDIRECT, TOGGLE_SIDE_MENU, CLOSE_SIDE_MENU } from '../actions/types';

const INITIAL_STATE = {
  scene: 'MainScene',
  sideMenuOpen: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TOGGLE_SIDE_MENU:
      return {
        ...state,
        sideMenuOpen: action.payload
      };
    case CLOSE_SIDE_MENU:
      return {
        ...state,
        sideMenuOpen: action.payload
      };
    case REDIRECT: {
      const { scene, parameter } = action.payload;
      switch (scene) {
        case 'MainScene':
          if (parameter === 'root') {
            Actions.root({ type: 'reset' });
          } else {
            Actions.MainScene({ type: 'reset' });
          }
          return state;
        case 'EntryScene':
          Actions.root({ type: 'reset' });
          Actions.EntryScene({ entry: parameter });
          return state;
        case 'ProfileScene':
          Actions.root();
          Actions.ProfileScene({ type: 'reset' });
          return state;
        case 'InstructionsScene':
          Actions.InstructionsScene({
            recipientEmail: parameter.recipientEmail,
            entry: parameter.entry,
            type: 'reset',
          });
          return state;
        case 'EmailVerifyScene':
          Actions.EmailVerifyScene();
          return state;
        case 'EntryCreationScene':
          if (parameter && parameter.createThankYou) {
            Actions.EntryCreationScene({ createThankYou: true, entry: parameter.entry });
            return state;
          }
          Actions.EntryCreationScene();
          return state;
        default:
          Actions.pop();
          return state;
        }
      }
    default:
      return state;
  }
};
