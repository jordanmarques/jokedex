import React from 'react';
import {Image, StyleSheet, View, YellowBox} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ListPage from "./pages/list/ListPage";
import DetailPage from "./pages/detail/DetailPage";
import Text from "react-native-elements/src/text/Text";

//should be removed after react fix
YellowBox.ignoreWarnings([
    'Warning: componentWillMount is deprecated',
    'Warning: componentWillReceiveProps is deprecated',
]);

const backgroundColor = '#f72a2a'

const styles = StyleSheet.create({
    alignVertically: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    header: {
        backgroundColor: backgroundColor,
    },
    title: {
        margin: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    pokeball: {
        marginLeft:20,
        height: 30,
        width: 30
    }
});

export default StackNavigator(
    {
        Home: {
            screen: ListPage,
        },
        Detail: {
            screen: DetailPage,
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions: {
            headerTitle: (
                <View style={styles.header}>
                    <View style={styles.alignVertically}>
                        <Image style={styles.pokeball} source={require('./assets/images/pokeball.png')}/>
                        <Text style={styles.title}>Jokedex</Text>
                    </View>
                </View>

            ),
            headerStyle: {
                backgroundColor: backgroundColor
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        }

    }
);