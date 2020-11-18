import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

const NumberInput = props =>
{
    const numberInputHandler = inputText =>
    {
        if (props.type === 'int') {
            props.onValueChange(inputText.replace(/[^0-9]/g, ''));
        } else {
            props.onValueChange(inputText.replace(!/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/g, ''));
        }
    }

    return (
        <TextInput
            {...props}
            style={{ ...styles.textInput, ...props.style }}
            blurOnSubmit 
            autoCaptalize='none' 
            autoCorrect={false} 
            keyboardType='number-pad'
            onChangeText={numberInputHandler}
        />
    )
}

const styles = StyleSheet.create({
    textInput: {
        minWidth: 40,
        height: 30,
        textAlign: 'center',
        borderBottomColor: Colors.primaryColor,
        borderBottomWidth: 1,
        color: Colors.primaryColor,
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    }
});

export default NumberInput