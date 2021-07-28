import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    KeyboardAvoidingView,
    Animated,
    Keyboard
} from 'react-native';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import { Ionicons } from '@expo/vector-icons';
import Traducao from '../components/Traducao/Traducao';

import { useDispatch } from 'react-redux';
import * as userActions from '../store/actions/user';


const LoginScreen = props => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const [password, setPassword] = useState('');
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [passwordView, setPasswordView] = useState(true);

    const [formValid, setFormValid] = useState(false);

    const [touchedEmail, setTouchedEmail] = useState(false);
    const [touchedPassword, setTouchedPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    //Animações ao abrir teclado:
    const [Size] = useState(new Animated.Value(32));
    const [logo] = useState(new Animated.ValueXY({ x: 180, y: 160 }));

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
    }, []);

    function keyboardDidShow() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 70,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(logo.y, {
                toValue: 50,
                duration: 300,
                useNativeDriver: false,
            }),
            Animated.timing(Size, {
                toValue: 16,
                duration: 300,
                useNativeDriver: false,
            }),
        ]).start();
    }

    function keyboardDidHide() {
        Animated.parallel([
            Animated.timing(logo.x, {
                toValue: 180,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(logo.y, {
                toValue: 160,
                duration: 400,
                useNativeDriver: false,
            }),
            Animated.timing(Size, {
                toValue: 32,
                duration: 400,
                useNativeDriver: false,
            }),
        ]).start();
    }

    const onEmailChange = (emailInput) => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (emailInput.length === 0 || !emailRegex.test(emailInput.toLowerCase())) {
            isValid = false;
        }

        setIsEmailValid(isValid);
        setEmail(emailInput);
    };

    const onPasswordChange = (passwordInput) => {
        let isValid = true;

        if (passwordInput.length === 0) {
            isValid = false;
        }
        setIsPasswordValid(isValid);
        setPassword(passwordInput);
    };

    const lostFocusEmail = () => {
        setTouchedEmail(true);
    };
    const lostFocusPassword = () => {
        setTouchedPassword(true);
    };

    const signinHandler = useCallback(async () => {
        setError(null);
        try {
            setLoading(true);
            await dispatch(userActions.signin(email, password));
            // props.navigation.navigate('StartupLogin');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    }, [dispatch, email, password]);

    // esqueceu senha
    const goToResetPassword = () => {
        props.navigation.navigate('ResetPassword');
    };
    // esqueceu senha

    useEffect(() => {
        setFormValid(isEmailValid && isPasswordValid);
    }, [email, password]);

    useEffect(() => {
        if (error) {
            Alert.alert(Traducao.t('loginError'), error, [{ text: 'Ok' }]);
        }
    }, [error]);

    if (loading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color={'white'} />
            </View>
        );
    }

    let passwordInput;

    return (
        <View style={styles.background}>
            <Animated.Text style={{
                fontFamily: 'open-sans',
                textAlign: 'justify',
                color: 'white',
                fontSize: Size
            }}>
                VIVA SEM TABACO
            </Animated.Text>

            <View style={styles.logoContainer}>
                <Animated.Image
                    style={{
                        width: logo.x,
                        height: logo.y,
                        resizeMode: 'contain'
                    }}
                    source={require('../../assets/images/logo-vst-1.png')}
                />
            </View>
            <View style={styles.formContainer}>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <DefaultText style={styles.labelForm}>{Traducao.t('date')}</DefaultText>
                </View>
                <KeyboardAvoidingView enabled behavior={'height'}>
                    <DefaultText style={styles.inputTitle}>{Traducao.t('email')}</DefaultText>
                    <View style={styles.inputContainerEmail}>
                        <TextInput
                            style={styles.inputEmail}
                            placeholder={Traducao.t('placeHolderEmail')}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            onSubmitEditing={() => passwordInput.focus()}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            autoCorrect={false}
                            returnKeyType='next'
                            value={email}
                            onChangeText={onEmailChange}
                            selectionColor={Colors.primaryColor}
                            onBlur={lostFocusEmail}
                        />
                    </View>
                    {!isEmailValid && touchedEmail && (
                        <View style={styles.errorContainer}>
                            <DefaultText style={styles.errorText}>{Traducao.t('validEmail')}</DefaultText>
                        </View>
                    )}

                    <DefaultText style={styles.inputTitle}>{Traducao.t('password')}</DefaultText>

                    <View style={styles.inputContainerPassword}>
                        <TextInput
                            style={styles.inputPassword}
                            placeholder={Traducao.t('placeHolderPassword')}
                            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                            secureTextEntry={passwordView}
                            autoCapitalize='none'
                            returnKeyType='go'
                            ref={(input) => (passwordInput = input)}
                            value={password}
                            onChangeText={onPasswordChange}
                            selectionColor={Colors.primaryColor}
                            onBlur={lostFocusPassword}
                        />
                        {passwordView == true ?
                            <TouchableOpacity
                                style={styles.buttonView}
                                onPress={() => setPasswordView(false)}
                            >
                                <Ionicons
                                    name='md-eye'
                                    size={25}
                                    color={'#fff'}
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
                                    color={'#fff'}
                                />
                            </TouchableOpacity>
                        }
                    </View>

                    {!isPasswordValid && touchedPassword && (
                        <View style={styles.errorContainer}>
                            <DefaultText style={styles.errorText}>{Traducao.t('validPassword')}</DefaultText>
                        </View>
                    )}
                </KeyboardAvoidingView>

                {/* esqueceu senha */}
                <TouchableOpacity style={styles.buttonForgotPassword} onPress={goToResetPassword}>
                    <DefaultText style={styles.forgotPassword}>{Traducao.t('forgotPassword')}</DefaultText>
                </TouchableOpacity>
                {/* esqueceu senha */}

                <TouchableOpacity
                    style={styles.buttonSignIn}
                    onPress={signinHandler}
                    disabled={!formValid}
                >
                    <View>
                        <DefaultText style={styles.labelAuth}>
                            {Traducao.t('login')}
                        </DefaultText>
                    </View>
                </TouchableOpacity>
                <View>
                    <TouchableOpacity
                        activeOpacity={0.4}
                        style={styles.buttonSignUp}
                        onPress={() => props.navigation.navigate('Cadastro')}
                    >
                        <DefaultText style={styles.labelForm}>{Traducao.t('dontHaveAccount')}</DefaultText>
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
        marginVertical: 10
    },
    inputTitle: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        color: 'white',
        marginBottom: 2
    },
    inputContainerEmail: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(265, 265, 265, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    inputEmail: {
        marginLeft: 15,
        width: '100%'
    },
    inputContainerPassword: {
        width: '100%',
        height: 40,
        backgroundColor: 'rgba(265, 265, 265, 0.5)',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    inputPassword: {
        marginLeft: 15,
        width: '85%'
    },
    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '15%',
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
        marginVertical: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonForgotPassword: {
        marginBottom: 10,
        marginTop: 5
    },
    forgotPassword: {
        textAlign: 'center',
        color: 'white',
        // fontWeight: '700',
        fontSize: 16
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
    },
    errorContainer: {
        paddingHorizontal: 5,
        marginBottom: 10,
        marginTop: -5,
    },
    errorText: {
        color: Colors.errorColor,
        fontSize: 13,
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primaryColor,
    },
});

export default LoginScreen;