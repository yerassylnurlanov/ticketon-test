import React from 'react';

export const themes = {
  dark: {
    name: 'Dark',
    mainBackground: 'black',
    fontMain: 'white',
    fontDesc: 'grey',
    separator: 'black',
    headerBarBackground: '#043545',
    headerBarTint: '#F5F5F5',
    homeBackground: '#255B6D',
    background: '#255B6D',
    homeTileBackground: '#043545',
    red: '#cd2027',
    price: '#cd2027',
    discount: '#cd2027',
    orangeRating: '#FE7400',
    green: '#029547',
    appBar: '#263238',
    appBarFont: 'white',
    blueFont: '#022432',
    btnRedFab: '#C44400',
    accentColor: '#C44400',
    font: 'white'
  },
  light: {
    name: 'Light',
    mainBackground: '#F0F0F0',
    fontMain: '#043545',
    fontDesc: 'grey',
    separator: '#F5F5F5',
    headerBarBackground: '#DA5500',
    headerBarTint: 'white',
    homeBackground: '#F4F4F4',
    homeTileBackground: '#FFFFFF',
    red: '#cd2027',
    price: '#cd2027',
    discount: '#cd2027',
    orangeRating: '#FE7400',
    green: '#029547',
    appBar: '#FF7000',
    appBarFont: 'white',
    blueFont: '#022432',
    btnRedFab: '#C44400',
    accentColor: '#cd2027',
    yellowRating: '#FFA541',
  }
};

export const ThemeContext = React.createContext();
