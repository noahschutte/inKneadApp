import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Button from './Button';
import Camera from 'react-native-camera';
import GuestView from './GuestView';
import Nav from './Nav';
import Video from './Video';

export default class ThankYou extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pizzas: this.props.recentSuccessfulRequest.pizzas,
      vendor: this.props.recentSuccessfulRequest.vendor,
      videoKey: '',
      uploading: false,
      progress: null,
      paused: true,
    };
    this.createThankYouShowToggle = this.createThankYouShowToggle.bind(this);
  }
  createThankYouShowToggle(toggle) {
    this.setState({ paused: toggle });
  }
  onSubmitRequest() {
    this.setState({ paused: true });
    const userID = this.props.user.id;
    if (!this.props.thankYouData) {
      this.props.handleCreateThankYouErrorMessage('Please record a video.');
    } else {
      this.props.handleCreateThankYouErrorMessage(' ');

      const dateTime = Date.now();
      const fbUserId = this.props.user.fb_userID;
      const videoKey = `${fbUserId}` + `${dateTime}`;

      const file = {
        uri: this.props.thankYouData.path,
        name: videoKey,
        type: 'video/quicktime'
      };

      const {
        pizzas,
        vendor,
      } = this.state;

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
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.errorMessage) {
          this.props.handleCreateThankYouErrorMessage(responseJson.errorMessage);
        } else {
          this.setState({ uploading: true });
          this.props.sumDonatedPizzas(responseJson.totalDonatedPizzas);
          this.props.collectRequests(responseJson.requests);
          const url = responseJson.signedRequest;
          const xhr = new XMLHttpRequest();
          const that = this;
          xhr.open('PUT', url);
          xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
              if (xhr.status === 200) {
                console.log('success');
                that.props.onChangeThankYouData(null);
                that.props.handleRecentThankYou(responseJson.recentThankYou);
                that.props.navigator.resetTo({ name: 'main' });
              } else {
                console.log('failure');
                const userID = that.props.user.id;
                fetch('https://d1dpbg9jbgrqy5.cloudfront.net/thank_you/1', {
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
                    that.props.handleCreateThankYouErrorMessage(responseJson.errorMessage);
                  } else {
                    that.props.handleCreateThankYouErrorMessage(responseJson.errorMessage);
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
    Camera.checkDeviceAuthorizationStatus()
    .then((response) => {
      if (response) {
        this.props.handleCreateThankYouErrorMessage('');
        this.props.navigator.push({ name: 'thankYouCamera' });
      } else {
        this.props.handleCreateThankYouErrorMessage("Go to Settings and allow 'in knead' to access the Camera and Microphone.");
      }
    });
  }
  render() {
    let videoDisplay;
    if (this.props.thankYouData) {
      videoDisplay =
        <Video thankYou createThankYouShow createThankYouShowPaused={this.state.paused} createThankYouShowToggle={this.createThankYouShowToggle} {...this.props} />;
    }

    let recordButtonText;
    if (this.props.thankYouData) {
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
          </View>
        </View>);
    } else if (this.props.user === null) {
      display =
        (<View style={styles.container}>
          <Nav backButton {...this.props} />
          <GuestView {...this.props} />
        </View>);
    } else {
      display =
        (<View style={styles.container}>
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
                  Thank you for
                </Text>
              </View>

              <View style={styles.pizza}>
                <Text>{this.props.recentSuccessfulRequest.pizzas} pizzas</Text>
              </View>

              <View style={styles.banner}>
                <Text style={styles.bannerText}>
                from
                </Text>
              </View>

              <View style={styles.controls}>
                <Text>{this.props.recentSuccessfulRequest.vendor}</Text>
              </View>

              <View style={styles.errorContainer}>
                <Text style={styles.error}>
                  {this.props.createThankYouErrorMessage}
                </Text>
              </View>

              <Button
                color='#ce0000'
                text={'Send Your Gratitude'}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  controls: {
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
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
