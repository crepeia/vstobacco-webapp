import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import * as recordActions from '../store/actions/record';
import * as challengeActions from '../store/actions/challenge';
import * as achievementActions from '../store/actions/achievement';
import * as tipActions from '../store/actions/tips';
import * as optionsActions from '../store/actions/options';
// import * as messageActions from '../store/actions/message';


// import * as Notifications from "expo-notifications";
import { Notifications } from 'expo';
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import moment from "moment";

import Colors from "../constants/Colors";
import { cancelAllScheduledNotificationsAsync } from "expo-notifications";

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

			cancelAllScheduledNotificationsAsync();

			// configuração notificação cigarro
			const localCigarNotification = {
				title: "Lembrete",
				body: "Informe a quantidade de cigarros fumados hoje!",
				data: JSON.stringify({ screen: "Cigarros fumados" }),
				android: { sound: true }, // Make a sound on Android
			};

			const schedulingCigarOptions = {
				time: moment(options.cigarNotificationTime, "HH:mm").isBefore(
					moment()
				)
					? moment(options.cigarNotificationTime, "HH:mm")
							.add(1, "day")
							.toDate()
					: moment(options.cigarNotificationTime, "HH:mm").toDate(),
				// (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
				repeat: "day",
			};

			const idCigarNotification = await Notifications.scheduleLocalNotificationAsync(
				localCigarNotification,
				schedulingCigarOptions
			);

			// configuracao notificacao conquista

			const localAchievementsNotification = {
				title: "Conquista",
				body: isEven === 0 ? `Você deixou de fumar ${cigarsNotSmoken} cigarros e salvou ${lifeTimeSavedText} da sua vida!` 
				: `Você deixou de fumar ${cigarsNotSmoken} cigarros e economizou R$${moneySaved.toFixed(2)}!`,
				data: JSON.stringify({ screen: "Conquistas" }),
				android: { sound: true }, // Make a sound on Android
			};

			const schedulingAchievementsOptions = {
				time: moment(options.achievementsNotificationTime, "HH:mm").isBefore(
					moment()
				)
					? moment(options.achievementsNotificationTime, "HH:mm")
							.add(1, "day")
							.toDate()
					: moment(options.achievementsNotificationTime, "HH:mm").toDate(),
				// (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
				repeat: "day",
			};

			const idAchievementsNotification = await Notifications.scheduleLocalNotificationAsync(
				localAchievementsNotification,
				schedulingAchievementsOptions
			);

			// configuracao notificacao dicas

			const localTipNotification = {
				title: "Lembrete",
				body: "Passando para lembrá-lo de ler uma nova dica no Viva sem Tabaco!",
				android: { sound: true }, // Make a sound on Android
			};

			const schedulingTipOptions = {
				time: moment(options.tipNotificationTime, "HH:mm").isBefore(
					moment()
				)
					? moment(options.tipNotificationTime, "HH:mm")
							.add(1, "day")
							.toDate()
					: moment(options.tipNotificationTime, "HH:mm").toDate(),
				// (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
				repeat: "day",
			};

			const idTipNotification = await Notifications.scheduleLocalNotificationAsync(
				localTipNotification,
				schedulingTipOptions
			);

			//console.log(token);
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

		if (Platform.OS === "android") {
			Notifications.createChannelAndroidAsync("default", {
				name: "default",
				sound: true,
				priority: "max",
				vibrate: [0, 250, 250, 250],
			});
		}
    };

	useEffect(() => {
        const tryLogin = async () => {
            await dispatch(recordActions.fetchRecord());
            await dispatch(recordActions.fetchDailyLogs());
            await dispatch(challengeActions.fetchChallenges());
			await dispatch(challengeActions.fetchUserChallenges());
			await dispatch(challengeActions.completeLoginChallenge());
			await dispatch(achievementActions.fetchDailyAchievements());
            await dispatch(tipActions.fetchTips());
            await dispatch(tipActions.fetchUserTips());
            await dispatch(optionsActions.fetchOptions());
            setIsLogging(true);
        };
        tryLogin();
    }, [dispatch]);
    
    useEffect(() => {
        if(isLogging){
            registerForPushNotificationsAsync();
            props.navigation.navigate("Record");
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