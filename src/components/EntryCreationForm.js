import React from 'react';
import { Text, View, Image } from 'react-native';
import { wholePizzaImage } from '../assets';
import DetailSection from './DetailSection';
import PizzaRadioButton from './PizzaRadioButton';
import VendorRadioButton from './VendorRadioButton';
import Button from './Button2';

const EntryCreationForm = props => {
  const {
    updateSelectedPizzas,
    pizzas,
    updateSelectedVendor,
    vendor,
    handleRequestSubmission
  } = props;
  const { selectedImageStyle, unselectedImageStyle } = styles;

  const selectedPizzaImage = (
    <Image source={wholePizzaImage} style={selectedImageStyle} />
  );
  const unselectedPizzaImage = (
    <Image source={wholePizzaImage} style={unselectedImageStyle} />
  );

  return (
    <View style={{ flex: 5 }}>
      <DetailSection bannerText='# OF PIZZAS' />
      <PizzaRadioButton
        selectedImage={selectedPizzaImage}
        unselectedImage={unselectedPizzaImage}
        options={[1, 2, 3]}
        selectedOption={pizzas}
        onPress={updateSelectedPizzas}
      />
      <DetailSection bannerText='VENDOR NEAR YOU' />
      <VendorRadioButton
        vendors={['Dominos', 'Papa Johns', 'Pizza Hut']}
        onPress={updateSelectedVendor}
        selectedVendor={vendor}
      />
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Button onPress={handleRequestSubmission} touchableOpacity>
          <Text style={styles.buttonTextStyle}>Submit Request</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = {
  selectedImageStyle: {
    width: 50,
    height: 50,
    margin: 5,
    },
  unselectedImageStyle: {
    margin: 5,
    width: 50,
    height: 50,
    opacity: 0.2,
  },
  buttonTextStyle: {
    textAlign: 'center',
    fontSize: 28,
    color: '#ce0000',
    padding: 15
  }
};

export default EntryCreationForm;
