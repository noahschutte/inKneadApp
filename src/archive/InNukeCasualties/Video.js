import React, { Component } from 'react';
import { Image, TouchableHighlight, View, StyleSheet } from 'react-native';
import Video from 'react-native-video';

export default class VideoDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: true
    };
    this.playVideo = this.playVideo.bind(this);
    this.onEnd = this.onEnd.bind(this);
  }

  playVideo() {
    if (this.props.requestShow) {
      this.props.requestShowToggle(!this.props.requestShowPaused);
    } else if (this.props.entryShow) {
      this.props.entryShowToggle(!this.props.entryShowPaused);
    } else if (this.props.newRequestShow) {
      this.props.newRequestShowToggle(!this.props.newRequestShowPaused);
    } else if (this.props.createThankYouShow) {
      this.props.createThankYouShowToggle(!this.props.createThankYouShowPaused);
    } else {
      this.setState({ paused: !this.state.paused });
    }
  }
  onEnd() {
    if (this.props.requestShow) {
      this.props.requestShowToggle(true);
    } else if (this.props.entryShow) {
      this.props.entryShowToggle(true);
    } else if (this.props.newRequestShow) {
      this.props.newRequestShowToggle(true);
    } else if (this.props.createThankYouShow) {
      this.props.createThankYouShowToggle(true);
    } else {
      this.setState({ paused: true });
    }
  }

  render() {
    let originPaused;
    if (this.props.requestShow) {
      originPaused = this.props.requestShowPaused;
    } else if (this.props.entryShow) {
      originPaused = this.props.entryShowPaused;
    } else if (this.props.newRequestShow) {
      originPaused = this.props.newRequestShowPaused;
    } else if (this.props.createThankYouShow) {
      originPaused = this.props.createThankYouShowPaused;
    } else {
      originPaused = this.state.paused;
    }


    let playButton;
    if (this.props.requestShowPaused || this.props.entryShowPaused || this.props.newRequestShowPaused || this.props.createThankYouShowPaused) {
      playButton =
        (<Image
          source={require('../../assets/playButton.png')}
          style={styles.playButton}
        />);
    } else {
      playButton =
        (<Image
          style={styles.playButton}
        />);
    }

    let content;
    if (this.props.previewNewRequest) {
      content = this.props.videoData.path;
    } else if (this.props.thankYou) {
      content = this.props.thankYouData.path;
    } else if (this.props.entryShow) {
      content = this.props.entry.compressed_video;
    } else if (this.props.selectedEntry) {
      content = this.props.selectedEntry.compressed_video;
    } else if (this.props.requestShow) {
      content = this.props.request.compressed_video;
    }

    const videoDisplay =
      (<Video
        source={{ uri: content }}
        paused={originPaused}
        rate={1.0}
        volume={1}
        muted={false}
        playInBackground
        playWhenInactive
        resizeMode={'contain'}
        onEnd={this.onEnd}
        repeat
        style={styles.video}
      />);

    const display =
        (<View style={styles.container}>
          <TouchableHighlight
            style={styles.playButtonContainer}
            onPress={this.playVideo}
          >
            {playButton}
          </TouchableHighlight>
          {videoDisplay}
        </View>);

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
    zIndex: 1,
  },
  video: {
    flex: 1,
    zIndex: 2,
  },
  playButtonContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 3,
  },
  playButton: {
    width: 50,
    height: 50,
  },
});
