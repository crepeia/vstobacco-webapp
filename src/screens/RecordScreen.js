import React, { useState, useCallback, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Alert, Button } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { useDispatch, useSelector } from 'react-redux';
import * as recordActions from '../store/actions/record';
import * as challengeActions from "../store/actions/challenge";
import * as optionsActions from "../store/actions/options";

import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Card from '../components/UI/Card';
import NumberInput from '../components/UI/NumberInput';
import Colors from '../constants/Colors';
import Traducao from '../components/Traducao/Traducao';

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import moment from "moment";


const RecordScreen = props => {

    const dispatch = useDispatch();
    const [error, setError] = useState();

    // Variáveis de consumo
    const [dailyCigars, setDailyCigars] = useState('0');
    const [isDailyModified, setIsDailyModified] = useState(false);
    const [packPrice, setPackPrice] = useState('0');
    const [isPriceModified, setIsPriceModified] = useState(false);
    const [packAmount, setPackAmount] = useState('0');
    const [isAmountModified, setIsAmountModified] = useState(false);

    const record = useSelector((state) => state.record.record);
    const options = useSelector((state) => state.options.options);
    
    const loadRecord = useCallback(async () => {
        console.log(record);
		setError(null);
		try {
			await dispatch(recordActions.fetchRecord());
			setDailyCigars(record.cigarsDaily.toString());
			setPackPrice(record.packPrice.toString());
			setPackAmount(record.packAmount.toString());
		} catch (err) {
			setError(err.message);
		}
    }, [dispatch, setError]);
    
    useEffect(() => {
		let unmounted = false;
		if (!unmounted) {
			loadRecord();
		}
		return () => {
			unmounted = true;
		};
    }, [dispatch, loadRecord]);
    
    // // notifications

    // const registerForPushNotificationsAsync = async () => {
	// 	if (Constants.isDevice) {
	// 		const { status: existingStatus } = await Permissions.getAsync(
	// 			Permissions.NOTIFICATIONS
	// 		);
	// 		let finalStatus = existingStatus;
	// 		if (existingStatus !== "granted") {
	// 			const { status } = await Permissions.askAsync(
	// 				Permissions.NOTIFICATIONS
	// 			);
	// 			finalStatus = status;
	// 		}
	// 		if (finalStatus !== "granted") {
	// 			await dispatch(
	// 				optionsActions.updateOptions(
	// 					false,
	// 					false,
	// 					false,
	// 					moment(options.cigarNotificationTime, "HH:mm").format(
	// 						"HH:mm"
	// 					),
	// 					moment(options.tipNotificationTime, "HH:mm").format(
	// 						"HH:mm"
	// 					),
	// 					moment(options.achievementsNotificationTime, "HH:mm").format(
	// 						"HH:mm"
	// 					),
	// 					""
	// 				)
	// 			);
	// 			return;
	// 		}

	// 		let token = (await Notifications.getExpoPushTokenAsync()).data;

	// 		Notifications.cancelAllScheduledNotificationsAsync();

	// 		// configuração notificação cigarro

	// 		const idCigarNotification = await Notifications.scheduleNotificationAsync({
	// 			content: {
	// 				title: "Lembrete",
	// 				body: "Informe a quantidade de cigarros fumados hoje!",
	// 				data: JSON.stringify({ screen: "Cigarros fumados" }),
	// 				sound: true
	// 			},
	// 			trigger: {
	// 				hour: parseInt(options.cigarNotificationTime),
	// 				minute: 0,
	// 				repeats: true
	// 			}
	// 		});

	// 		// configuracao notificacao conquista

	// 		const idAchievementsNotification = await Notifications.scheduleNotificationAsync({
	// 			content: {
	// 				title: "Conquista =)",
	// 				body: isEven === 0 ? `Você deixou de fumar ${cigarsNotSmoken} cigarros e salvou ${lifeTimeSavedText} da sua vida!` 
	// 				: `Você deixou de fumar ${cigarsNotSmoken} cigarros e economizou R$${moneySaved.toFixed(2)}!`,
	// 				data: JSON.stringify({ screen: " Conquistas" }),
	// 				sound: true
	// 			},
	// 			trigger: {
	// 				hour: parseInt(options.achievementsNotificationTime),
	// 				minute: 0,
	// 				repeats: true
	// 			}
	// 		});

	// 		// configuracao notificacao dicas

	// 		const idTipNotification = await Notifications.scheduleNotificationAsync({
	// 			content: {
	// 				title: "Lembrete",
	// 				body: "Passando para lembrá-lo de ler uma nova dica no Viva sem Tabaco!",
	// 				data: JSON.stringify({ screen: "Dicas" }),
	// 				sound: true
	// 			},
	// 			trigger: {
	// 				hour: parseInt(options.tipNotificationTime),
	// 				minute: 0,
	// 				repeats: true
	// 			}
	// 		});

	// 		await dispatch(
	// 			optionsActions.updateOptions(
	// 				true,
	// 				true,
	// 				true,
	// 				moment(options.cigarNotificationTime, "HH:mm").format(
	// 					"HH:mm"
	// 				),
	// 				moment(options.tipNotificationTime, "HH:mm").format(
	// 					"HH:mm"
	// 				),
	// 				moment(options.achievementsNotificationTime, "HH:mm").format(
	// 					"HH:mm"
	// 				),
	// 				token
	// 			)
	// 		);

	// 		await dispatch(optionsActions.storeIdCigarNotification(idCigarNotification));
	// 		await dispatch(optionsActions.storeIdAchievementsNotification(idAchievementsNotification));
	// 		await dispatch(optionsActions.storeIdTipNotification(idTipNotification));
	// 	} else {
	// 		await dispatch(
	// 			optionsActions.updateOptions(
	// 				false,
	// 				false,
	// 				false,
	// 				moment(options.cigarNotificationTime, "HH:mm").format(
	// 					"HH:mm"
	// 				),
	// 				moment(options.tipNotificationTime, "HH:mm").format(
	// 					"HH:mm"
	// 				),
	// 				moment(options.achievementsNotificationTime, "HH:mm").format(
	// 					"HH:mm"
	// 				),
	// 				""
	// 			)
	// 		);
	// 		alert("Must use physical device for Push Notifications");
	// 	}

	// 	if (Platform.OS === 'android') {
	// 		Notifications.setNotificationChannelAsync('default', {
	// 		  name: 'default',
	// 		  importance: Notifications.AndroidImportance.MAX,
	// 		  vibrationPattern: [0, 250, 250, 250],
	// 		  lightColor: '#FF231F7C',
	// 		});
	// 	}		
    // };
    
    const saveRecordHandler = useCallback(async () => {
		try {
			await dispatch(recordActions.updateRecord(dailyCigars, packPrice, packAmount));
			console.log("Record foi atualizado lu: ");
			console.log(record);
            await dispatch(challengeActions.completeLoginChallenge());
			// await registerForPushNotificationsAsync();
			props.navigation.navigate("Menu");
		} catch (err) {
			Alert.alert(err.message);
        }
    }, [dispatch, dailyCigars, packPrice, packAmount]);
    
    if (error) {
		return (
			<View style={styles.loading}>
				<DefaultText>{Traducao.t('error')}</DefaultText>
				<DefaultText>{error}</DefaultText>

				<Button
					title={Traducao.t('tryAgain')}
					onPress={loadRecord}
					color={Colors.primaryColor}
				/>
			</View>
		);
	}

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.container}>
                <Card style={styles.card}>
                    <DefaultTitle style={styles.title}>{Traducao.t('welcome')}</DefaultTitle>
                    <View style={styles.content}>
                        <DefaultText style={styles.text}>{Traducao.t('defineConsumption')}<DefaultText style={{color: Colors.primaryColor, fontWeight: 'bold'}}>Viva sem Tabaco.</DefaultText></DefaultText>
                        <DefaultText style={styles.text}>{Traducao.t('didYouKnow')}<DefaultText style={{fontWeight: 'bold'}}>{Traducao.t('cash')}</DefaultText>{Traducao.t('expenditure')}</DefaultText>
                        <DefaultText style={styles.text}>{Traducao.t('information')}</DefaultText>

                        {/* DADOS DE CONSUMO */}
                        <View style={styles.colunaConsumo}>
                            <View style={{...styles.consumoContainer, marginBottom: 10}}>
                                <DefaultText style={styles.consumoText}>{Traducao.t('cigarettesInfo')}</DefaultText>
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
                                <DefaultText style={styles.consumoText}>{Traducao.t('packPrice')}</DefaultText>
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
                                <DefaultText style={styles.consumoText}>{Traducao.t('quantityCigarette')}</DefaultText>
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
                            <DefaultText style={styles.buttonText}>{Traducao.t('proceed')}</DefaultText>
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

export default RecordScreen;