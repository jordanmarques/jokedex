import React from 'react';
import {YellowBox} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Pokemons from "./pages/pokemons/Pokemons";

//should be removed after react fix
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);


export default StackNavigator(
    {
        Home: {
            screen: Pokemons,
        },
    },
    {
        initialRouteName: 'Home',
    }
);