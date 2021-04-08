import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors';
import Traducao from '../components/Traducao/Traducao';


const TermoConsentimento = props => {

    return (
        <ScrollView>
            <View style={styles.container}>
                <DefaultTitle style={{...styles.title, fontSize: 24}}>
                    {Traducao.t('consentForm')}
                </DefaultTitle>
                
                <View style={styles.textContainer}>
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>
                        {Traducao.t('consentFormPart1')}
                    </DefaultText>
                    
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('consentFormPart2')}
                    </DefaultText>
                    
                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>
                        {Traducao.t('consentFormPart3')}
                    </DefaultText>
                    
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('consentFormPart4')}
                    </DefaultText>
                    
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('consentFormPart5')}
                    <DefaultText style={styles.textBold}>
                        {Traducao.t('consentFormPart6')}
                    </DefaultText>
                        {Traducao.t('consentFormPart7')}
                    </DefaultText>

                    <DefaultText style={{marginBottom: 10, color: 'black'}}>
                        {Traducao.t('consentFormPart8')}
                    </DefaultText>

                    <DefaultText style={{...styles.textBold, ...styles.spacement}}>
                        {Traducao.t('consentFormPart9')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('consentFormPart10')}
                    </DefaultText>
                    
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('consentFormPart11')}
                    </DefaultText>
                    
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('consentFormPart12')}
                    </DefaultText>
                </View>
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    textContainer:
    {
        width: '90%'
    },
    title:
    {
        paddingVertical: 10,
        color: Colors.primaryColor
    },
    textBold:
    {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#1a6293'
    },
    spacement:
    {
        marginBottom: 10,
    },
})

export default TermoConsentimento;