import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as userActions from "../store/actions/user";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from "../constants/Colors";

const StartupScreen = (props) => {
	const dispatch = useDispatch();

	console.log("Dei logout vim para cá");

	useEffect(() => {
		const tryLogin = async () => {
			
			// AsyncStorage.removeItem("userData");
			const userData = await AsyncStorage.getItem("userData");

			if (!userData) {
				dispatch(userActions.setDidTryLogin());
				return;
			}
			let parsedData = JSON.parse(userData);
			const { token, userId, userName, userEmail, birthDate, gender, inRanking, nickname } = parsedData;

			if (!token || !userId || !userEmail || !userName) {
				dispatch(userActions.setDidTryLogin());
				return;
			}

			await dispatch(userActions.authenticate(token, userId, userName, 
				userEmail, birthDate, gender, inRanking, nickname));
				
		};

		tryLogin();
	}, [dispatch]);

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
		backgroundColor: Colors.primaryColor,
	},
});

export default StartupScreen;
