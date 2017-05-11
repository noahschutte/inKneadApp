import React from 'react';
import { View, Image } from 'react-native';
import { pizzaOnPlate, inKneadText } from '../../assets';
import ReduxLogin from '../ReduxLogin';

const LoginScene = ({ redirect }) => {
  const { container, top, bottom, pizzaImage, textImage } = styles;

  return (
    <View style={container}>
      <View style={top}>
        <Image style={pizzaImage} source={pizzaOnPlate} />
        <Image style={textImage} source={inKneadText} />
      </View>
      <View style={bottom}>
        <View>
          <ReduxLogin redirect={redirect} />
        </View>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ce0000',
  },
  top: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottom: {
    flex: 3,
    alignItems: 'center',
  },
  pizzaImage: {
    height: 170,
    width: 170,
    marginBottom: 25,
    resizeMode: 'contain',
  },
  textImage: {
    height: 49,
    width: 166,
    resizeMode: 'contain',
    marginHorizontal: 50,
  },
};

export default LoginScene;
