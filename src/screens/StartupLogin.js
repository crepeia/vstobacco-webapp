import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as recordActions from '../store/actions/record';
import * as challengeActions from '../store/actions/challenge';
import * as achievementActions from '../store/actions/achievement';
import * as tipActions from '../store/actions/tips';
import * as optionsActions from '../store/actions/options';
// import * as messageActions from '../store/actions/message';


import * as Notifications from "expo-notifications";
// import { Notifications } from 'expo';
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import moment from "moment";

import Colors from "../constants/Colors";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true
    };
  }
});

const StartupLogin = (props) => {
	const today = new Date();
	const day = today.getDate();
	const isEven = day % 2;

	const cigarsNotSmoken = useSelector(state => state.achievement.cigarsNotSmoken);
	const moneySaved = useSelector(state => state.achievement.moneySaved);
	const lifeTimeSaved = useSelector(state => state.achievement.lifeTimeSaved);
	
	// calculo tempo vida	
	const mes = lifeTimeSaved > 43800 ? Math.floor(lifeTimeSaved / 43800) : 0;
	const mesPercent = mes >= 1 ? lifeTimeSaved % 43800 : lifeTimeSaved;

	const dia = mesPercent > 1440 ? Math.floor(mesPercent / 1440) : 0;
	const diaPercent = dia >= 1 ? mesPercent % 1440 : mesPercent;

	const hora = diaPercent > 60 ? Math.floor(diaPercent / 60) : 0;
	const horaPercent = hora >= 1 ? diaPercent % 60 : diaPercent; //minutos

	const lifeTimeSavedText = `${mes === 1 ? `${mes} mês` : `${mes} meses`}, ${dia === 1 ? `${dia} dia` : `${dia} dias`}, ${hora === 1 ? `${hora} hora` : `${hora} horas`} e ${horaPercent === 1 ? `${horaPercent} minuto` : `${horaPercent} minutos`}`;
	// fim calculo tempo vida

    const dispatch = useDispatch();

    const [isLogging, setIsLogging] = useState(false);

	const options = useSelector((state) => state.options.options);
    const registerForPushNotificationsAsync = async () => {
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(
				Permissions.NOTIFICATIONS
			);
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } = await Permissions.askAsync(
					Permissions.NOTIFICATIONS
				);
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				await dispatch(
					optionsActions.updateOptions(
						false,
						false,
						false,
						moment(options.cigarNotificationTime, "HH:mm").format(
							"HH:mm"
						),
						moment(options.tipNotificationTime, "HH:mm").format(
							"HH:mm"
						),
						moment(options.achievementsNotificationTime, "HH:mm").format(
							"HH:mm"
						),
						""
					)
				);
				return;
			}

			let token = (await Notifications.getExpoPushTokenAsync()).data;

			Notifications.cancelAllScheduledNotificationsAsync();

			// configuração notificação cigarro

			const idCigarNotification = await Notifications.scheduleNotificationAsync({
				content: {
					title: "Lembrete",
					body: "Informe a quantidade de cigarros fumados hoje!",
					data: JSON.stringify({ screen: "Cigarros fumados" }),
					sound: true
				},
				trigger: {
					hour: parseInt(options.cigarNotificationTime),
					minute: 0,
					repeats: true
				}
			});

			// configuracao notificacao conquista

			const idAchievementsNotification = await Notifications.scheduleNotificationAsync({
				content: {
					title: "Conquista =)",
					body: isEven === 0 ? `Você deixou de fumar ${cigarsNotSmoken} cigarros e salvou ${lifeTimeSavedText} da sua vida!` 
					: `Você deixou de fumar ${cigarsNotSmoken} cigarros e economizou R$${moneySaved.toFixed(2)}!`,
					data: JSON.stringify({ screen: " Conquistas" }),
					sound: true
				},
				trigger: {
					hour: parseInt(options.achievementsNotificationTime),
					minute: 0,
					repeats: true
				}
			});

			// configuracao notificacao dicas

			const idTipNotification = await Notifications.scheduleNotificationAsync({
				content: {
					title: "Lembrete",
					body: "Passando para lembrá-lo de ler uma nova dica no Viva sem Tabaco!",
					data: JSON.stringify({ screen: "Dicas" }),
					sound: true
				},
				trigger: {
					hour: parseInt(options.tipNotificationTime),
					minute: 0,
					repeats: true
				}
			});

			await dispatch(
				optionsActions.updateOptions(
					true,
					true,
					true,
					moment(options.cigarNotificationTime, "HH:mm").format(
						"HH:mm"
					),
					moment(options.tipNotificationTime, "HH:mm").format(
						"HH:mm"
					),
					moment(options.achievementsNotificationTime, "HH:mm").format(
						"HH:mm"
					),
					token
				)
			);

			await dispatch(optionsActions.storeIdCigarNotification(idCigarNotification));
			await dispatch(optionsActions.storeIdAchievementsNotification(idAchievementsNotification));
			await dispatch(optionsActions.storeIdTipNotification(idTipNotification));
		} else {
			await dispatch(
				optionsActions.updateOptions(
					false,
					false,
					false,
					moment(options.cigarNotificationTime, "HH:mm").format(
						"HH:mm"
					),
					moment(options.tipNotificationTime, "HH:mm").format(
						"HH:mm"
					),
					moment(options.achievementsNotificationTime, "HH:mm").format(
						"HH:mm"
					),
					""
				)
			);
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
			  name: 'default',
			  importance: Notifications.AndroidImportance.MAX,
			  vibrationPattern: [0, 250, 250, 250],
			  lightColor: '#FF231F7C',
			});
		}		
    };

	useEffect(() => {
        const tryLogin = async () => {
			await dispatch(recordActions.fetchRecord());
			await dispatch(recordActions.fetchDailyLogs());
			// await dispatch(challengeActions.fetchChallenges());
			// await dispatch(challengeActions.fetchUserChallenges());
			// await dispatch(challengeActions.completeLoginChallenge());
			await dispatch(achievementActions.fetchDailyAchievements());
			// await dispatch(tipActions.fetchTips());
			// await dispatch(tipActions.fetchUserTips());
			await dispatch(optionsActions.fetchOptions());
			setIsLogging(true);
		};
		tryLogin();

	}, [dispatch]);
	
	const record = useSelector((state) => state.record.record);
    
    useEffect(() => {
        if(isLogging){
			registerForPushNotificationsAsync();
			if (record.filled === false) {
				props.navigation.navigate("Record");
			} else {
				props.navigation.navigate("Menu");
			}
		}
    }, [dispatch, isLogging]);

	return (
		<View style={styles.loading}>
			<ActivityIndicator size='large' color={'white'} />
		</View>
	);
};

const styles = StyleSheet.create({
	loading: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.primaryColor
	},
});

export default StartupLogin;