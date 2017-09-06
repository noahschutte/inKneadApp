import React, { Component } from 'react';
import { View, Text, Image, Linking } from 'react-native';
import { connect } from 'react-redux';
import { loadingPizzaImage } from '../../assets';
import Button from '../Button2';

class AboutScene extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topHalf}>
          <Image source={loadingPizzaImage} style={styles.pizzaImageStyle} />
          <Text style={[styles.pizzasTextStyle, styles.textStyle]}>{this.props.pizzas} PIZZAS</Text>
          <Text style={[styles.donationTextStyle, styles.textStyle]}>DONATED THROUGH {'\n'} IN KNEAD!</Text>
        </View>
        <View style={styles.bottomHalf}>
          <Text style={[styles.bottomTextStyle, styles.textStyle]}>
            "THE POWER OF HUMAN KINDNESS,{'\n'}ONE PIZZA AT A TIME."
            {'\n'}contact: <Text style={{ fontWeight: 'bold' }}>noah@noahschutte.com</Text>
          </Text>
          <Button
            onPress={() => Linking.openURL('https://www.inknead.pizza')}
            touchableOpacity
            buttonStyle={{ backgroundColor: '#ce0000', marginVertical: 25 }}
            textStyle={styles.hyperlink}
          >
            www.inknead.pizza
          </Button>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  topHalf: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  bottomHalf: {
    alignItems: 'center',
    flex: 1,
  },
  pizzaImageStyle: {
    resizeMode: 'contain',
    width: 102,
    height: 102,
  },
  textStyle: {
    textAlign: 'center',
  },
  pizzasTextStyle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ce0000',
  },
  donationTextStyle: {
    fontSize: 24,
  },
  bottomTextStyle: {
    fontSize: 18,
    lineHeight: 30,
  },
  hyperlink: {
    color: 'white',
    fontSize: 24,
  }
};

const mapStateToProps = ({ entries }) => {
  const pizzas = entries.totalDonatedPizzas;
  return { pizzas };
};

export default connect(mapStateToProps, {})(AboutScene);
