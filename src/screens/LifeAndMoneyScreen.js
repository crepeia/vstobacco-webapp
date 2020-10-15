import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

const LifeAndMoneyScreen = props => {
    return (
        <View style={styles.centered}>
            <Text>Life and Money Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default LifeAndMoneyScreen;