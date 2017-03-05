import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import ViewPager from 'rn-viewpager';

const deviceWidth = Dimensions.get('window').width;

const PAGES = [
  'http://www.hdiphone6pluswallpaper.com/wp-content/uploads/Architecture/Beautiful%20night%20building%20iphone%206%20plus%20wallpaper.jpg',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
];

export default class HowTo extends Component {
  constructor(props) {
    super(props);

    const ds = new ViewPager.DataSource({
      pageHasChanged: (p1, p2) => p1 !== p2,
    });
    this.state = {
      dataSource: ds.cloneWithPages(PAGES),
    };
  }
  _renderPage(data, pageID) {
    return (
      <Image
        source={{ uri: data }}
        style={styles.page}
      />
    );
  }
  render() {
    return (
      <ViewPager
        style={this.props.viewpageStyle}
        dataSource={this.state.dataSource}
        renderPage={this._renderPage}
        isLoop
      />
    );
  }
}

// animation = {(animatedValue, toValue, gestureState) => {
// // Use the horizontal velocity of the swipe gesture
// // to affect the length of the transition so the faster you swipe
// // the faster the pages will transition
// var velocity = Math.abs(gestureState.vx);
// var baseDuration = 300;
// var duration = (velocity > 1) ? 1/velocity * baseDuration : baseDuration;
//
// return Animated.timing(animatedValue,
//   {
//     toValue: toValue,
//     duration: duration,
//     easing: Easing.out(Easing.exp)
//   });
// }}

const styles = StyleSheet.create({
  page: {
    width: deviceWidth,
  },
});
