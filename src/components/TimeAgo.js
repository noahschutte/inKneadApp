import React from 'react';
import { Text } from 'react-native';

const TimeAgo = ({ secondsOld }) => {
  let time;
  let ago;
  /* eslint no-multi-spaces: off */
  if (secondsOld === 1     ||
      secondsOld === 60    ||
      secondsOld === 3600  ||
      secondsOld === 86400 ||
      secondsOld === 604800) {
        time = 1;
  } else if (secondsOld < 60) {
    time = secondsOld;
    ago = 'seconds';
  } else if (secondsOld < 3600) {
    time = Math.floor(secondsOld / 60);
    ago = 'minutes';
  } else if (secondsOld < 86400) {
    time = Math.floor(secondsOld / 3600);
    ago = 'hours';
  } else if (secondsOld < 604800) {
    time = Math.floor(secondsOld / 86400);
    ago = 'days';
  } else {
    time = Math.floor(secondsOld / 604800);
    ago = 'weeks';
  }
  if (time === 1) {
    ago = ago.substring(0, ago.length - 1);
  }
  return (
    <Text>{time} {ago} ago</Text>
  );
};

export default TimeAgo;
