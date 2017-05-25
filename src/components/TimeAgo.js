import React from 'react';
import PlatformText from './PlatformText';

const TimeAgo = ({ secondsOld }) => {
  let time;
  let ago;
  /* eslint no-multi-spaces: off */
  if (secondsOld === 1) {
    ago = 'sec';
  } else if (secondsOld === 60) {
    ago = 'min';
  } else if (secondsOld === 3600) {
    ago = 'hr';
  } else if (secondsOld === 86400) {
    ago = 'd';
  } else if (secondsOld === 604800) {
    ago = 'wk';
  }
  if (secondsOld === 1     ||
      secondsOld === 60    ||
      secondsOld === 3600  ||
      secondsOld === 86400 ||
      secondsOld === 604800) {
        time = 1;
  } else if (secondsOld < 60) {
    time = secondsOld;
    ago = 'sec';
  } else if (secondsOld < 3600) {
    time = Math.floor(secondsOld / 60);
    ago = 'min';
  } else if (secondsOld < 86400) {
    time = Math.floor(secondsOld / 3600);
    ago = 'hr';
  } else if (secondsOld < 604800) {
    time = Math.floor(secondsOld / 86400);
    ago = 'd';
  } else {
    time = Math.floor(secondsOld / 604800);
    ago = 'wk';
  }
  return (
    <PlatformText>{time} {ago}</PlatformText>
  );
};

export default TimeAgo;
