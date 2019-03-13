import React, {Component} from 'react';
import NowPlayingScreen from './components/NowPlayingScreen';
import SearchScreen from './components/SearchScreen';
import ListsScreen from './components/ListsScreen';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
  "Now Playing": NowPlayingScreen,
  Search: SearchScreen,
  Lists: ListsScreen,
});

export default createAppContainer(TabNavigator);