import React from 'react';
import { Text, View } from 'react-native';
import Button from './Button2';
import DetailSection from './DetailSection';

const ThankYouCreationForm = ({ handleThankYouSubmission }) => {
  return (
    <View style={{ flex: 5, justifyContent: 'space-around' }}>
      <DetailSection>
        <Text style={styles.mainText}>
          Send your donor some gratitude!
        </Text>
      </DetailSection>
      <DetailSection>
        <Text style={styles.subText}>
          Record a "Thank You" video and hit the button below to share the love!
        </Text>
      </DetailSection>
      <Button
        touchableOpacity
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonStyle}
        onPress={handleThankYouSubmission}
      >
        Thanks!
      </Button>
    </View>
  );
};

const styles = {
  mainText: {
    fontSize: 22,
    textAlign: 'center',
  },
  buttonText: {
    margin: 10,
    fontSize: 24,
  },
  buttonStyle: {
    margin: 15,
  },
  subText: {
    margin: 10,
    textAlign: 'center',
  }
};

export default ThankYouCreationForm;
