import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';

const LoginScreen = props => {
    return (
        <View style={styles.background}>
            <Text style={styles.title}>VIVA SEM TABACO</Text>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../../assets/images/logo-vst-1.png')} />
            </View>
            <View style={styles.formContainer}>
                <View style={{margin: 10}}>
                <Text style={styles.labelAuth}>Informe seus dados</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder='E-mail'
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder='Senha'
                    />
                </View>
                <TouchableOpacity 
                    style={styles.buttonSignIn}
                    onPress={() => {}}
                >
                    <View>
                        <Text style={styles.labelAuth}>
                            Entrar
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.4}
                    style={styles.buttonSignUp}
                    onPress={() => props.navigation.navigate('Cadastro')}
                >
                    <Text style={styles.labelAuth}>Não possui conta?</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    formContainer: {
        width: Dimensions.get('window').width * 0.85,
        height: Dimensions.get('window').width * 0.85,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(265, 265, 265, 0.3)'
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 15
    },
    logoImg: {
        width: Dimensions.get('window').width * 0.8,
		height: Dimensions.get('window').width * 0.5,
		resizeMode: 'contain'
    },
    title: {
        fontFamily: 'montserrat',
        color: 'white',
        fontSize: 35
    },
    inputContainer: {
        width: '90%',
        height: 40,
        backgroundColor: 'rgba(265, 265, 265, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    input: {
        marginLeft: 15,
        width: '70%'
    },
    buttonSignIn: {
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
        marginTop: 10,
        backgroundColor: Colors.primaryColor
    },
    buttonSignUp: {
        marginTop: 30
    },
    labelAuth: {
        fontFamily: 'montserrat',
        fontSize: 16,
        color: 'white'
    }
});

export default LoginScreen;