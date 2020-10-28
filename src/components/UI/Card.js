import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const Card = props => {
    return (
        <View style={{ ...props.style, ...styles.card}}>
            {props.children}
        </View>
    )
};

const styles = StyleSheet.create({
    card: {
        width: Dimensions.get('window').width * 0.8,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 10,
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 1
    }
});

export default Card;