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
      if (entryData.status === 'expired') {
        bannerText = 'EXPIRED REQUEST';
      }
    } else {
      bannerText = 'RECEIVED';
    }
  } else {
    bannerText = 'THANKS FOR';
  }
  const expired = entryData.status === 'expired';

  return (
    <View style={{ flex: 1 }}>
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
      <DetailSection contentStyle={{ flexDirection: 'column' }} bannerStyle={{ padding: 10, }} bannerText={bannerText}>
        <RequestPizzas size='large' pizzas={pizzas} />
        <Text style={styles.requestTextStyle}>from</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
          <Vendor vendor={vendor} selected />
        </View>

        <DetailSection>
          <Button
            touchableOpacity
            onPress={expired ? null : onButtonPress}
            textStyle={styles.donateTextStyle}
            buttonStyle={expired ? styles.expired : styles.buttonStyle}
          >
          {buttonText}
          </Button>
        </DetailSection>
      </DetailSection>
    </View>
  );
};

const styles = {
  requestTextStyle: {
    fontWeight: 'bold',
    padding: 5,
    fontSize: 24,
    alignSelf: 'center',
  },
  buttonStyle: {
    backgroundColor: '#ce0000',
    margin: 20,
    elevation: 1,
  },
  donateTextStyle: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 30,
    paddingVertical: 5,
    marginHorizontal: 20,
  },
  expired: {
    backgroundColor: '#999',
    margin: 20,
    borderColor: '#999',
  }
};

export default EntryDetails;
