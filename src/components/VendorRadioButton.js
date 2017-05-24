import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Vendor from './Vendor';


const VendorRadioButton = ({ selectedVendor, onPress }) => {
  const dominos = <Vendor vendor='Dominos' selected={selectedVendor === 'Dominos'} />;
  const papas = <Vendor vendor='Papa Johns' selected={selectedVendor === 'Papa Johns'} />;
  const pizzaHut = <Vendor vendor='Pizza Hut' selected={selectedVendor === 'Pizza Hut'} />;
  const vendors = [dominos, papas, pizzaHut];

  return (
    <View style={styles.container}>
      {vendors.map((vendor, index) => {
        return (
          <TouchableOpacity onPress={() => onPress(vendor.props.vendor)} key={index}>
            {vendor}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  container: {
    alignSelf: 'stretch',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export default VendorRadioButton;
