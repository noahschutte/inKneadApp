import React from 'react';
import { View, Text, Image } from 'react-native';
import { pizzaOnPlate } from '../../assets';
import ReduxLogin from '../ReduxLogin';

const LoginScene = ({ logOut, redirect }) => {
  const { container, top, bottom, image, title, text } = styles;
  let prompt;
  if (logOut) {
    prompt = 'Log out: ';
  } else {
    prompt = 'Please log in: ';
  }
  return (
    <View style={container}>
      <View style={top}>
        <Image style={image} source={pizzaOnPlate} />
        <Text style={title}>
          in knead
        </Text>
        <Text style={text}>
          "The power of kindness,{'\n'} one pizza at a time"
        </Text>
      </View>
      <View style={bottom}>
        <Text style={[text, { marginBottom: 0, marginTop: 30 }]}>
          {prompt}
        </Text>
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
  },
  bottom: {
    flex: 3,
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 150,
    marginTop: 25,
    borderRadius: 100 / 2,
  },
  title: {
    marginBottom: 20,
    fontSize: 55,
    color: 'white',
    fontFamily: 'Gillsans'
  },
  text: {
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
    color: 'white',
    fontFamily: 'Gillsans',
  },
};

export default LoginScene;
