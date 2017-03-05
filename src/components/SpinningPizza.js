import React, { Component } from 'react';
import { View, Animated, Easing } from 'react-native';
import { loadingPizzaImage } from '../assets';

class SpinningPizza extends Component {
  constructor(props) {
    super(props);
    this.spinValue = new Animated.Value(0);
  }
  componentDidMount() {
    this.spin();
  }
  spin = () => {
    this.spinValue.setValue(0);
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 6500,
        easing: Easing.linear,
      }
    ).start(this.spin);
  }
  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
          <Animated.Image
            style={{
              flex: 4,
              transform: [{ rotate: spin }],
              alignSelf: 'center',
              margin: 20,
              height: 100,
              resizeMode: 'contain'
            }}
            source={loadingPizzaImage}
          />
      </View>
    );
  }
}

export default SpinningPizza;
