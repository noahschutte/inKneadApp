import React from 'react';
import { View, Text } from 'react-native';

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
    <View style={[{ margin: 3, backgroundColor: 'white', borderRadius: 2 }, style]}>
      {banner}
      {content}
    </View>
  );
};

const styles = {
  bannerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#ce0000',
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: 'stretch',
    padding: 5,
  },
  bannerTextStyle: {
    color: '#fff'
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
