import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet, AsyncStorage } from "react-native";
import { useDispatch } from "react-redux";
import * as userActions from "../store/actions/user";

import Colors from "../constants/Colors";

const StartupScreen = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		const tryLogin = async () => {
			// AsyncStorage.removeItem("userData");
			const userData = await AsyncStorage.getItem("userData");

			if (!userData) {
				props.navigation.navigate("Login");
				return;
			}
			let parsedData = JSON.parse(userData);
			const { token, userId, userName, userEmail, birthDate, gender, inRanking, nickname } = parsedData;

			if (!token || !userId || !userEmail || !userName) {
				props.navigation.navigate("Login");
				return;
			}

			await dispatch(userActions.authenticate(token, userId, userName, 
				userEmail, birthDate, gender, inRanking, nickname));

			// props.navigation.navigate("Navegacao");
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
