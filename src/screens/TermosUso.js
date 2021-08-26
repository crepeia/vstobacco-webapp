import React from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView, Alert, Linking } from 'react-native';

import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors'
import Traducao from '../components/Traducao/Traducao';

const TermosUso = props => {

    return (

        <ScrollView>
            <View style={styles.container}>
                <DefaultTitle style={{ ...styles.title, fontSize: 24 }}>
                    {Traducao.t('termsOfUse')}
                </DefaultTitle>

                <View style={styles.textContainer}>
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart1')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart2')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart3')}
                        <DefaultText style={styles.textBold}>
                            {Traducao.t('termsOfUsePart4')}
                        </DefaultText>
                        {Traducao.t('termsOfUsePart5')}
                    </DefaultText>
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart6')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart7')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart8')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart9')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart10')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart11')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart12')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart13')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart14')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart15')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart16')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart17')}
                    </DefaultText>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart18')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart19')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart20')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart21')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart22')} deste.
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart23')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart24')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart25')}
                    </DefaultTitle>
                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart26')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart27')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart28')}
                    </DefaultText>

                    <TouchableOpacity activeOpacity={0.4} onPress={() => Linking.openURL('http://www.gnu.org/licenses/gpl-3.0.html')}>
                        <DefaultTitle style={{ ...styles.title, fontSize: 16 }}>
                            {Traducao.t('termsOfUsePart29')}
                        </DefaultTitle>
                    </TouchableOpacity>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart30')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart31')}
                    </DefaultText>

                    <DefaultTitle style={styles.title}>
                        {Traducao.t('termsOfUsePart32')}
                    </DefaultTitle>

                    <DefaultText style={styles.spacement}>
                        {Traducao.t('termsOfUsePart33')}
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
        width: '95%',
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

export default TermosUso;