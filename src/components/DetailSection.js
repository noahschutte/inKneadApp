import React from 'react';
import { View, Text, Platform } from 'react-native';

const DetailSection = ({ bannerText, children, style, contentStyle }, props) => {
  const { bannerStyle, bannerTextStyle, contentStyling, placeholderStyle } = styles;
  let banner;

  if (bannerText) {
    banner = (
      <View style={[bannerStyle, props.bannerStyle]}>
        <Text style={bannerTextStyle}>{bannerText}</Text>
      </View>
    );
  }
  let content;
  if (typeof children === 'string') {
    content = (
      <View style={[contentStyling, contentStyle]}>
        <Text style={placeholderStyle}>{children}</Text>
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
    // padding: 5,
  },
  bannerTextStyle: {
    color: '#fff',
    fontSize: 24,
    fontFamily: Platform.OS === 'ios' ? 'AvenirNextRegular' : 'sans-serif-thin',
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
