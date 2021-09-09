import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik'
import * as yup from 'yup'

import Colors from '../constants/Colors';
import DefaultTitle from '../components/DefaultTitle';
import DefaultText from '../components/DefaultText';
import Traducao from '../components/Traducao/Traducao';
import FormTextInput from '../components/Form/FormTextInput'
import FormButton from '../components/Form/FormButton';

import * as userActions from '../store/actions/user';

const validationSchema = yup.object().shape({
    email: yup.string()
        .label('Email')
        .email('Enter a valid email')
        .required('Please enter a registered email')
})

const ResetPasswordScreen = (props) => {
    const dispatch = useDispatch();
    const [error, setError] = useState();

    const handlePasswordReset = async (values, actions) => {
        setError(null);
        const { email } = values;

        try {
            await dispatch(userActions.resetPassword(email));
            Alert.alert("E-mail enviado com sucesso.");
            props.navigation.navigate('Login');
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        if (error) {
            Alert.alert('Um erro ocorreu!', error, [{ text: 'Ok' }]);
        }
    }, [error]);

    return (
        <View style={styles.container}>
            <DefaultTitle style={styles.text}>{Traducao.t('forgotPasswordTitle')}</DefaultTitle>
            <DefaultText>{Traducao.t('instructionsText')}</DefaultText>
            <Formik
                initialValues={{ email: '' }}
                onSubmit={(values, actions) => {
                    handlePasswordReset(values, actions)
                }}
                validationSchema={validationSchema}>
                {({
                    handleChange,
                    values,
                    handleSubmit,
                    errors,
                    isValid,
                    touched,
                    handleBlur,
                    isSubmitting
                }) => (
                    <View style={styles.formContainer}>
                        <FormTextInput
                            name='email'
                            value={values.email}
                            onChangeText={handleChange('email')}
                            placeholder='E-mail'
                            autoCapitalize='none'
                            onBlur={handleBlur('email')}
                        />
                        {errors.email && touched.email && (
                            <View style={styles.errorContainer}>
                                <DefaultText style={styles.errorText}>{Traducao.t('validEmail')}</DefaultText>
                            </View>
                        )}
                        <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer} disabled={!isValid || isSubmitting}>
                            <DefaultText style={styles.buttonText}>{Traducao.t('send')}</DefaultText>
                        </TouchableOpacity>
                        {/* <FormButton
                        title="Enviar"
                        onPress={handleSubmit}    
                        backColor={Colors.primaryColor}
                        borderColor={Colors.primaryColor}
                        textColor={Colors.secondaryColor}
                        disabled={!isValid || isSubmitting}
                    /> */}
                    </View>
                )}
            </Formik>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        color: Colors.primaryColor,
        marginVertical: 20
    },
    formContainer:
    {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 20,
    },
    errorContainer: {
        paddingHorizontal: 5,
        marginBottom: 10,
        marginTop: -5,
    },
    errorText: {
        color: 'red',
        fontSize: 13,
    },
    buttonText: {
        textAlign: 'center',
        color: Colors.secondaryColor,
        fontWeight: '700',
    },
    buttonContainer: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: 15,
        borderRadius: 5,
        elevation: 1,
        width: '80%'
    },
});

export default ResetPasswordScreen;