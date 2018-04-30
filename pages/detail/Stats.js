import React from "react";
import {Image, StyleSheet, View} from "react-native";
import Text from "react-native-elements/src/text/Text";

export default class Elements extends React.PureComponent {
    render() {
        return (
            <View style={styles.element} elevation={7}>
                <View style={styles.row}>
                    {this.renderStats()}
                </View>
            </View>
        )
    }

    renderStats() {
        if (this.props.stats) {
            return (
                <View style={styles.row}>
                    <View style={styles.column}>
                        {this.viewForStat('attack')}
                        {this.viewForStat('defense')}
                        {this.viewForStat('hp')}
                    </View>
                    <View>
                        {this.viewForStat('special-attack')}
                        {this.viewForStat('special-defense')}
                        {this.viewForStat('speed')}
                    </View>

                </View>
            )
        } else {
            return (
                <View>
                    <Image source={require("../../assets/images/loader.gif")}/>
                </View>
            )
        }
    }

    viewForStat(name) {
        const value = this.props.stats.find((stat) => stat.stat.name === name).base_stat;
        return (
            <View style={styles.row}>
                <Text style={styles.statName}>{this.sanitize(name)}: </Text>
                <Text>{value}</Text>
            </View>
        )
    }

    sanitize(name) {
        var withoutDash = name.replace('-',' ');
        return withoutDash.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }
}

const styles = StyleSheet.create({
    element: {
        flex: 1,
        margin: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderColor: 'red',
        borderStyle: 'solid',
        backgroundColor: '#f0f0f5'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    column: {
        margin: 5
    },
    statName: {
        fontWeight: 'bold'
    }
});