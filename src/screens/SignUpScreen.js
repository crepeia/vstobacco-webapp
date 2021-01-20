import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import * as Localization from 'expo-localization';

import { useDispatch } from 'react-redux';

import LineSeparator from '../components/Form/LineSeparator';
import FormTextInput from '../components/Form/FormTextInput';
import FormData from '../components/Form/FormData';
import FormCheck from '../components/Form/FormCheck';
import FormPicker from '../components/Form/FormPicker';
import FormTipFrequency from '../components/Form/FormTipFrequency';
import FormTerms from '../components/Form/FormTerms';
import FormButton from '../components/Form/FormButton';

import Colors from '../constants/Colors';
import Localhost from '../constants/Localhost';
import RegisterUser from '../models/RegisterUser';


import * as userActions from '../store/actions/user';

const tipsFrequencyData = [
    { frequency: 'Nunca', id: 0 },
    { frequency: 'Diariamente', id: 1 },
    { frequency: 'A cada dois dias', id: 2 },
    { frequency: 'A cada três dias', id: 3 },
    { frequency: 'A cada quatro dias', id: 4 },
    { frequency: 'A cada cinco dias', id: 5 },
    { frequency: 'Semanalmente', id: 6 },
]

const validationSchema = yup.object({
    name: yup.string()
        .required('Digite seu nome')
        .min(8, 'Digite seu nome completo'),
    gender: yup.string()
        .nullable()
        .required('Escolha uma opção de sexo'),
    pregnant: yup.mixed()
        .oneOf([null, true, false])
        .notOneOf([undefined], 'Este campo é requerido'),
    birthDate: yup.string()
        .required('Insira sua data de nascimento'),
    email: yup.string()
        .email('E-mail inválido')
        .required('Digite o seu e-mail'),
    password: yup.string()
        .required('Digite uma senha')
        .min(6, 'A senha deve conter no mínimo 6 caracteres'),
    termsUse: yup.boolean()
        .oneOf([true], 'Você precisa aceitar os termos de uso para criar uma conta'),
    tipsFrequency: yup.number()
        .min(0, 'Escolha uma opção de frequência'),
    receiveEmails: yup.boolean()
        .oneOf([true, false], 'Este campo é requerido'),
    
});

const handlePhoneError = (phone) => {
    let phoneRegex = /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))/g;

    if (phone === '') {
        return false;
    }

    return !phoneRegex.test(phone)
};

const SignUpScreen = props => {

    const [errorPhone, setErrorPhone] = useState(false);
    const [loading, setLoading] = useState(false);

    const [date, setDate] = useState('');

    const language = Localization.locale;
    let adjustedLanguage;

    if (language == 'pt-BR' || language == 'pt-US') {
        adjustedLanguage = 'pt';
    } else {
        adjustedLanguage = 'en';
    }

    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        email: '',
        password: '',
        receiveEmails: false,
        tipsFrequency: 0,
        phone: '',
        birth: '',
        gender: null,
        pregnant: null,
        authorizeData: false,
        termsUse: false,
        dt_cadastro: '', //automatico
        dateCreated: '', //automatico
        preferedLanguage: '', //automatico
        ipCreated: '', //automatico
        app_signup: true, //automatico
        registration_complete: true //automatico
    }

    const onSubmit = async (values, actions) => {
        console.log('values: ')
        console.log(values);
        const registerValues = new RegisterUser(values.name, values.email, values.password, values.receiveEmails, values.phone, values.birthDate, values.gender, values.authorizeData, moment(), adjustedLanguage, values.app_signup);
        
        setLoading(true);
        try {
            await dispatch(userActions.signup(registerValues));
            setLoading(false);
            props.navigation.navigate('Login');
            Alert.alert('Conta criada com sucesso');
        } catch (error) {
            setLoading(false);
            Alert.alert('Não foi possível criar a conta.');
            console.log(error);
        }
    };

    return (
        <ScrollView>
            <View style={styles.background}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss} >
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {(formikProps) => (
                        <View style={styles.formContainer}>
                            <LineSeparator title='Dados Pessoais' />

                            <FormTextInput 
                                placeholder={'Digite seu nome'}
                                title={'Nome completo'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('name')}
                                onBlur={formikProps.handleBlur('name')}
                                value={formikProps.values.name}
                                error={formikProps.errors.name}
                                touched={formikProps.touched.name}
                            />

                            <FormPicker
                                title={'Gênero'}
                                value={formikProps.values.gender}
                                onValueChange={itemValue => {
                                    if (itemValue === 'F') {
                                        formikProps.setFieldValue('pregnant', undefined)
                                        formikProps.setFieldValue('gender', itemValue)
                                    }
                                    else {
                                        formikProps.setFieldValue('pregnant', null)
                                        formikProps.setFieldValue('gender', itemValue)
                                    }
                                }}
                                touched={formikProps.touched.gender}
                                error={formikProps.errors.gender}
                            />

                            {formikProps.values.gender === 'F' &&
                                <FormCheck 
                                    title={'Você se encontra grávida?'}
                                    value={formikProps.values.pregnant}
                                    onChange={itemValue => {
                                        formikProps.setFieldValue('pregnant', itemValue)
                                    }}
                                    touched={true}
                                    error={formikProps.errors.pregnant}
                                />
                            }

                            <FormData 
                                title={'Data de nascimento'}
                                value={date}
                                onValueChange={itemValue => {
                                    formikProps.setFieldValue('birthDate', itemValue)
                                }}
                                onChangeDate={chosenDate => {
                                    setDate(chosenDate)
                                }}
                                touched={formikProps.touched.birthDate}
                                error={formikProps.errors.birthDate}
                            />

                            <FormTextInput
                                placeholder={'Digite seu número'}
                                title={'Telefone (opcional)'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('phone')}
                                onBlur={formikProps.handleBlur('phone')}
                                value={formikProps.values.phone}
                                onChange={() => {
                                    setErrorPhone(handlePhoneError(formikProps.values.phone));
                                }}
                                error={errorPhone ? 'Número de telefone inválido' : false}
                                touched={formikProps.touched.phone}
                                keyboardType='number-pad'
                            />

                            {/* <LineSeparator title={'Dados de consumo'} />

                            <FormTextInput 
                                placeholder={'Digite a quantidade'}
                                title={'Cigarros fumados por dia'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('cigarrosPorDia')}
                                onBlur={formikProps.handleBlur('cigarrosPorDia')}
                                value={formikProps.values.cigarrosPorDia}
                                error={formikProps.errors.cigarrosPorDia}
                                touched={formikProps.touched.cigarrosPorDia}
                                keyboardType='number-pad'
                            />

                            <FormTextInput 
                                placeholder={'Digite o valor do maço'}
                                title={'Preço do maço de cigarros'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('macoValor')}
                                onBlur={formikProps.handleBlur('macoValor')}
                                value={formikProps.values.macoValor}
                                error={formikProps.errors.macoValor}
                                touched={formikProps.touched.macoValor}
                                keyboardType='number-pad'
                            />

                            <FormTextInput 
                                placeholder={'Digite a quantidade'}
                                title={'Quantidade de cigarros no maço'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('qtdCigarrosMaco')}
                                onBlur={formikProps.handleBlur('qtdCigarrosMaco')}
                                value={formikProps.values.qtdCigarrosMaco}
                                error={formikProps.errors.qtdCigarrosMaco}
                                touched={formikProps.touched.qtdCigarrosMaco} 
                                keyboardType='number-pad'
                            /> */}

                            <LineSeparator title='Dados de Acesso' />

                            <FormTextInput
                                placeholder={'Digite seu e-mail'}
                                title={'E-mail'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('email')}
                                onBlur={formikProps.handleBlur('email')}
                                value={formikProps.values.email}
                                error={formikProps.errors.email}
                                touched={formikProps.touched.email}
                                keyboardType='email-address'
                                autoCapitalize='none'
                                autoCorrect={false}
                            />

                            <FormTextInput
                                placeholder={'Digite uma senha'}
                                title={'Senha'}
                                titleColor={'white'}
                                onChangeText={formikProps.handleChange('password')}
                                onBlur={formikProps.handleBlur('password')}
                                value={formikProps.values.password}
                                error={formikProps.errors.password}
                                touched={formikProps.touched.password}
                                autoCapitalize='none'
                                autoCorrect={false}
                                secureTextEntry
                            />

                            <LineSeparator title={'Finalizando'} />

                            <FormCheck 
                                title={'Deseja receber nossas dicas por email?'}
                                value={formikProps.values.receiveEmails}
                                onChange={itemValue => {
                                    if (itemValue === true) {
                                        formikProps.setFieldValue('receiveEmails', itemValue)
                                        formikProps.setFieldValue('tipsFrequency', -1)
                                    }
                                    else {
                                        formikProps.setFieldValue('receiveEmails', itemValue)
                                    }
                                }}
                                touched={formikProps.errors.receiveEmails}
                                error={formikProps.errors.receiveEmails}
                            />

                            {formikProps.values.receiveEmails === true &&
                                <FormTipFrequency 
                                    title={'Frequência de recebimento das dicas para redução de consumo de tabaco'}
                                    tipsFrequencyData={tipsFrequencyData}
                                    value={formikProps.values.tipsFrequency}
                                    onValueChange={itemValue => {
                                        formikProps.setFieldValue('tipsFrequency', itemValue)
                                    }}
                                    error={formikProps.errors.tipsFrequency}
                                    touched={formikProps.touched.tipsFrequency}
                                />
                            }

                            <FormTerms 
                                title={'Ufa! Agora acabou :)'}
                                value={formikProps.values.termsUse}
                                valueC={formikProps.values.authorizeData}
                                onChangeTerms={(itemValue) => {
                                    formikProps.setFieldValue('termsUse', itemValue)
                                }}
                                onChangeAuthorize={(itemValue) => {
                                    formikProps.setFieldValue('authorizeData', itemValue)
                                }}
                                navTermoConsentimento={() => props.navigation.navigate('TermoConsentimento')}
                                navTermosUso={() => props.navigation.navigate('TermosUso')}
                                touched={formikProps.errors.termsUse}
                                error={formikProps.errors.termsUse}
                            />

                            <FormButton 
                                title={'Criar Conta'}
                                onPress={() => {
                                    if (errorPhone) {
                                        Alert.alert('Erro no formulário', 'Há um erro no formulário, corrija para poder criar sua conta :)');
                                        return;
                                    }
                                    formikProps.handleSubmit()
                                }}    
                                backColor={'white'}
                                borderColor={'white'}
                                textColor={Colors.primaryColor}
                                // loading={loading}
                            />
                        </View>
                    )}
                </Formik>
            </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: Colors.primaryColor,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.primaryColor
    },
    formContainer:
    {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
    },
});

export default SignUpScreen;