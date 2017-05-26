import React from 'react';
import { View } from 'react-native';
import PlatformText from './PlatformText';

const DetailSection = ({ bannerText, children, style, contentStyle }, props) => {
  const { bannerStyle, bannerTextStyle, contentStyling, placeholderStyle } = styles;
  let banner;

  if (bannerText) {
    banner = (
      <View style={[bannerStyle, props.bannerStyle]}>
        <PlatformText type='thin' textStyle={bannerTextStyle}>{bannerText}</PlatformText>
      </View>
    );
  }
  let content;
  if (typeof children === 'string') {
    content = (
      <View style={[contentStyling, contentStyle]}>
        <PlatformText textStyle={placeholderStyle}>{children}</PlatformText>
      </View>
    );
  } else {
    content = (
      <View style={[contentStyling, contentStyle]}>
        {children}
      </View>
    );
  }

  return (
    <View style={style}>
      {banner}
      {content}
    </View>
  );
};

const styles = {
  bannerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#48beda',
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: 'stretch',
    padding: 5,
  },
  bannerTextStyle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  contentStyling: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignSelf: 'stretch',
    padding: 5,
  },
  placeHolderStyle: {
    paddingTop: 5,
    paddingBottom: 5
  }
};

export default DetailSection;
