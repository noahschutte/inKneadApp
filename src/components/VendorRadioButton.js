import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Vendor from './Vendor';


class VendorRadioButton extends Component {
  getStyle = (vendorName) => {
    if (vendorName === this.props.selectedVendor) {
      return {
        width: 55,
        height: 55,
        resizeMode: 'contain',
      };
    }
    return {
      margin: 2.5,
      width: 50,
      height: 50,
      resizeMode: 'contain',
      opacity: 0.2,
    };
  }

  assembleVendors = () => {
    const selected = this.props.selectedVendor;

    const dominos = <Vendor vendor='Dominos' selected={selected === 'Dominos'} />;
    const papas = <Vendor vendor='Papa Johns' selected={selected === 'Papa Johns'} />;
    const pizzaHut = <Vendor vendor='Pizza Hut' selected={selected === 'Pizza Hut'} />;

    return [dominos, papas, pizzaHut];
  }


  renderContent = () => {
    const { onPress } = this.props;
    const vendors = this.assembleVendors();
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
  }

  render() {
    const content = this.renderContent();
    return content;
  }
}

const styles = {
  container: {
    alignSelf: 'stretch',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
};

export default VendorRadioButton;
