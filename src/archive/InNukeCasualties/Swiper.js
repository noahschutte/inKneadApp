import React, { Component } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { IndicatorViewPager, PagerTitleIndicator, PagerTabIndicator, PagerDotIndicator } from 'rn-viewpager';

export default class Swiper extends Component {
  _renderTitleIndicator() {
    return <PagerTitleIndicator titles={['Update Email', 'Donate', 'Request']} />;
  }
  _renderDotIndicator() {
    return <PagerDotIndicator pageCount={3} />;
  }
  _renderTabIndicator() {
    const tabs = [{
      text: 'Step 1',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    }, {
      text: 'Step 2',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    }, {
      text: 'Step 3',
      iconSource: require('../../assets/left_caret.png'),
      selectedIconSource: require('../../assets/left_caret.png')
    }];
    return <PagerTabIndicator tabs={tabs} />;
  }
  render() {
    return (
      <View style={styles.container}>
        <IndicatorViewPager
          style={{ flex: 1 }}
          indicator={this._renderDotIndicator()}
        >

          <View style={styles.steps}>
            <Text style={styles.text}>How It Works{'\n'}(Step 1)</Text>
            <Image source={require('../../assets/how-to-page/Oval.png')} style={styles.oval} >
              <Image style={styles.icon} source={require('../../assets/how-to-page/stepOneImage.png')} />
            </Image>
            <Text style={styles.textBottom}>watch a video request,{'\n'}or make it your own</Text>
          </View>

          <View style={styles.steps}>
            <Text style={styles.text}>How It Works{'\n'}(Step 2)</Text>
            <Image source={require('../../assets/how-to-page/Oval.png')} style={styles.oval} >
              <Image style={styles.icon} source={require('../../assets/how-to-page/stepTwo.png')} />
            </Image>
            <Text style={styles.textBottom}>choose what you want{'\n'}to donate, and receive{'\n'}donations</Text>
          </View>

          <View style={styles.steps}>
            <Text style={styles.text}>How It Works{'\n'}(Step 3)</Text>
            <Image source={require('../../assets/how-to-page/Oval.png')} style={styles.oval} >
              <Image style={styles.icon} source={require('../../assets/how-to-page/Step3-B.png')}>
                <Image style={styles.threeA} source={require('../../assets/how-to-page/Step3-A.png')} />
              </Image>
            </Image>
            <Text style={styles.textBottom}>send a THANK YOU to{'\n'}the awesome person who{'\n'}just gave you pizza!</Text>
          </View>

        </IndicatorViewPager>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
    // paddingBottom: 25,
  },
  text: {
    fontSize: 30,
    fontFamily: 'GillSans',
    // need specific font, using this as template
    textAlign: 'center',
    flex: 1,
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
    width: 120,
    // height: 100,
    alignSelf: 'center',
    flex: 1,
    resizeMode: 'contain',
  },
  threeA: {
    width: 70,
    flex: 1,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginBottom: 15,
  }
});
