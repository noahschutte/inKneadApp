import React from 'react';
import { View, Image } from 'react-native';

const ProfileImage = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image source={props.image} style={styles.profileImageStyle} />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    borderRadius: 100,
  },
  profileImageStyle: {
    resizeMode: 'cover',
    borderRadius: 120,
    width: 120,
    height: 120,
  },
};

export default ProfileImage;
