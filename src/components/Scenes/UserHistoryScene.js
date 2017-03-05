import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { getEntries } from '../../actions';
import Entries from '../Entries';

class UserHistoryScene extends Component {
  componentDidMount() {
    this.props.getEntries(this.props.userID);
  }

  render() {
    const {
      userRequests,
      userFulfilled,
      userThankYous,
      userID,
      loading
    } = this.props;
    const entryRows = [...userRequests, ...userFulfilled, ...userThankYous];
    return (
      <View style={{ flex: 1 }}>
        <Entries
          origin='UserHistoryScene'
          entryRows={entryRows}
          getEntries={() => this.props.getEntries(userID)}
          loading={loading}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ entries }) => {
  const {
    userRequests,
    userFulfilled,
    userThankYous,
    loading
  } = entries;
  return {
    userRequests,
    userFulfilled,
    userThankYous,
    loading
  };
};

export default connect(mapStateToProps, { getEntries })(UserHistoryScene);
