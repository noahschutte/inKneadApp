import React, { Component } from 'react';
import { View } from 'react-native';
import {
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerTabIndicator,
  PagerDotIndicator
} from 'rn-viewpager';
import EntryVideo from '../EntryVideo';
import {
  leftCaretImage,
} from '../../assets';

class HowToScene extends Component {
  state = {
    introPaused: true,
    requestPaused: true,
    donatePaused: true
  }
  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['Update Email', 'Donate', 'Request']} />;
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
  _renderTabIndicator() {
    const tabs = [{
      text: 'Step 1',
      iconSource: leftCaretImage,
      selectedIconSource: leftCaretImage
    }, {
      text: 'Step 2',
      iconSource: leftCaretImage,
      selectedIconSource: leftCaretImage
    }, {
      text: 'Step 3',
      iconSource: leftCaretImage,
      selectedIconSource: leftCaretImage
    }];
    return <PagerTabIndicator tabs={tabs} />;
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
  render() {
    const {
      container,
    } = styles;
    return (
      <View style={container}>
        <IndicatorViewPager
          style={container}
          indicator={this._renderDotIndicator()}
        >
          <View style={{ flex: 1 }}>
            <EntryVideo
              source={'https://s3.amazonaws.com/in-knead/howTo/intro/intro1.MOV'}
              paused={this.state.introPaused}
              togglePlay={this.toggleIntroPlay}
            />
          </View>

          <View style={{ flex: 1 }}>
            <EntryVideo
               source={'https://s3.amazonaws.com/in-knead/howTo/request/noah1.mov'}
               paused={this.state.requestPaused}
               togglePlay={this.toggleRequestPlay}
            />
          </View>

          <View style={{ flex: 1 }}>
            <EntryVideo
               source={'https://s3.amazonaws.com/in-knead/howTo/donate/jamo1.mov'}
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
  },
  steps: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  oval: {
    flex: 3,
    resizeMode: 'contain',
    width: 200,
    height: null,
  },
  text: {
    fontSize: 30,
    fontFamily: 'GillSans',
    // need specific font, using this as template
    textAlign: 'center',
    flex: 0.5,
    paddingTop: 25,
  },
  textBottom: {
    fontSize: 20,
    fontFamily: 'GillSans',
    textAlign: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  icon: {
    width: 100,
    alignSelf: 'center',
    flex: 1,
    resizeMode: 'contain',
  },
  threeB: {
    width: 50,
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 15,
  },
};

export default HowToScene;
