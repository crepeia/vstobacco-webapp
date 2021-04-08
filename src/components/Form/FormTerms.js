import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import Checkbox from '@react-native-community/checkbox'

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';
import Traducao from '../Traducao/Traducao';

const FormTerms = props => {

    return (
        <View style={styles.container}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
            <View style={styles.checkBoxContainer}>

                <View style={styles.checkBox}>
                    <Checkbox
                        tintColors={{ true: 'white', false: 'white' }}
                        value={props.valueC}
                        onValueChange={() => {
                            if (!props.valueC) {
                                props.onChangeAuthorize(true)
                            }
                            else {
                                props.onChangeAuthorize(false)
                            }
                        }}
                    />
                    <TouchableOpacity style={{width: '100%'}} onPress={props.navTermoConsentimento}>
                        <DefaultText style={styles.text}>{Traducao.t('readAgreeSingular')}<DefaultText style={styles.attentionText}>{Traducao.t('titleTermoDeConsentimento')}</DefaultText></DefaultText>
                    </TouchableOpacity>
                </View>

                <View style={styles.checkBox}>
                    <Checkbox
                        tintColors={{ true: 'white', false: 'white' }}
                        value={props.value}
                        onValueChange={() => {
                            if (!props.value) {
                                props.onChangeTerms(true)
                            }
                            else {
                                props.onChangeTerms(false)
                            }
                        }}
                    />
                    <TouchableOpacity style={{width: '100%'}} onPress={props.navTermosUso}>
                        <DefaultText style={styles.text}>{Traducao.t('readAgreePlural')}<DefaultText style={styles.attentionText}>{Traducao.t('titleTermosDeUso')}</DefaultText></DefaultText>
                    </TouchableOpacity>
                </View>

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
    container:
    {
        width: '80%',
        marginBottom: 25
    },
    title: 
    {
        alignSelf: 'flex-start',
        marginLeft: 4,
        marginBottom: 2,
        color: 'white',
        fontWeight: 'bold'
    },
    text:
    {
        width: '90%',
        color: 'white',
    },
    attentionText:
    {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
    checkBoxContainer:
    {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
    },
    checkBox:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorContainer:
    {

        marginTop: 5,
        marginHorizontal: 20,
        paddingBottom: 2,
        borderWidth: 1,
        borderRadius: 12,
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

export default FormTerms;