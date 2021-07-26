import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors'
import Traducao from '../Traducao/Traducao';

const FormPassword = props => {

    const [passwordView, setPasswordView] = useState(true);

    return (
        <View>
            <DefaultText style={styles.inputTitle}>{Traducao.t('password')}</DefaultText>
            {
                passwordView == false ?
                    <View style={styles.inputContainerPassword}>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder={Traducao.t('placeHolderPassword')}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            secureTextEntry
                            autoCapitalize='none'
                            returnKeyType='go'
                            ref={(input) => (passwordInput = input)}
                            value={password}
                            onChangeText={onPasswordChange}
                            selectionColor={Colors.primaryColor}
                            onBlur={lostFocusPassword}
                        />

                        <TouchableOpacity
                            style={styles.buttonView}
                            onPress={() => setPasswordView(true)}
                        >
                            <Ionicons
                                name='md-eye'
                                size={25}
                                color={'#fff'}
                            />
                        </TouchableOpacity>
                    </View>

                    :

                    <View style={styles.inputContainerPassword}>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder={Traducao.t('placeHolderPassword')}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            autoCapitalize='none'
                            returnKeyType='go'
                            ref={(input) => (passwordInput = input)}
                            value={password}
                            onChangeText={onPasswordChange}
                            selectionColor={Colors.primaryColor}
                            onBlur={lostFocusPassword}
                        />

                        <TouchableOpacity
                            style={styles.buttonView}
                            onPress={() => setPasswordView(false)}
                        >
                            <Ionicons
                                name='md-eye-off'
                                size={25}
                                color={'#fff'}
                            />
                        </TouchableOpacity>

                    </View>
            }

            {
                !isPasswordValid && touchedPassword && (
                    <View style={styles.errorContainer}>
                        <DefaultText style={styles.errorText}>{Traducao.t('validPassword')}</DefaultText>
                    </View>
                )
            }
        </View >
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