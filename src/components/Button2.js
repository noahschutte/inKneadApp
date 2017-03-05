import React, { Component } from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Text
} from 'react-native';

class Button extends Component {

  determineButtonType = (props) => {
    /* Returns an object describing the type of children
    and type of touchable primitive passed to the button component,
    defaulting to TouchableWithoutFeedback if no touch type is passed
    */
    const { type } = props.children;
    const result = {
      touchType: null,
      childType: null,
    };

    if (type !== undefined) {
      result.childType = type.displayName;
    } else {
      result.childType = 'Raw Text';
    }

    const {
      touchableOpacity,
      touchableHighlight
    } = props;

    if (touchableOpacity) {
      result.touchType = 'touchableOpacity';
    } else if (touchableHighlight) {
      result.touchType = 'touchableHighlight';
    } else {
      result.touchType = 'touchableWithoutFeedback';
    }
    return result;
  }

  assembleButton = (props) => {
    const {
      children,
      onPress,
      buttonStyle,
      textStyle,
      buttonType,
    } = props;
    let tStyle;
    let bStyle;
    switch (buttonType) {
      case 'confirm':
        tStyle = [styles.defaultTextStyle, styles.confirmTextStyle, textStyle];
        bStyle = [styles.defaultButtonStyle, styles.confirmButtonStyle, buttonStyle];
        break;
      case 'cancel':
        tStyle = [styles.defaultTextStyle, styles.cancelTextStyle, textStyle];
        bStyle = [styles.defaultButtonStyle, styles.cancelButtonStyle, buttonStyle];
        break;
      default:
        tStyle = [styles.defaultTextStyle, textStyle];
        bStyle = [styles.defaultButtonStyle, buttonStyle];
        break;
    }

    let content;
    const { touchType, childType } = this.determineButtonType(props);

    if (childType === 'Raw Text') {
      content = (
        <Text style={tStyle}>{children}</Text>
      );
    } else {
      content = children;
    }

    switch (touchType) {
      case 'touchableOpacity':
        content = (
          <TouchableOpacity style={bStyle} onPress={onPress}>
            {content}
          </TouchableOpacity>
        );
        break;
      case 'touchableHighlight':
        content = (
          <TouchableHighlight style={bStyle} onPress={onPress}>
            {content}
          </TouchableHighlight>
        );
        break;
      default:
        content = (
          <TouchableWithoutFeedback style={bStyle} onPress={onPress}>
            {content}
          </TouchableWithoutFeedback>
        );
        break;
    }
    return content;
  }

  render() {
    const content = this.assembleButton(this.props);
    return content;
  }
}

const styles = {
  defaultTextStyle: {
    alignSelf: 'center',
    color: '#00cece',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  defaultButtonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#ce0000',
    marginLeft: 5,
    marginRight: 5,
  },
  cancelButtonStyle: {
    backgroundColor: '#00cece',
    borderColor: '#00cece',
  },
  confirmButtonStyle: {
    backgroundColor: '#ce0000',
  },
  cancelTextStyle: {
    color: '#fff',
    padding: 10,
  },
  confirmTextStyle: {
    color: '#fff',
    padding: 10,
  }
};

export default Button;
