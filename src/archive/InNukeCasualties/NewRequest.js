import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { SegmentedControls } from 'react-native-radio-buttons';
import Button from './Button';
import Camera from 'react-native-camera';
import GuestView from './GuestView';
import Nav from './Nav';
import Video from './Video';

export default class NewRequest extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pizzas: '',
      vendor: '',
      videoKey: '',
      uploading: false,
      progress: null,
      paused: true,
      uploadPercentage: 0,
      uploadStatus: '',
    };
    this.newRequestShowToggle = this.newRequestShowToggle.bind(this);
    this.onPizzasChange = this.onPizzasChange.bind(this);
    this.onVendorChange = this.onVendorChange.bind(this);
  }
  newRequestShowToggle(toggle) {
    this.setState({ paused: toggle });
  }
  onPizzasChange(pizzas) {
    this.setState({ pizzas });
  }
  onVendorChange(vendor) {
    this.setState({ vendor });
  }

  uploadProgress(evt) {
    if (evt.lengthComputable) {
      const percentComplete = Math.round(evt.loaded * 100 / evt.total);
      console.log('percentComplete', percentComplete);
      this.setState({ uploadPercentage: percentComplete });
    }
  }

  uploadComplete(evt) {
    /* This event is raised when the server send back a response */
    this.setState({ uploadStatus: 'Done!' });
    this.setState({ uploadPercentage: 101 });
    // alert("Done - " + evt.target.responseText );
  }

  uploadFailed(evt) {
    console.log('Error:', evt);
    // alert("There was an error attempting to upload the file." + evt);
  }

  uploadCanceled(evt) {
    console.log('Error:', evt);
    alert('The upload has been canceled by the user or the browser dropped the connection.');
  }

  onSubmitRequest() {
    this.setState({ paused: true });
    const userID = this.props.user.id;
    if (!this.props.videoData) {
      this.props.onChangeNewRequestErrorMesssage('Please record a video.');
    } else if (this.state.pizzas.length < 1) {
      this.props.onChangeNewRequestErrorMesssage('Please select how many pizzas you need.');
    } else if (this.state.vendor.length < 5) {
      this.props.onChangeNewRequestErrorMesssage('Please choose your preferred pizza place.');
    } else {
      this.props.onChangeNewRequestErrorMesssage(' ');

      const dateTime = Date.now();
      const fbUserId = this.props.user.fb_userID;
      const videoKey = `${fbUserId}` + `${dateTime}`;

      const file = {
        uri: this.props.videoData.path,
        name: videoKey,
        type: 'video/quicktime'
      };

      const {
        pizzas,
        vendor,
      } = this.state;

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
          this.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage);
        } else {
          this.setState({ uploading: true });
          this.setState({ uploadStatus: 'Sending your video from your phone to our server.' });
          this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
          this.props.collectRequests(responseJson.requests);
          const url = responseJson.signedRequest;
          const xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', this.uploadProgress.bind(this), false);
          xhr.addEventListener('load', this.uploadComplete.bind(this), false);
          xhr.addEventListener('error', this.uploadFailed.bind(this), false);
          xhr.addEventListener('abort', this.uploadCanceled.bind(this), false);
          const that = this;
          xhr.open('PUT', url);
          xhr.setRequestHeader('Content-Type', 'application/json'); // Explicitly set request header for android compatibility
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log('success');
                that.props.onChangeVideoData(null);
                that.props.navigator.resetTo({ name: 'main' });
              } else {
                console.log('failure');
                const userID = that.props.user.id;
                fetch('https://d1dpbg9jbgrqy5.cloudfront.net/requests/1', {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: 'DELETE',
                  body: JSON.stringify({ videoKey })
                })
                .then((response) => response.json())
                .then((responseJson) => {
                  if (responseJson.requests) {
                    that.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
                    that.props.collectRequests(responseJson.requests);
                    that.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage);
                  } else {
                    that.props.onChangeNewRequestErrorMesssage(responseJson.errorMessage);
                  }
                  that.setState({ uploading: false });
                })
                .catch((error) => {
                  console.error(error);
                });
                that.setState({ uploading: false });
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
  }

  openVideoRec() {
    this.setState({ paused: true });
    if (Platform.OS === 'ios') {
      Camera.checkDeviceAuthorizationStatus()
      .then((response) => {
        if (response) {
          this.props.onChangeNewRequestErrorMesssage('');
          this.props.navigator.push({ name: 'camera' });
        } else {
          this.props.onChangeNewRequestErrorMesssage("Go to Settings and allow 'in knead' to access the Camera and Microphone.");
        }
      });
    } else if (Platform.OS === 'android') {
      this.props.onChangeNewRequestErrorMesssage('');
      this.props.navigator.push({ name: 'camera' });
    }
  }
  selectPizzas(pizzas) {
    this.setState({ pizzas });
  }
  selectVendor(vendor) {
    this.setState({ vendor });
  }
  render() {
    const pizzas = [
      1,
      2,
      3,
    ];
    const vendors = [
      'Papa Johns',
      'Dominos',
      'Pizza Hut',
    ];
    let videoDisplay;
    if (this.props.videoData) {
      videoDisplay =
        <Video previewNewRequest newRequestShow newRequestShowPaused={this.state.paused} newRequestShowToggle={this.newRequestShowToggle} {...this.props} />;
    }

    let recordButtonText;
    if (this.props.videoData) {
      recordButtonText = 'Rerecord';
    } else {
      recordButtonText = 'Record';
    }

    let display;
    if (this.state.uploading) {
      display =
        (<View style={styles.container}>
          <View style={styles.upload}>
            <Text>
              Your video is being uploaded.
            </Text>
            <Text>
              This may take up to a minute.
            </Text>
            <Text>{this.state.uploadStatus}</Text>
            <Text>{this.state.uploadPercentage} %</Text>
          </View>
        </View>);
    } else if (this.props.user === null) {
      display =
        (<View style={styles.container}>
          <Nav backButton {...this.props} />
          <GuestView {...this.props} />
        </View>);
    } else if (!this.props.user.current_email) {
      display =
        (<View style={styles.container}>
          <Nav backButton {...this.props} />
          <View style={styles.updateEmailContainer}>
            <Text>You've got to verify your email first.</Text>
            <Text>Head over to your profile page.</Text>
          </View>
        </View>);
    } else {
      display =
        (<View style={styles.wrapper}>
          <Nav backButton {...this.props} />
          <View style={styles.wrapper}>

            <View style={styles.videoContainer}>
              {videoDisplay}
            </View>

            <View style={styles.formContainer}>
              <View style={styles.videoFooter}>
                <Button
                  color='#ce0000'
                  text={recordButtonText}
                  onPress={this.openVideoRec.bind(this)}
                />
              </View>

              <View style={styles.banner}>
                <Text style={styles.bannerText}>
                  # OF PIZZAS
                </Text>
              </View>

              <View style={styles.pizza}>
                <SegmentedControls
                  tint={'#ce0000'}
                  options={pizzas}
                  onSelection={this.selectPizzas.bind(this)}
                  selectedOption={this.state.pizzas}
                />
              </View>

              <View style={styles.banner}>
                <Text style={styles.bannerText}>
                VENDOR NEAR YOU
                </Text>
              </View>

              <View style={styles.controls}>
                <SegmentedControls
                  tint={'#ce0000'}
                  fontSize={50}
                  options={vendors}
                  onSelection={this.selectVendor.bind(this)}
                  selectedOption={this.state.vendor}
                />
              </View>

              <View style={styles.errorContainer}>
                <Text style={styles.error}>
                  {this.props.newRequestErrorMessage}
                </Text>
              </View>

              <Button
                color='#ce0000'
                text={'Submit Request'}
                onPress={this.onSubmitRequest.bind(this)}
              />

            </View>
          </View>
        </View>);
    }
    return (
      <View style={styles.container}>
        {display}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 9,
    backgroundColor: 'white',
  },
  updateEmailContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    flex: 2,
    backgroundColor: '#BDBDBD',
  },
  formContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 50,
    paddingTop: 20
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  banner: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#424242',
    alignSelf: 'stretch',
    padding: 5
  },
  bannerText: {
    color: 'white',
  },
  pizza: {
    width: 250,
  },
  controls: {
    width: 300
  },
  errorContainer: {
    marginTop: 5,
    marginBottom: 5,
  },
  error: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ce0000',
  },
});
