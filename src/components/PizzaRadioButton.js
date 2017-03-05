import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

const PizzaRadioButton = props => {
  const {
    options,
    selectedOption,
    selectedImage,
    unselectedImage,
    onPress
  } = props;

  const content = [];
  for (const option of options) {
    if (option > selectedOption) {
      content.push(unselectedImage);
    } else {
      content.push(selectedImage);
    }
  }

  return (
    <View style={styles.container}>
      {content.map((image, index) => {
        return (
          <TouchableWithoutFeedback onPress={() => onPress(index + 1)} key={index}>
            {image}
          </TouchableWithoutFeedback>
        );
      })}
    </View>
    );
};

const styles = {
  container: {
    alignSelf: 'center',
    marginBottom: 10,
    flexDirection: 'row',
  },
};

export default PizzaRadioButton;
