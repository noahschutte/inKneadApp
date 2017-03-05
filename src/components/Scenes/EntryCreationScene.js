import React, { Component } from 'react';
import { View, Image, Platform, Alert } from 'react-native';
import Camera from 'react-native-camera';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  updateSelectedPizzas,
  updateSelectedVendor,
  uploadComplete,
  handleVideoData,
  resetCameraState,
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
    if (!this.props.userVerified) {
      Alert.alert(
        'No verified email address!',
        'You must have a verified email to request pizza!',
        [
          { text: 'Cancel' },
          {
            text: 'Verify Now',
            onPress: Actions.EmailVerifyScene.bind(this, {
              redirect: {
                scene: 'EntryCreationScene'
              }
            })
          }
        ]
      );
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
    const videoKey = `${Date.now() + fb_userID}`;
    const file = {
      uri: videoData.path,
      name: videoKey,
      type: 'video/quicktime'
    };
    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests', {
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
        const xhr = new XMLHttpRequest();
        // Add event listeners. Needs upload Progress
        xhr.addEventListener('load', this.props.uploadComplete, false);
        xhr.addEventListener('error', (evt) => console.log('Error:', evt), false);
        xhr.addEventListener('abort', (evt) => console.log(evt), false);
        Actions.UploadingScene();
        xhr.open('PUT', url);
        // Explicitly set request header for android compatibility
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('success');
              this.props.handleVideoData(null);
              Actions.MainScene({ type: 'reset' });
            } else {
              console.log('failure');
              fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests/1', {
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
    const videoKey = `${fb_userID + Date.now()}`;
    const file = {
      uri: videoData.path,
      name: videoKey,
      type: 'video/quicktime'
    };
    const { pizzas, vendor } = entry;

    fetch('https://d1dpbg9jbgrqy5.cloudfront.net/thank_you', {
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
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.errorMessage) {
        console.log('error: ', responseJson.errorMessage);
      } else {
        const url = responseJson.signedRequest;
        const xhr = new XMLHttpRequest();
        Actions.UploadingScene();
        xhr.open('PUT', url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('success');
              this.props.handleVideoData(null);
              Actions.MainScene({ type: 'reset' });
            } else {
              console.log('failure, status: ', xhr.status);
              fetch('https://d1dpbg9jbgrqy5.cloudfront.net/thank_you/1', {
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
    const { videoData, pizzas, vendor } = this.props;
    const errorMessages = [];
    if (!videoData) {
      errorMessages.push('Please record a video');
    }
    if (pizzas === 0) {
      errorMessages.push('Please select how many pizzas you need');
    }
    if (vendor === '') {
      errorMessages.push('Please choose a preferred pizza place');
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
        {entryCreationForm}
      </View>
    );
  }
}

const styles = {
  videoContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
};

const mapStateToProps = ({ newEntry, camera, user }) => {
  const { pizzas, vendor, videoKey } = newEntry;
  const { videoData } = camera;
  const { userVerified, fb_userID, userID } = user;

  return {
    pizzas,
    vendor,
    videoKey,
    videoData,
    userVerified,
    fb_userID,
    userID
  };
};

export default connect(mapStateToProps, {
  updateSelectedPizzas,
  updateSelectedVendor,
  uploadComplete,
  handleVideoData,
  resetCameraState,
})(EntryCreationScene);
