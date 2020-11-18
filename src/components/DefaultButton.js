import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from './DefaultText';
const DefaultButton = props => {
    return (
        <TouchableOpacity disabled={props.disabled} style={ props.disabled ? styles.buttonDisabled : styles.button } onPress={props.onPress} activeOpacity={0.4} >
            <DefaultText style={styles.buttonText}>{props.children}</DefaultText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
		padding: 10,
		backgroundColor: Colors.primaryColor,
		borderRadius: 7,
        elevation: 2
	},
	buttonDisabled: {
		padding: 10,
		backgroundColor: Colors.primaryColor,
		borderRadius: 7,
        elevation: 2,
        opacity: 0.6
	},
	buttonText: {
		fontSize: 20,
		color: Colors.secondaryColor,
		textAlign: 'center',
	},
});

export default DefaultButton;