import React from 'react';
import { View, Image } from 'react-native';
import {
  dominosVendorImage,
  papasVendorImage,
  pizzaHutVendorImage
} from '../assets';

const Vendor = ({ vendor, size }) => {
  let vendorImageSource;
  switch (vendor) {
    case 'Dominos':
      vendorImageSource = dominosVendorImage;
      break;
    case 'Papa Johns':
      vendorImageSource = papasVendorImage;
      break;
    case 'Pizza Hut':
      vendorImageSource = pizzaHutVendorImage;
      break;
    default:
      break;
  }

  let style;
  switch (size) {
    case 'large':
      style = styles.vendorImageLarge;
      break;
    default:
      style = styles.vendorImageSmall;
      break;
  }

  const vendorImage = (
    <Image source={vendorImageSource} style={style} />
  );

  return (
    <View style={styles.container}>
      {vendorImage}
    </View>
  );
};

const styles = {
  container: {
    margin: 2,
  },
  vendorImageSmall: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  vendorImageLarge: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  }
};

export default Vendor;
