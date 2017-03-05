import { REDIRECT, TOGGLE_SIDE_MENU, CLOSE_SIDE_MENU } from './types';

export const redirectTo = (redirect) => {
  const { scene, parameter } = redirect;
  return {
    type: REDIRECT,
    payload: { scene, parameter },
  };
};

export const toggleSideMenu = isOpen => {
  return {
    type: TOGGLE_SIDE_MENU,
    payload: !isOpen,
  };
};

export const closeSideMenu = () => {
  return {
    type: CLOSE_SIDE_MENU,
    payload: false,
  };
};
