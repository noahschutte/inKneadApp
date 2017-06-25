import React from 'react';
import { Text, View, Image } from 'react-native';
import { flyingPizza } from '../assets';
import Button from './Button2';
import DetailSection from './DetailSection';
import PlatformText from './PlatformText';

const ThankYouCreationForm = ({ handleThankYouSubmission }) => {
  return (
    <View style={{ flex: 5, justifyContent: 'space-around' }}>
      <DetailSection>
        <PlatformText type='bold' textStyle={styles.mainText}>
          Wow, Pizza Delivered!
        </PlatformText>
      </DetailSection>
      <Image style={{ alignSelf: 'center' }} source={flyingPizza} />
      <DetailSection>
        <PlatformText type='medium' textStyle={styles.subText}>
          Before you eat the whole pie, why not send a quick thanks to the donor?
        </PlatformText>
      </DetailSection>
      <DetailSection>
        <Button
        touchableOpacity
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
        onPress={handleThankYouSubmission}
        >
            SEND
        </Button>
      </DetailSection>
    </View>
  );
};

const styles = {
  mainText: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonText: {
    marginHorizontal: 50,
    fontSize: 24,
    color: '#fff',
  },
  buttonStyle: {
    backgroundColor: '#ce0000',
    margin: 20,
  },
  subText: {
    fontSize: 18,
    margin: 10,
    textAlign: 'center',
  },
};

export default ThankYouCreationForm;
