import React from 'react';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import SideMenuButton from './SideMenuButton';
import PlatformText from './PlatformText';
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
        <PlatformText type='thin' textStyle={styles.textStyle}>
          ORDERS{'  '}
          <Icon name='pie-chart' style={styles.iconStyle} color='#ffffff' />
        </PlatformText>
      </SideMenuButton>

      <SideMenuButton
        onPress={props.userID ? onPress.bind(this, notificationsScene) : onPress.bind(this, () => Actions.LoginScene({ redirect: { scene: 'NotificationsScene' } }))}
      >
        <PlatformText type='thin' textStyle={styles.textStyle}>
          NOTIFICATIONS{'  '}
          <Icon name='bell' style={styles.iconStyle} color='#ffffff' />
        </PlatformText>
        {/* {props.doesHaveNotifications ? <NotificationAlert /> : null} */}
      </SideMenuButton>

      <SideMenuButton onPress={props.userID ? onPress.bind(this, Actions.ProfileScene) : onPress.bind(this, Actions.LoginScene)}>
        <PlatformText type='thin' textStyle={styles.textStyle}>
          ACCOUNT{'  '}
          <Icon name='cog' style={styles.iconStyle} color='#ffffff' />
        </PlatformText>
      </SideMenuButton>

      <SideMenuButton onPress={onPress.bind(this, Actions.AboutScene)}>
        <PlatformText type='thin' textStyle={styles.textStyle}>
          ABOUT{'  '}
          <Icon name='info-circle' style={styles.iconStyle} color='#ffffff' />
        </PlatformText>
      </SideMenuButton>

      <SideMenuButton onPress={onPress.bind(this, Actions.HowToScene)}>
        <PlatformText type='thin' textStyle={styles.textStyle}>
          HOW TO{'  '}
          <Icon name='question-circle' style={styles.iconStyle} color='#ffffff' />
        </PlatformText>
      </SideMenuButton>

    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'space-around',
    paddingLeft: Dimensions.get('window').width * 0.12,
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
