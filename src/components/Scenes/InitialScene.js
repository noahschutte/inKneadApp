import React from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import { pizzaOnPlate, inKneadText } from '../../assets';
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
      <View style={{ flex: 2, justifyContent: 'flex-end' }}>
        <Image style={styles.pizzaStyle} source={pizzaOnPlate} />
      </View>
      <View style={{ flex: 3, justifyContent: 'flex-start' }}>
        <Image style={styles.inKneadStyle} source={inKneadText} />
      </View>
    </View>
  );
};

const styles = {
  containerStyle: {
    paddingTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ce0000'
  },
  pizzaStyle: {
    resizeMode: 'contain',
    height: 170,
  },
  inKneadStyle: {
    resizeMode: 'contain',
    width: 170,
  },
};

export default connect(null, {
  createSession,
  getEntries,
  redirectTo,
})(InitialScene);
