import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TextInput, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';

const LoginScreen = props => {
    return (
        <View style={styles.background}>
            <DefaultText style={styles.title}>VIVA SEM TABACO</DefaultText>
            <View style={styles.logoContainer}>
                <Image style={styles.logoImg} source={require('../../assets/images/logo-vst-1.png')} />
            </View>
            <View style={styles.formContainer}>
                <View style={{marginTop: 20, marginBottom: 10}}>
                    <DefaultText style={styles.labelForm}>Informe seus dados</DefaultText>
                </View>
                <DefaultText style={styles.inputTitle}>E-mail</DefaultText>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder='email@dominio.com'
                    placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    />
                </View>
                <DefaultText style={styles.inputTitle}>Senha</DefaultText>
                <View style={styles.inputContainer}>
                    <TextInput
                    style={styles.input}
                    placeholder='Sua senha no Viva sem Tabaco'
                    placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                    />
                </View>
                <TouchableOpacity 
                    style={styles.buttonSignIn}
                    onPress={() => { }}
                >
                    <View>
                        <DefaultText style={styles.labelAuth}>
                            Entrar
                        </DefaultText>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity 
                        activeOpacity={0.4}
                        style={styles.buttonSignUp}
                        onPress={() => props.navigation.navigate('Cadastro')}
                    >
                        <DefaultText style={styles.labelForm}>Não possui conta?</DefaultText>
                    </TouchableOpacity>
                </View>
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
        minHeight: Dimensions.get('window').width * 0.75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgba(265, 265, 265, 0.3)',
        paddingHorizontal: 20
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
        fontFamily: 'open-sans',
        color: 'white',
        fontSize: 35
    },
    inputTitle: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        color: 'white',
        marginBottom: 2
    },
    inputContainer: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(265, 265, 265, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        marginLeft: 15,
        width: '100%'
    },
    buttonSignIn: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 8,
        marginTop: 5,
        backgroundColor: Colors.primaryColor
    },
    buttonSignUp: {
        marginVertical: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    labelAuth: {
        fontFamily: 'open-sans',
        fontSize: 16,
        color: 'white',
    },
    labelForm: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
    }
});

export default LoginScreen;