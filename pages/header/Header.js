import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

export default class Header extends React.Component {
    render() {
        return (
            <View style={styles.header}>
                <View style={styles.alignVertically}>
                    <Image style={styles.pokeball} source={require('../../assets/images/pokeball.png')}/>
                    <Text style={styles.title}>Jokedex</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    alignVertically: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#f72a2a',
    },
    title: {
        margin: 10,
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    pokeball: {
        height: 30,
        width: 30
    }
});