import React, { useState, useCallback } from 'react';
import { Dimensions, StyleSheet, View, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import * as recordActions from '../store/actions/record';

import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Card from '../components/UI/Card';
import NumberInput from '../components/UI/NumberInput';
import Colors from '../constants/Colors';


const TermoConsentimento = props => {

    const dispatch = useDispatch();

    // Variáveis de consumo
    const [dailyCigars, setDailyCigars] = useState('0');
    const [isDailyModified, setIsDailyModified] = useState(false);
    const [packPrice, setPackPrice] = useState('0');
    const [isPriceModified, setIsPriceModified] = useState(false);
    const [packAmount, setPackAmount] = useState('0');
    const [isAmountModified, setIsAmountModified] = useState(false);
    
    const saveRecordHandler = useCallback(async () => {
		try {
            await dispatch(recordActions.updateRecord(dailyCigars, packPrice, packAmount));
		} catch (err) {
			Alert.alert(err.message);
        }
	}, [dispatch, dailyCigars, packPrice, packAmount]);

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <DefaultTitle style={styles.title}>Bem-Vindo ao Viva sem Tabaco!</DefaultTitle>
                    <View style={styles.content}>
                        <DefaultText style={styles.text}>Aqui é onde você irá definir como se encontra o seu consumo de cigarros antes de começar a intervenção do <DefaultText style={{color: Colors.primaryColor, fontWeight: 'bold'}}>Viva sem Tabaco.</DefaultText></DefaultText>
                        <DefaultText style={styles.text}>Você sabia que uma pessoa - que fuma um maço de cigarros de 6 reais - gasta, em cinco anos, <DefaultText style={{fontWeight: 'bold'}}>R$10.950,00</DefaultText> com cigarros? Isso sem contar as despesas com a saúde.</DefaultText>
                        <DefaultText style={styles.text}>Insira abaixo suas informações :)</DefaultText>

                        {/* DADOS DE CONSUMO */}
                        <View style={styles.colunaConsumo}>
                            <View style={{...styles.consumoContainer, marginBottom: 10}}>
                                <DefaultText style={styles.consumoText}>{'Cigarros fumados por dia'}</DefaultText>
                                <NumberInput
                                    type={'int'}
                                    maxLength={2}
                                    onValueChange={(value) => {
                                        setDailyCigars(value);
                                        setIsDailyModified(true);
                                    }}
                                    value={dailyCigars}
                                    onFocus={() => {
                                        setDailyCigars('');
                                        setIsDailyModified(false);
                                    }}
                                />
                            </View>
                            <View style={{...styles.consumoContainer, borderTopWidth: 0.8, borderBottomWidth: 0.8, borderColor: Colors.primaryColor, paddingVertical: 10}}>
                                <DefaultText style={styles.consumoText}>{'Preço do maço de cigarros'}</DefaultText>
                                <NumberInput 
                                    type={'float'}
                                    maxLength={5}
                                    onValueChange={(value) => {
                                        setPackPrice(value);
                                        setIsPriceModified(true);
                                    }}
                                    value={packPrice}
                                    onFocus={() => {
                                        setPackPrice('');
                                        setIsPriceModified(false); 
                                    }}
                                />
                            </View>
                            <View style={{...styles.consumoContainer, marginTop: 10}}>
                                <DefaultText style={styles.consumoText}>{'Quantidade de cigarros no maço'}</DefaultText>
                                <NumberInput 
                                    type={'int'}
                                    maxLength={2}
                                    onValueChange={(value) => {
                                        setPackAmount(value);
                                        setIsAmountModified(true);
                                    }}
                                    value={packAmount}
                                    onFocus={() => {
                                        setPackAmount('');
                                        setIsAmountModified(false);
                                    }}
                                />
                            </View>
                        </View>

                        {/* BOTÃO SALVAR */}
                        {isDailyModified && isPriceModified && isAmountModified 
                            &&
                        <TouchableOpacity 
                            onPress={saveRecordHandler}
                            style={styles.button}
                            activeOpacity={0.6}
                        >
                            <DefaultText style={styles.buttonText}>{'PROSSEGUIR'}</DefaultText>
                        </TouchableOpacity>
                        }

                    </View>
                </Card>
            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primaryColor
    },
    card: {
        minHeight: Dimensions.get('window').height * 0.88,
        borderColor: 'white',
        padding: 25,
    },
    title: {
        color: Colors.primaryColor,
        fontSize: 24,
    },
    content: {
        marginTop: 25,
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
    },
    colunaConsumo: {
		width: '100%',
        paddingVertical: 20,
        paddingHorizontal: 3,
		borderWidth: 0.8,
		borderRadius: 10,
        borderColor: Colors.primaryColor,
        marginTop: 20
	},
	consumoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	consumoText: {
		color: Colors.primaryColor,
		fontSize: 14,
        fontFamily: 'open-sans-bold',
        paddingLeft: 6
    },
    button: {
        width: '100%',
        padding: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 7,
        elevation: 3,
        marginTop: 20
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
    },
})

export default TermoConsentimento;