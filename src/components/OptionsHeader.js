import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import DefaultTitle from './DefaultTitle';

const OptionsHeader = props => {

    return (
        <View style={styles.lineHeader}>
            <DefaultTitle style={styles.lineHeaderText}>
                {props.title}
            </DefaultTitle>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    lineHeader: {
        width: Dimensions.get('window').width * 0.9,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: Colors.primaryColor,
        marginVertical: 20
    },
    lineHeaderText: {
        color: Colors.primaryColor,
        fontSize: 22
    },
});

export default OptionsHeader;