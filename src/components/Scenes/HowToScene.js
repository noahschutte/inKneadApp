import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import {
  IndicatorViewPager,
  PagerTitleIndicator,
  PagerTabIndicator,
  PagerDotIndicator
} from 'rn-viewpager';
import {
  leftCaretImage,
  ovalImage,
  stepOneImage,
  stepTwoImage,
  stepThreeA,
  stepThreeB,
} from '../../assets';

class HowToScene extends Component {
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
  render() {
    const {
      container,
      steps,
      text,
      icon,
      oval,
      textBottom,
      threeB,
    } = styles;
    return (
      <View style={container}>
        <IndicatorViewPager
          style={container}
          indicator={this._renderDotIndicator()}
        >

          <View style={steps}>
            <Text style={text}>Step 1</Text>
            <Image style={oval} source={ovalImage}>
              <Image style={icon} source={stepOneImage} />
            </Image>
            <Text style={textBottom}>Watch a video request, {'\n'}or make your own</Text>
          </View>

          <View style={steps}>
            <Text style={text}>Step 2</Text>
            <Image style={oval} source={ovalImage}>
              <Image style={icon} source={stepTwoImage} />
            </Image>
            <Text style={textBottom}>Choose what to donate or request</Text>
          </View>

          <View style={steps}>
            <Text style={text}>Step 3</Text>
            <Image style={oval} source={ovalImage}>
              <Image style={icon} source={stepThreeA}>
                <Image style={threeB} source={stepThreeB} />
              </Image>
            </Image>
            <Text style={textBottom}>send (or receive) your Gratitude!</Text>
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
