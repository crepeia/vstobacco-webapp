import React from 'react';
import { Text, StyleSheet } from 'react-native';

const DefaultTitle = props => {
    return <Text {...props} style={{ ...styles.text, ...props.style }}>{props.children}</Text>
}

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        textAlign: 'center'
    }
});

export default DefaultTitle;