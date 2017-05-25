import React from 'react';
import { View, Image } from 'react-native';
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
      <DetailSection bannerText='HOW MANY PIZZAS?' />
      <PizzaRadioButton
        selectedImage={selectedPizzaImage}
        unselectedImage={unselectedPizzaImage}
        options={[1, 2, 3]}
        selectedOption={pizzas}
        onPress={updateSelectedPizzas}
      />
      <DetailSection bannerText='VENDORS' />
      <VendorRadioButton
        vendors={['Dominos', 'Papa Johns', 'Pizza Hut']}
        onPress={updateSelectedVendor}
        selectedVendor={vendor}
      />
      <DetailSection>
        <Button onPress={handleRequestSubmission} textStyle={styles.buttonTextStyle} buttonStyle={styles.buttonStyle} touchableOpacity>
          REQUEST
        </Button>
      </DetailSection>
    </View>
  );
};

const styles = {
  selectedImageStyle: {
    width: 50,
    height: 50,
    marginVertical: 10,
    marginHorizontal: 5,
    },
  unselectedImageStyle: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 50,
    height: 50,
    opacity: 0.5,
  },
  buttonStyle: {
    backgroundColor: '#ce0000',
    margin: 20,
  },
  buttonTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 30,
    paddingVertical: 5,
    marginHorizontal: 25,
  }
};

export default EntryCreationForm;
