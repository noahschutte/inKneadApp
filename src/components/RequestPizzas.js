import React from 'react';
import { View, Image } from 'react-native';
import { wholePizzaImage } from '../assets';

const RequestPizzas = ({ pizzas, size, style }) => {
  const pizzaImages = [];
  let pizzaStyle;
  switch (size) {
    case 'large':
      pizzaStyle = styles.pizzaImageLarge;
      break;
    case 'medium':
      pizzaStyle = styles.pizzaImageMedium;
      break;
    case 'small':
    default:
      pizzaStyle = styles.pizzaImageSmall;
  }
  for (let i = 0; i < pizzas; i++) {
    const pizzaImage = (
      <Image
        style={pizzaStyle}
        source={wholePizzaImage}
        key={i}
      />
    );
    pizzaImages.push(pizzaImage);
  }

  return (
    <View style={[styles.pizzas, style]}>
      {pizzaImages}
    </View>
  );
};

const styles = {
  pizzaImageSmall: {
    width: 20,
    height: 20,
  },
  pizzaImageMedium: {
    width: 38,
    height: 38,
    margin: 4,
  },
  pizzaImageLarge: {
    width: 50,
    height: 50,
    margin: 3,
  },
  pizzas: {
    flexDirection: 'row',
    alignSelf: 'center',
    margin: 2,
  },
};

export default RequestPizzas;
