import React from 'react';
import { Text, Platform } from 'react-native';

const PlatformText = ({ children, type, textStyle, fontSize }) => {
  const style = {
    fontSize,
  };

  // Is the device running iOS?
  if (Platform.OS === 'ios') {
    switch (type) {
      case 'thin':
      style.fontFamily = 'AvenirNext-Regular';
      break;
      case 'bold':
      style.fontFamily = 'AvenirNext-Bold';
      break;
      case 'regular':
      default:
      style.fontFamily = 'AvenirNext-Regular';
      break;
    }
  } else {
    switch (type) {
      case 'thin':
      style.fontFamily = 'sans-serif-thin';
      break;
      case 'bold':
      style.fontFamily = 'sans-serif';
      style.fontWeight = 'bold';
      break;
      case 'regular':
      default:
      style.fontFamily = 'sans-serif';
      break;
    }
  }
  return (
    <Text style={[style, textStyle]}>{children}</Text>
  );
};

export default PlatformText;
