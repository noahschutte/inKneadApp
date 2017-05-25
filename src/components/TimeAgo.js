import React from 'react';
import PlatformText from './PlatformText';

const TimeAgo = ({ secondsOld }) => {
  let time;
  let ago;
  /* eslint no-multi-spaces: off */
  if (secondsOld === 1) {
    ago = 'secs';
  } else if (secondsOld === 60) {
    ago = 'mins';
  } else if (secondsOld === 3600) {
    ago = 'hrs';
  } else if (secondsOld === 86400) {
    ago = 'days';
  } else if (secondsOld === 604800) {
    ago = 'wks';
  }
  if (secondsOld === 1     ||
      secondsOld === 60    ||
      secondsOld === 3600  ||
      secondsOld === 86400 ||
      secondsOld === 604800) {
        time = 1;
  } else if (secondsOld < 60) {
    time = secondsOld;
    ago = 'secs';
  } else if (secondsOld < 3600) {
    time = Math.floor(secondsOld / 60);
    ago = 'mins';
  } else if (secondsOld < 86400) {
    time = Math.floor(secondsOld / 3600);
    ago = 'hrs';
  } else if (secondsOld < 604800) {
    time = Math.floor(secondsOld / 86400);
    ago = 'days';
  } else {
    time = Math.floor(secondsOld / 604800);
    ago = 'wks';
  }
  if (time === 1) {
    ago = ago.substring(0, ago.length - 1);
  }
  return (
    <PlatformText>{time} {ago} ago</PlatformText>
  );
};

export default TimeAgo;
