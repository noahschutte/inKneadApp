import React from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { defaultProfileImage } from '../assets';
import SideMenuButton from './SideMenuButton';

const ToggleMenu = (props) => {
  const onPress = (action) => {
    action();
    props.toggle(true);
  };

  let notificationAlert;
  if (props.doesHaveNotifications) {
    notificationAlert = (
      <View style={styles.notificationAlertStyle}>
        <Text style={styles.textStyle}>!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.donatedPizzasText}>
        <Text style={{ fontWeight: 'bold', fontSize: 14, color: '#ffffff' }}>
          {props.totalDonatedPizzas}
        </Text> pizzas have been donated through this app!
      </Text>
      <Image
        source={defaultProfileImage}
        style={styles.image}
      />
      <SideMenuButton onPress={onPress.bind(this, () => Actions.refresh({ key: 'MainScene' }))}>
        <Text style={styles.textStyle}>Requests</Text>
      </SideMenuButton>

      <SideMenuButton onPress={props.userID ? onPress.bind(this, Actions.NotificationsScene) : onPress.bind(this, Actions.LoginScene)}>
        <View style={styles.notificationStyle}>
          <Text style={styles.textStyle}>Notifications </Text>
          {notificationAlert}
        </View>
      </SideMenuButton>

      <SideMenuButton onPress={onPress.bind(this, Actions.HowToScene)}>
        <Text style={styles.textStyle}>How To</Text>
      </SideMenuButton>

      <SideMenuButton onPress={props.userID ? onPress.bind(this, Actions.ProfileScene) : onPress.bind(this, Actions.LoginScene)}>
        <Text style={styles.textStyle}>Profile</Text>
      </SideMenuButton>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 75,
    paddingBottom: 75,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    fontFamily: 'Gillsans',
  },
  donatedPizzasText: {
    color: 'white',
    top: 25,
    textAlign: 'center',
    marginHorizontal: 5,
    position: 'absolute',
  },
  notificationStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  notificationAlertStyle: {
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'red',
    overflow: 'hidden',
  },
};

export default ToggleMenu;
