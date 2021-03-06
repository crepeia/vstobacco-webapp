import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors'

const FormTextInput = props => {

    return (
        <View style={styles.inputContainer}>
            <DefaultText style={{...styles.title, color: props.titleColor}}>{props.title}</DefaultText>
            <TextInput
                {...props}
                style={props.error && props.touched ? styles.error : styles.input}
            />
            {props.error && props.touched &&
            <View style={styles.errorContainer}>
                <DefaultText style={styles.errorText}>{props.error}</DefaultText>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer:
    {
        width: '80%',
        marginBottom: 25
    },
    title: 
    {
        alignSelf: 'flex-start',
        marginLeft: 4,
        marginBottom: 2,
        fontWeight: 'bold',
        color: 'white'
    },
    input:
    {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 4,
    },
    error:
    {
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: Colors.errorColor,
        borderRadius: 5,
    },
    errorContainer:
    {
        marginHorizontal: 20,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
        borderColor: Colors.errorColor,
        backgroundColor: Colors.errorColor,
        elevation: 1
    },
    errorText:
    {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
});

export default FormTextInput;