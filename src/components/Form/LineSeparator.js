import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import DefaultTitle from '../DefaultTitle'
import Colors from '../../constants/Colors';

const LineSeparator = props => {

    return (
        <View style={styles.lineSeparator}>
            <View style={styles.line}/>
            <DefaultTitle style={styles.title}>{props.title}</DefaultTitle>
            <View style={styles.line}/>
        </View>
    )
}

const styles = StyleSheet.create({
    lineSeparator:
    {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 25,
    },
    line:
    {
        width: 70,
        borderBottomWidth: 2,
        borderColor: 'white'
    },
    title: 
    {
        textAlign: 'center',
        color: 'white',
        fontSize: 22,
    }
});

export default LineSeparator;