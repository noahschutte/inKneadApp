import React, { Component } from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import ProfileButton from './ProfileButton';
import NewRequestButton from './NewRequestButton';
import BackButton from './BackButton';
import Activity from './Activity';
import MenuButton from './MenuButton';
import InfoButton from './InfoButton';
import GlobalStyles from 'InKneadStyle';

export default class Nav extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(nextProps) {
    if (this.props.isOpen === nextProps.isOpen && this.props.isOpen) {
      this.props.toggleMenu(false);
    }
  }
  render() {
    let leftButton;
    let center;
    let rightButton;

    if (this.props.backButton) {
      leftButton = <BackButton {...this.props} />;
    } else if (this.props.navigator.state.routeStack[0].name === 'main') {
      leftButton = <MenuButton {...this.props} />;
      rightButton = <NewRequestButton {...this.props} />;
      center = <Activity currentScope={this.props.currentScope} changeScope={this.changeScope} {...this.props} />;
    }

    const statusBarHidden = false;
    return (
      <View style={GlobalStyles.nav}>
        <StatusBar
          hidden={statusBarHidden}
        />
        <View style={styles.leftBox}>
          {leftButton}
        </View>
        <View style={styles.centerBox}>
          {center}
        </View>
        <View style={styles.rightBox}>
          {rightButton}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftBox: {
    flex: 1,
  },
  centerBox: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightBox: {
    flex: 1,
  },
});
