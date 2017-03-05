import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const ProfileDetailButton = props => {
  let marginImage;
  if (props.marginImage) {
    marginImage = <Image source={props.marginImage} style={styles.marginImageStyle} />;
  }
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {marginImage}
        <Text style={styles.email}>{props.children}</Text>
        <TouchableOpacity style={styles.buttonStyle} onPress={props.onPress}>
          <Text style={{ fontSize: 22, marginTop: -5 }}> > </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = {
  email: {
    flex: 9,
    fontSize: 16,
    textAlign: 'center',
  },
  line: {
    backgroundColor: '#aaa',
    flex: 1,
    height: 1,
  },
  buttonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  marginImageStyle: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
  },
};

export default ProfileDetailButton;
