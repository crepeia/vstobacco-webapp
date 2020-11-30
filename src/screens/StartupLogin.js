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
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";
import moment from "moment";

import Colors from "../constants/Colors";

const StartupLogin = (props) => {
    const dispatch = useDispatch();

    const [isLogging, setIsLogging] = useState(false);

    const options = useSelector((state) => state.options.options);
	
	console.log(options.cigarNotificationTime);
	console.log('verifica aqui lu');
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

			const localNotification = {
				title: "Lembrete",
				body: "Informe a quantidade de cigarros fumados hoje!",
				data: JSON.stringify({ screen: "AddCigarrosScreen" }),
				android: { sound: true }, // Make a sound on Android
			};

			const schedulingOptions = {
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

			Notifications.scheduleNotificationAsync(
				localNotification,
				schedulingOptions
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