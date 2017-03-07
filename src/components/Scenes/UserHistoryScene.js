import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getUserHistory } from '../../actions';
import Entries from '../Entries';

class UserHistoryScene extends Component {
  componentDidMount() {
    this.props.getUserHistory(this.props.userID);
  }

  render() {
    const {
      userHistoryEntries,
      userID,
      loading
    } = this.props;
    console.log(userHistoryEntries);
    return (
      <View style={{ flex: 1 }}>
        <Entries
          origin='UserHistoryScene'
          entryRows={userHistoryEntries}
          getEntries={() => this.props.getUserHistory(userID)}
          anonID={userID}
          loading={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ entries }) => {
  const {
    userHistoryEntries,
    loading
  } = entries;
  return {
    userHistoryEntries,
    loading
  };
};

export default connect(mapStateToProps, { getUserHistory })(UserHistoryScene);
