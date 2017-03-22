import React from 'react';
import { Platform } from 'react-native';
import { Scene, Router } from 'react-native-router-flux';
import * as Scenes from './components/Scenes';
import * as NavProps from './components/Scenes/NavProps';
import NavBar from './components/NavBar';

const RouterComponent = () => {
  const sceneStyle = {
    marginTop: (Platform.OS === 'ios') ? 74 : 54, //this is just to test if the platform is iOS to give it a height of 20, else, no height (Android apps have their own status bar)

  };

  return (
    <Router >
      <Scene
        initial
        hideNavBar
        key="InitialScene"
        component={Scenes.InitialScene}
      />
      <Scene
        navBar={NavBar}
        navBarProps={NavProps.backButton}
        sceneStyle={sceneStyle}
        key="LoginScene"
        component={Scenes.LoginScene}
      />
      <Scene key="root" navBar={NavBar}>

        <Scene
          initial
          navBarProps={NavProps.mainScene}
          sceneStyle={sceneStyle}
          key="MainScene"
          component={Scenes.MainScene}
        />
        <Scene
          navBarProps={NavProps.instructionsScene}
          sceneStyle={sceneStyle}
          key="InstructionsScene"
          component={Scenes.InstructionsScene}
        />
        <Scene
          navBarProps={NavProps.emailVerifyScene}
          sceneStyle={sceneStyle}
          key="EmailVerifyScene"
          component={Scenes.EmailVerifyScene}
        />
        <Scene
          navBarProps={NavProps.uploadingScene}
          sceneStyle={sceneStyle}
          key="UploadingScene"
          component={Scenes.UploadingScene}
        />
        <Scene
          navBarProps={NavProps.entryCreationScene}
          sceneStyle={sceneStyle}
          key="EntryCreationScene"
          component={Scenes.EntryCreationScene}
        />
        <Scene
          navBarProps={NavProps.backButton}
          sceneStyle={sceneStyle}
          key="EntryScene"
          component={Scenes.EntryScene}
        />
        <Scene
          navBarProps={NavProps.backButton}
          sceneStyle={sceneStyle}
          key="HowToScene"
          component={Scenes.HowToScene}
        />
        <Scene
          navBarProps={NavProps.notificationsScene}
          sceneStyle={sceneStyle}
          key="NotificationsScene"
          component={Scenes.NotificationsScene}
        />
        <Scene
          navBarProps={NavProps.profileScene}
          sceneStyle={sceneStyle}
          key="ProfileScene"
          component={Scenes.ProfileScene}
        />
        <Scene
          navBarProps={NavProps.backButton}
          sceneStyle={sceneStyle}
          key="UserHistoryScene"
          component={Scenes.UserHistoryScene}
        />
        <Scene
          hideNavBar
          key="CameraScene"
          component={Scenes.CameraScene}
        />

      </Scene>
    </Router>
  );
};

export default RouterComponent;
