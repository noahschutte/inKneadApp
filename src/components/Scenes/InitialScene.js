import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import {
  createSession,
  getEntries,
  redirectTo
} from '../../actions';
import SpinningPizza from '../SpinningPizza';

const InitialScene = (props) => {
  props.getEntries();
  AccessToken.getCurrentAccessToken().then(
    data => {
      if (data) {
        const accessToken = data.accessToken;
        const responseInfoCallback = (error, result) => {
          if (error) {
            alert(`Error fetching data: ${error.toSTring()}`);
          } else {
            props.createSession(result);
          }
        };
        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken,
            parameters: {
              fields: {
                string: 'email,name,first_name,middle_name,last_name'
              }
            }
          },
          responseInfoCallback
        );
        new GraphRequestManager().addRequest(infoRequest).start();
      } else {
        props.redirectTo({ scene: 'MainScene', parameter: 'root' });
      }
    }
  );
  return (
    <View style={styles.containerStyle}>
      <SpinningPizza />
      <View style={styles.textContainer}>
        <Text style={styles.textStyle}>
          in knead
        </Text>
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    paddingTop: 25,
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#ce0000'
  },
  textContainer: {
    flex: 0.75,
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 50,
    paddingTop: 25,
    color: 'white',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
};

export default connect(null, {
  createSession,
  getEntries,
  redirectTo,
})(InitialScene);
