import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors'

const FormPassword = props => {

    const [passwordView, setPasswordView] = useState(true);

    return (
        <View style={styles.inputContainer}>
            <DefaultText style={{ ...styles.title, color: props.titleColor }}>{props.title}</DefaultText>
            <View style={props.error && props.touched ? styles.error : styles.inputComponent}>
                <TextInput
                    {...props}
                    secureTextEntry={passwordView}
                    style={styles.input}
                />
                {passwordView == true ?
                    <TouchableOpacity
                        style={styles.buttonView}
                        onPress={() => setPasswordView(false)}
                    >
                        <Ionicons
                            name='md-eye'
                            size={25}
                            color={'#1a6293'}
                        />
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        style={styles.buttonView}
                        onPress={() => setPasswordView(true)}
                    >
                        <Ionicons
                            name='md-eye-off'
                            size={25}
                            color={'#1a6293'}
                        />
                    </TouchableOpacity>
                }

            </View>
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
    inputComponent: {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 4,
    },
    input:
    {
        width: '90%',
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
    },
    error:
    {
        height: 40,
        flexDirection: 'row',
        backgroundColor: 'white',
        paddingLeft: 10,
        borderWidth: 2,
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

export default FormPassword;