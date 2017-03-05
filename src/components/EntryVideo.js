import React from 'react';
import { Image, TouchableHighlight, View, Alert } from 'react-native';
import Video from 'react-native-video';
import { Actions } from 'react-native-router-flux';
import { playButtonImage } from '../assets';

const EntryVideo = (props) => {
    const { source, paused, togglePlay, rerecordable } = props;
    const originPaused = paused;
    let playButton;
    if (paused) {
      playButton = (
        <Image
          source={playButtonImage}
          style={styles.playButton}
        />
      );
    } else {
      playButton = (
        <Image
          style={styles.playButton}
        />
      );
    }
    let onButtonPress;
    if (rerecordable && paused) {
      onButtonPress = () => {
        Alert.alert(
          'Review or Rerecord your video?',
          null,
          [
            { text: 'Review', onPress: () => togglePlay(false) },
            { text: 'Rerecord', onPress: Actions.CameraScene },
            { text: 'Cancel', style: 'cancel' }
          ]
        );
      };
    } else {
      onButtonPress = () => togglePlay(!paused);
    }

    const videoDisplay =
      (<Video
        source={{ uri: source }}
        paused={originPaused}
        repeat
        rate={1.0}
        volume={1}
        muted={false}
        playInBackground
        playWhenInactive
        resizeMode={'contain'}
        onEnd={() => togglePlay(true)}
        style={styles.video}
      />);

    const display =
        (<View style={styles.wrapper}>
          <TouchableHighlight
            style={styles.playButtonContainer}
            onPress={onButtonPress}
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
  };

const styles = {
  container: {
    flex: 3.5,
    backgroundColor: 'black',
  },
  wrapper: {
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
};

export default EntryVideo;
