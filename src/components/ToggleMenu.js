import React from 'react';
import { View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { defaultProfileImage } from '../assets';
import SideMenuButton from './SideMenuButton';
import NotificationAlert from './NotificationAlert';

const ToggleMenu = (props) => {
  const onPress = (action) => {
    action();
    props.toggle(true);
  };
  const notificationsScene = () => {
    props.retrieveNotifications();
    Actions.NotificationsScene();
  };

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

      <SideMenuButton
        onPress={props.userID ? onPress.bind(this, notificationsScene) : onPress.bind(this, () => Actions.LoginScene({ redirect: { scene: 'NotificationsScene' } }))}
      >
        <View style={styles.notificationStyle}>
          <Text style={styles.textStyle}>Notifications </Text>
          {props.doesHaveNotifications ? <NotificationAlert /> : null}
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
};

export default ToggleMenu;
