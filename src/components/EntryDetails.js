import React from 'react';
import { View, Text, Alert } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import DetailSection from './DetailSection';
import Button from './Button2';
import TimeAgo from './TimeAgo';
import RequestPizzas from './RequestPizzas';
import Vendor from './Vendor';


const EntryDetails = ({
  userID,
  entryData,
  navigateToUser,
  onButtonPress,
  buttonText,
  showUserHistory,
  reportVideo
}) => {
  const { pizzas, vendor, seconds, creatorId } = entryData;
  let bannerText;

  if (entryData.type === 'request') {
    if (entryData.donorId === null) {
      bannerText = 'REQUESTED';
    } else {
      bannerText = 'RECEIVED';
    }
  } else {
    bannerText = 'THANKS FOR';
  }

  return (
    <View style={{ flex: 5 }}>
      <DetailSection contentStyle={{ justifyContent: 'space-between' }}>
        <TimeAgo secondsOld={seconds} />
        <Menu onSelect={value => value()} style={styles.userHistoryButton}>
          <MenuTrigger text=' ... ' customStyles={{ triggerText: { fontSize: 16, fontWeight: 'bold' } }} />
          <MenuOptions>
            <MenuOption
              value={() => navigateToUser(creatorId)}
              text='User History'
              disabled={!showUserHistory}
            />
            <MenuOption
              value={() => Alert.alert(
                'Report video?',
                'Please only report videos with inappropriate content',
                [
                  { text: 'Nevermind' },
                  {
                    text: 'Report',
                    onPress: reportVideo
                  }
                ]
              )}
              text='Report Video'
              disabled={!userID || userID === entryData.creatorId}
            />
          </MenuOptions>
        </Menu>
      </DetailSection>

      <DetailSection bannerText={bannerText}>
        <RequestPizzas size='large' pizzas={pizzas} />
        <Text style={styles.requestTextStyle}>from</Text>
        <Vendor size='large' vendor={vendor} />
      </DetailSection>

      <View style={styles.buttonWrapper}>
        <Button touchableOpacity onPress={onButtonPress}>
          <Text style={styles.donateTextStyle}>{buttonText}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = {
  requestTextStyle: {
    fontWeight: 'bold',
    padding: 10,
    alignSelf: 'center',
  },
  buttonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  userHistoryText: {
    color: 'black',
    textDecorationLine: 'underline',
    padding: 0,
    margin: 0,
  },
  userHistoryButton: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
    borderColor: 'black',
  },
  donateTextStyle: {
    alignSelf: 'center',
    color: '#ce0000',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 20,
    textShadowColor: '#ccc',
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 2,
  }
};

export default EntryDetails;
