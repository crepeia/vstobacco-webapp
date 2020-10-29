import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Formik } from 'formik'
import * as yup from 'yup'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import FormTextInput from '../components/Form/FormTextInput';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';
import HelpButtonModal from '../components/HelpButtonModal.js';

const validationSchema = yup.object({
    nickname: yup.string()
        .max(16, 'Apelido muito grande, no máximo 16 caracteres')
        .required('Digite seu apelido')
        .nullable(),
});

const RankingJoin = props => {

    const userNickname = 'lunascsant'; // provisório

    const initialValues = {
        nickname: userNickname,
    };


    const onSubmit = () => {
        props.navigation.navigate('Ranking');
    };

    return (
        <ScrollView style={{backgroundColor: 'white'}}>
            <View style={styles.containerTitle}>
                <DefaultText style={styles.title}>Participe do nosso Ranking!</DefaultText>
            </View>
            <View style={styles.background}>
                <View style={styles.textContainer}>
                    <DefaultText style={styles.text}>Ganhe pontos completando desafios e suba no Ranking!</DefaultText>
                    <DefaultText style={styles.text}>Escreva um apelido abaixo e comece a competir!</DefaultText>
                    <View style={styles.learnMoreBox}>
                        <DefaultText style={styles.bellowText}>Estamos esperando por você :)</DefaultText>
                        <HelpButtonModal showLink={true} title={"Ranking"}>
                            <DefaultText style={styles.helpText}>
                                Nosso ranking garante o anonimato e permite que você valide seu progresso em relação a outros usuários do aplicativo.
                            </DefaultText>
                            <DefaultText style={styles.helpText}>
                                Basta informar um apelido para ser mostrado no ranking e confirmar.
                            </DefaultText>
                            <DefaultText style={styles.helpText}>
                                Você pode sair do ranking a qualquer momento no menu de Opções.
                            </DefaultText>
                        </HelpButtonModal>
                    </View>
                </View>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formikProps) => (
                        
                        <View style={styles.inputContainer}>
                            
                            <FormTextInput
                                placeholder={'Digite seu apelido'}
                                title={'Apelido'}
                                titleColor={Colors.primaryColor}
                                onChangeText={formikProps.handleChange('Apelido')}
                                onBlur={formikProps.handleBlur('Apelido')}
                                value={formikProps.values.nickname}
                                error={formikProps.errors.nickname}
                                touched={formikProps.touched.nickname}
                            />
                                
                            <TouchableOpacity
                                style={styles.button} 
                                onPress={() => {
                                    formikProps.handleSubmit()
                                }}
                                activeOpacity={0.4}
                            >
                                <DefaultText style={styles.buttonText}>Entrar no Ranking</DefaultText>
                            </TouchableOpacity>
                        </View>
                    )}

                </Formik>
            </View>
        </ScrollView>
    );

};

export const screenOptions = navData => {
    return {
      headerTitle: 'Ranking',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item 
            title='Menu'
            iconName={'md-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      )
    }
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
    },
    textContainer: {
        paddingHorizontal: 20,
    },
    learnMoreBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 20
    },
    containerTitle: {
        marginVertical: 20
    },
    title: {
        color: Colors.primaryColor,
        fontSize: 22,
        fontWeight: "bold",
        textAlign: 'center'
    },
    text: {
        marginBottom: 10,
        fontSize: 18,
    },
    bellowText: {
        fontSize: 18,
        color: Colors.primaryColor, 
        fontWeight: 'bold',
        marginRight: 10,
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 7,
        elevation: 2,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    filterBox: {
        width: '33.3333%',
        padding: 8,
        backgroundColor: Colors.primaryColor
    },
    filterTitle: {
        color: 'white',
        fontSize: 18
    },
    filterTitleInactive: {
        color: '#dcdcdc',
        fontSize: 18
    },
    listStyle: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    helpText: {
        fontSize: 15,
        marginBottom: 15,
        textAlign:'center'
    }
});

export default RankingJoin;