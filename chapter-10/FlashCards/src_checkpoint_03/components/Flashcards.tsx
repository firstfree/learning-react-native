import React from 'react';
import {
  createStackNavigator,
  createNavigationContainer
} from 'react-navigation';
import Logo from './Header/Logo';
import DeckScreen from './DeckScreen';
import CardScreen from './CardScreen';
import ReviewScreen from './ReviewScreen';

const headerOptions = {
  headerStyle: { backgroundColor: '#FFFFFF' },
  headerLeft: <Logo />
};

const navigator = createStackNavigator({
  Home: { screen: DeckScreen, navigationOptions: headerOptions },
  Review: { screen: ReviewScreen, navigationOptions: headerOptions },
  CardCreation: {
    screen: CardScreen,
    path: 'createCard/:deckID',
    navigationOptions: headerOptions
  }
});

const Flashcards = createNavigationContainer(navigator);

export default Flashcards;
