import React, { Component } from 'react';
import { View, WebView, StyleSheet } from 'react-native';

export default class WebViewExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectUri: 'inkneadscheme://response',
      responseType: 'token',
      clientId: 'djH1sd6Q0amUNw',
      duration: 'permanent',
      scope: 'identity',
      url: undefined,
      status: undefined,
      state: undefined,
      accessToken: undefined,
      returnState: undefined,
      tokenType: undefined,
    };
    this.onLoad = this.onLoad.bind(this);
    this.onNavigationStateChange = this.onNavigationStateChange.bind(this);
  }
  componentWillMount() {
    this.setState({ state: this.state.clientId + Date.now() });
  }
  // 'Accept': 'application/json',
  // 'Content-Type': 'application/json',
  // 'access_token': this.state.access_token,
  // 'state': this.state.state,
  // 'client_id': this.state.clientId,
  // method: 'POST',
  // body: `grant_type=authorization_code&code=${this.state.code}&redirect_uri=${this.state.redirectUri}`,
  // 'scope': 'identity',
  // 'User-Agent': `${this.state.cliendId}/0.1 by noahschutte`
  fetchRedditToken() {
    fetch('https://oauth.reddit.com/api/v1/me', {
      headers: {
        Authorization: `bearer ${this.state.accessToken}`,
      },
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('responseJson', responseJson);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  fetchRedditRefreshToken() {
    fetch('https://www.reddit.com/api/v1/access_token', {
      headers: {
        scope: 'identity',
        Authorization: `bearer${this.state.accessToken}`
      },
      method: 'POST',
      body: `grant_type=refresh_token&refresh_token=${this.state.accessToken}`
    })
    .then((response) => {
      console.log('response', response);
    })
    .catch((error) => {
      console.error(error);
    });
  }
  onNavigationStateChange = (navState) => {
    this.setState({
      url: navState.url,
      status: navState.title,
    });
  };
  onLoad() {
    if (this.state.url.indexOf('#') > -1) {
      const queryString = this.state.url.split('#');
      const vars = queryString[1].split('&');
      for (let i = 0; i < vars.length; i += 1) {
        const pair = vars[i].split('=');
        if (pair[0] === 'access_token') {
          const accessToken = pair[1];
          this.setState({ accessToken });
        } else if (pair[0] === 'state') {
          const returnState = pair[1];
          this.setState({ returnState });
        } else if (pair[0] === 'token_type') {
          const tokenType = pair[1];
          this.setState({ tokenType });
        }
      }
    }
  }

  render() {
    if (this.state.accessToken && this.state.state === this.state.returnState) {
      console.log('this.state', this.state);
      this.fetchRedditToken();
    }

    const real = `https://www.reddit.com/api/v1/authorize.compact?client_id=${this.state.clientId}&response_type=${this.state.responseType}&state=${this.state.state}&redirect_uri=${this.state.redirectUri}&scope=${this.state.scope}`;

    return (
      <View style={styles.container}>
        <WebView
          onNavigationStateChange={this.onNavigationStateChange}
          onLoad={this.onLoad}
          source={{ uri: real }}
          style={styles.webView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    marginTop: 20,
  }
});
