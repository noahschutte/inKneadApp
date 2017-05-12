import React from 'react';
import { View, Text, Platform, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SideMenuButton from './SideMenuButton';
// import NotificationAlert from './NotificationAlert';

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

      <SideMenuButton onPress={onPress.bind(this, () => Actions.refresh({ key: 'MainScene' }))}>
        <Text style={styles.textStyle}>
          ORDERS{'\b'}
          <Icon name='pie-chart' style={styles.iconStyle} color='#ffffff' />
        </Text>
      </SideMenuButton>

      <SideMenuButton
        onPress={props.userID ? onPress.bind(this, notificationsScene) : onPress.bind(this, () => Actions.LoginScene({ redirect: { scene: 'NotificationsScene' } }))}
      >
        <Text style={styles.textStyle}>
          NOTIFICATIONS{'\b'}
          <Icon name='bell' style={styles.iconStyle} color='#ffffff' />
        </Text>
        {/* {props.doesHaveNotifications ? <NotificationAlert /> : null} */}
      </SideMenuButton>

      <SideMenuButton onPress={props.userID ? onPress.bind(this, Actions.ProfileScene) : onPress.bind(this, Actions.LoginScene)}>
        <Text style={styles.textStyle}>
          ACCOUNT{'\b'}
          <Icon name='cog' style={styles.iconStyle} color='#ffffff' />
        </Text>
      </SideMenuButton>

      <SideMenuButton onPress={onPress.bind(this, Actions.AboutScene)}>
        <Text style={styles.textStyle}>
          ABOUT{'\b'}
          <Icon name='info-circle' style={styles.iconStyle} color='#ffffff' />
        </Text>
      </SideMenuButton>

      <SideMenuButton onPress={onPress.bind(this, Actions.HowToScene)}>
        <Text style={styles.textStyle}>
          HOW TO{'\b'}
          <Icon name='question-circle' style={styles.iconStyle} color='#ffffff' />
        </Text>
      </SideMenuButton>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    paddingHorizontal: Dimensions.get('window').width * 0.12,
    paddingTop: 25,
    paddingBottom: Dimensions.get('window').height * 0.40,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  iconStyle: {
    fontSize: 26,
  },
  textStyle: {
    textAlign: 'left',
    fontSize: 20,
    color: 'white',
    fontFamily: (Platform.os === 'ios') ? 'AvenirNext-Regular' : 'sans-serif-thin',
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
