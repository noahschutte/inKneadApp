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
  reportVideo,
  blockUser,
  shouldUserBeHere,
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
              disabled={!userID || userID === entryData.creatorId || !shouldUserBeHere}
            />
            <MenuOption
              value={() => Alert.alert(
                'Block user?',
                'Doing so will hide all content from this user.',
                [
                  { text: 'Nevermind' },
                  {
                    text: 'Block',
                    onPress: blockUser
                  }
                ]
              )}
              text='Block User'
              disabled={!userID || userID === entryData.creatorId || !shouldUserBeHere}
            />
          </MenuOptions>
        </Menu>
      </DetailSection>
      <DetailSection bannerStyle={{ padding: 10, }} bannerText={bannerText}>
        <RequestPizzas size='large' pizzas={pizzas} />
      </DetailSection>
      <Text style={styles.requestTextStyle}>from</Text>
      <View style={{ justifyContent: 'center', alignItems: 'center', }}>
        <Vendor vendor={vendor} selected />
      </View>

      <DetailSection>
        <Button touchableOpacity onPress={onButtonPress} textStyle={styles.donateTextStyle} buttonStyle={styles.buttonStyle}>
        {buttonText}
        </Button>
      </DetailSection>
    </View>
  );
};

const styles = {
  requestTextStyle: {
    fontWeight: 'bold',
    padding: 10,
    fontSize: 24,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#ce0000',
    margin: 20,
  },
  donateTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 30,
    paddingVertical: 5,
    marginHorizontal: 20,
  }
};

export default EntryDetails;
