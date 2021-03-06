import React, { Component } from 'react';
import { View, Image, Platform, Alert, ScrollView } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { DB_URL } from 'react-native-dotenv';
import {
  updateSelectedPizzas,
  updateSelectedVendor,
  uploadComplete,
  handleVideoData,
  resetCameraState,
  updateEmail,
  acceptEULA,
} from '../../actions';
import { camcorderImage } from '../../assets';
import EntryVideo from '../EntryVideo';
import EntryCreationForm from '../EntryCreationForm';
import ThankYouCreationForm from '../ThankYouCreationForm';
import Button from '../Button2';

class EntryCreationScene extends Component {
  state = {
    paused: true,
  };

  onPress = () => {
    this.setState({ paused: true });
    if (this.verifiedUser()) {
      this.handleRequestSubmission();
    }
  }

  togglePlay = (toggle) => {
    this.setState({ paused: toggle });
  }

  verifiedUser = () => {
    const { userVerified, signupEmail, userID, currentEmail, eulaAccepted } = this.props;
    const verifyAndSubmit = () => {
      this.props.updateEmail(signupEmail, userID, {
        scene: 'EntryCreationScene',
      });
      this.handleRequestSubmission();
    };
    if (!userVerified) {
      if (!currentEmail) {
        Alert.alert(
          'No verified email address!',
          `You must have a verified email to request pizza! \n\nIs ${signupEmail} your active email?`,
          [
            {
              text: 'No, Update',
              onPress: Actions.EmailVerifyScene.bind(this, {
                redirect: {
                  scene: 'EntryCreationScene'
                },
              }),
            },
            {
              text: 'Yes, Verify!',
              onPress: verifyAndSubmit,
            },
          ]
        );
      }
      if (!eulaAccepted) {
        Alert.alert(
          'Do you agree to the terms and conditions of the End User License Agreement?',
          'Read the agreement here:\nwww.inknead.pizza/eula',
          [
            { text: 'Cancel' },
            { text: 'I Agree',
              onPress: () => this.props.acceptEULA(userID)
            },
          ],
        );
      }
      return false;
    }
    return true;
  }

  dispatchRequest = () => {
    const {
      videoData,
      fb_userID,
      userID,
      pizzas,
      vendor,
    } = this.props;

    /* eslint camelcase: 0 */
    let videoKey = `${Date.now() + fb_userID}`;
    fetch(`${DB_URL}/requests`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        userID,
        pizzas,
        vendor,
        videoKey
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.errorMessage) {
        Alert.alert(
          'Problem!',
          `${responseJson.errorMessage}`,
          [
            { text: 'Got it' }
          ]
        );
      } else {
        const url = responseJson.signedRequest;
        videoKey = responseJson.videoKey;
        const file = {
          uri: videoData.path,
          name: videoKey,
          type: 'video/quicktime'
        };
        const xhr = new XMLHttpRequest();
        // Add event listeners. Needs upload Progress
        xhr.addEventListener('load', this.props.uploadComplete, false);
        xhr.addEventListener('error', (evt) => console.log('Error:', evt), false);
        xhr.addEventListener('abort', (evt) => console.log(evt), false);
        Actions.UploadingScene({ uploading: true });
        xhr.open('PUT', url);
        // Explicitly set request header for android compatibility
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.props.handleVideoData(null);
              Actions.UploadCompleteScene();
            } else {
              console.log('failure, status: ', xhr.status);
              fetch(`${DB_URL}/requests/1`, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                method: 'DELETE',
                body: JSON.stringify({ videoKey })
              })
              .catch((error) => {
                console.error(error);
              });
            }
          }
        };
        xhr.send(file);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  dispatchThankYou = () => {
    const { userID, fb_userID, videoData, entry } = this.props;
    let videoKey = `${fb_userID + Date.now()}`;
    const { pizzas, vendor, donor_id, id: requestId } = entry;

    fetch(`${DB_URL}/thank_you`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        userID,
        donor_id,
        requestId,
        pizzas,
        vendor,
        videoKey
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errorMessage) {
        console.log('error: ', responseJson.errorMessage);
      } else {
        const url = responseJson.signedRequest;
        videoKey = responseJson.videoKey;
        const file = {
          uri: videoData.path,
          name: videoKey,
          type: 'video/quicktime'
        };
        const xhr = new XMLHttpRequest();
        Actions.UploadingScene();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              this.props.handleVideoData(null);
              Actions.UploadCompleteScene();
            } else {
              console.log('failure, status: ', xhr.status);
              fetch(`${DB_URL}/thank_you/1`, {
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify({ videoKey }),
              })
              .then(response => response.json())
              .then(responseJSON => {
                console.log('error: ', responseJSON.errorMessage);
              })
              .catch(err => console.error(err));
            }
          }
        };
        xhr.send(file);
      }
    })
    .catch(error => console.error(error));
  }

  handleRequestSubmission = () => {
    this.setState({ paused: true });
    const { videoData, pizzas, vendor } = this.props;
    const errorMessages = [];
    if (!videoData) {
      errorMessages.push('Please record a video');
    }
    if (pizzas === 0) {
      errorMessages.push('Select how many pizzas you need');
    }
    if (vendor === '') {
      errorMessages.push('Choose a preferred pizza place');
    }
    if (errorMessages.length === 0) {
      this.dispatchRequest();
    } else {
      Alert.alert(
        'Problem!',
        `${errorMessages.map(message => `\n${message}`)}`,
        [
          { text: 'Got it' }
        ]
      );
    }
  }

  handleThankYouSubmission = () => {
    this.setState({ paused: true });
    const { videoData } = this.props;
    const errorMessages = [];
    if (!videoData) {
      errorMessages.push('Please record a video.');
    }
    if (errorMessages.length === 0) {
      this.dispatchThankYou();
    } else {
      Alert.alert(
        'Problem!',
        `${errorMessages.map(message => `\n${message}`)}`,
        [
          { text: 'Got it' }
        ]
      );
    }
  }

  openVideoRec = () => {
    this.props.resetCameraState();
    if (Platform.OS === 'ios') {
      Camera.checkDeviceAuthorizationStatus()
      .then(response => {
        if (response) {
          Actions.CameraScene();
        } else {
          alert('You must allow camera access!');
        }
      });
    } else if (Platform.OS === 'android') {
      Actions.CameraScene();
    }
  }

  renderVideoContent = () => {
    if (this.props.videoData) {
      return (
        <EntryVideo
          rerecordable
          togglePlay={this.togglePlay}
          source={this.props.videoData.path}
          paused={this.state.paused}
        />
      );
    }
    return (
      <View style={styles.videoContainer} >
        <Button onPress={this.openVideoRec}>
          <Image
            source={camcorderImage}
            style={{ resizeMode: 'contain', height: 75, width: 75 }}
          />
        </Button>
      </View>
    );
  }

  render() {
    const {
      pizzas,
      vendor,
      createThankYou
    } = this.props;
    const videoDisplay = this.renderVideoContent();
    let entryCreationForm;
    if (createThankYou) {
      entryCreationForm = (
        <ThankYouCreationForm
          handleThankYouSubmission={this.handleThankYouSubmission}
        />
      );
    } else {
      entryCreationForm = (
        <EntryCreationForm
          updateSelectedPizzas={this.props.updateSelectedPizzas}
          pizzas={pizzas}
          updateSelectedVendor={this.props.updateSelectedVendor}
          vendor={vendor}
          handleRequestSubmission={this.onPress}
        />
      );
    }
    return (
      <View style={{ flex: 1 }} >
        {videoDisplay}
        <ScrollView style={{ flex: 5 }}>
          {entryCreationForm}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  videoContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
};

const mapStateToProps = ({ newEntry, camera, user }) => {
  const { pizzas, vendor, videoKey } = newEntry;
  const { videoData } = camera;
  const { userVerified, fb_userID, userID, signupEmail, currentEmail, eulaAccepted } = user;

  return {
    pizzas,
    vendor,
    videoKey,
    videoData,
    userVerified,
    fb_userID,
    userID,
    signupEmail,
    currentEmail,
    eulaAccepted,
  };
};

export default connect(mapStateToProps, {
  acceptEULA,
  updateSelectedPizzas,
  updateSelectedVendor,
  uploadComplete,
  handleVideoData,
  resetCameraState,
  updateEmail,
})(EntryCreationScene);
