import React, { Component } from 'react';
import { Text, Platform } from 'react-native';

class PlatformText extends Component {
  render() {
    const {
      children,
      type,
      textStyle,
      fontSize,
      onPress,
    } = this.props;
    const style = {
      fontSize,
    };

    // Is the device running iOS?
    if (Platform.OS === 'ios') {
      switch (type) {
        case 'thin':
        style.fontFamily = 'AvenirNext-Regular';
        break;
        case 'demi-bold':
        style.fontFamily = 'AvenirNext-DemiBold';
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
        case 'demi-bold':
        style.fontFamily = 'sans-serif-thin';
        style.fontWeight = 'bold';
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
      <Text style={[style, textStyle]} onPress={onPress}>{children}</Text>
    );
  }
}

export default PlatformText;
