import React, { Component } from 'react';
import { View } from 'react-native';
import {
  IndicatorViewPager,
  PagerDotIndicator
} from 'rn-viewpager';
import EntryVideo from '../EntryVideo';

class HowToScene extends Component {
  state = {
    introPaused: true,
    requestPaused: true,
    donatePaused: true,
    introNumber: 1,
    requestNumber: 1,
    donateNumber: 1
  }
  componentDidMount() {
    this.setState({ introNumber: this.randomNumber(4) });
    this.setState({ requestNumber: this.randomNumber(2) });
    this.setState({ donateNumber: this.randomNumber(3) });
  }
  _renderDotIndicator() {
    return (
      <PagerDotIndicator
        pageCount={3}
        dotStyle={{ backgroundColor: '#cecccc' }}
        selectedDotStyle={{ backgroundColor: '#ce0000' }}
      />
    );
  }
  toggleIntroPlay = (toggle) => {
    this.setState({ introPaused: toggle });
  }
  toggleRequestPlay = (toggle) => {
    this.setState({ requestPaused: toggle });
  }
  toggleDonatePlay = (toggle) => {
    this.setState({ donatePaused: toggle });
  }
  randomNumber = (range) => {
    return Math.floor(Math.random() * range) + 1;
  }
  render() {
    const {
      container,
    } = styles;
    return (
      <View style={container}>
        <IndicatorViewPager
          style={container}
          indicator={this._renderDotIndicator()}
          onPageScroll={() => this.setState({ introPaused: true, requestPaused: true, donatePaused: true, })}
        >
          <View style={{ flex: 1 }}>
            <EntryVideo
              source={`https://s3.amazonaws.com/in-knead/howTo/intro/intro${this.state.introNumber}.MOV`}
              paused={this.state.introPaused}
              togglePlay={this.toggleIntroPlay}
            />
          </View>

          <View style={{ flex: 1 }}>
            <EntryVideo
               source={`https://s3.amazonaws.com/in-knead/howTo/request/noah${this.state.requestNumber}.mov`}
               paused={this.state.requestPaused}
               togglePlay={this.toggleRequestPlay}
            />
          </View>

          <View style={{ flex: 1 }}>
            <EntryVideo
               source={`https://s3.amazonaws.com/in-knead/howTo/donate/jamo${this.state.donateNumber}.mov`}
               paused={this.state.donatePaused}
               togglePlay={this.toggleDonatePlay}
            />
          </View>

        </IndicatorViewPager>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  }
};

export default HowToScene;
