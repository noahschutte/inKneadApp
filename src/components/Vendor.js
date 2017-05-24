import React from 'react';
import { Image } from 'react-native';
import {
  dominosVendorImage,
  papasVendorImage,
  pizzaHutVendorImage,
  hexagon
} from '../assets';

const Vendor = ({ vendor }) => {
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

  const vendorImage = (
    <Image source={vendorImageSource} style={styles.vendorImage} />
  );

  return (
    <Image style={styles.container} source={hexagon}>
      {vendorImage}
    </Image>
  );
};

const styles = {
  container: {
    margin: 2,
    width: 60,
    height: 60,
    alignItems: 'center',
  },
  vendorImage: {
    width: 40,
    height: 40,
    flex: 1,
    resizeMode: 'contain',
  }
};

export default Vendor;
