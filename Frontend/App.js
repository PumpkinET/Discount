import React from 'react';
import StackNavigator from './src/TabNavigatorScreens/TabNavigatorScreen';
import GlobalStates from './src/states/GlobalStates';
console.disableYellowBox = true;

export default class App extends GlobalStates {
  render() {
    return (
      <StackNavigator screenProps={{that:this, navigation:this.props.navigation}}/>
    );
  }
}