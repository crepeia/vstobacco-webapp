import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Alert, ScrollView, Dimensions, ActivityIndicator, Linking } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Notifications from 'expo-notifications';
import { useSelector, useDispatch } from 'react-redux';
import { Gravatar } from 'react-native-gravatar';

import * as userActions from '../store/actions/user';
import * as evaluationActions from '../store/actions/evaluation';

import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import HeaderButton from '../components/UI/HeaderButton';
import DefaultTitle from '../components/DefaultTitle';
import Card from '../components/UI/Card';
import Localhost from '../constants/Localhost';
import Traducao from '../components/Traducao/Traducao';

import { AntDesign } from '@expo/vector-icons';

const PerfilScreen = (props) => {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState();

	const user = useSelector((state) => state.user.currentUser);
	const evaluation = useSelector((state) => state.evaluation.evaluation);
	const options = { email: user.email, secure: true };

	const logout = useCallback(async () => {
		setError(null);

		try {
			setLoading(true);
			Notifications.cancelAllScheduledNotificationsAsync();
			await dispatch(userActions.logout());
		} catch (err) {
			setLoading(false);
			setError(err.message);
		}
	}, [dispatch]);

	const loadEvaluation = useCallback(async () => {
		setError(null);
		try {
			setLoading(true);
			await dispatch(evaluationActions.fetchEvaluation());
		} catch (err) {
			setError(err.message);
		}
		setLoading(false);
	}, [dispatch]);

	useEffect(() => {
		setLoading(true);
		loadEvaluation().then(() => {
			setLoading(false);
		});
	}, [dispatch, loadEvaluation]);

	/* useEffect(() => {
		if (error) {
			Alert.alert('Um erro ocorreu!', error, [{ text: 'Ok' }]);
		}
	}, [error]); */

	if (loading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size='large' color={Colors.primaryColor} />
			</View>
		);
	}

	return (
		<ScrollView style={styles.background}>
			<View style={styles.container}>
				<Gravatar options={options} style={styles.avatar} />

				<DefaultText style={styles.nickname}>{user.name}</DefaultText>
				<DefaultText style={styles.email}>{user.email}</DefaultText>

				<TouchableOpacity onPress={logout} style={{ marginTop: 25 }}>
					<AntDesign name="logout" size={40} color={Colors.errorColor} />
				</TouchableOpacity>

				{/* Caso a pessoa não tenha plano preenchido: */}
				{!evaluation && (
					<View style={styles.containerEval}>
						<DefaultText style={styles.createPlanText}>{Traducao.t('withoutPlan')}</DefaultText>
						<TouchableOpacity
							onPress={() =>
								Linking.openURL(
									`http://www.vivasemtabaco.com.br/wati/programa.xhtml`
								)
							}
							style={styles.button}
						>
							<DefaultText style={styles.buttonText}>{Traducao.t('createPlan')}</DefaultText>
						</TouchableOpacity>

					</View>
				)}

				{/* Caso a pessoa tenha plano preenchido: */}
				{evaluation && (
					<Card style={styles.plano}>
						<DefaultTitle style={styles.tituloPlano}>{Traducao.t('yourPlan')}</DefaultTitle>

						<DefaultText style={styles.labelPlano}>{Traducao.t('stopDate')}</DefaultText>
						<DefaultText style={styles.textoPlano}>{evaluation.dataParada}</DefaultText>

						<DefaultText style={styles.labelPlano}>{Traducao.t('fissureTechniques')}</DefaultText>
						{evaluation.beberAgua && <DefaultText style={styles.textoPlano}>{Traducao.t('drinkWater')}</DefaultText>}
						{evaluation.comerAlimentos && <DefaultText style={styles.textoPlano}>{Traducao.t('eatFruits')}</DefaultText>}
						{evaluation.lerCartao && <DefaultText style={styles.textoPlano}>{Traducao.t('readYourCard')}</DefaultText>}
						{evaluation.exercicioRelaxamento && <DefaultText style={styles.textoPlano}>{Traducao.t('doExercises')}</DefaultText>}
						{!evaluation.beberAgua && !evaluation.comerAlimentos && !evaluation.lerCartao && !evaluation.exercicioRelaxamento
							&& <DefaultText style={styles.textoPlano}>{Traducao.t('withoutFissureTechniques')}</DefaultText>}

						<DefaultText style={styles.labelPlano}>{Traducao.t('preventRelapse')}</DefaultText>
						{evaluation.evitarRecaida1 && <DefaultText style={styles.textoPlano}>{evaluation.evitarRecaida1}</DefaultText>}
						{evaluation.evitarRecaida2 && <DefaultText style={styles.textoPlano}>{evaluation.evitarRecaida2}</DefaultText>}
						{evaluation.evitarRecaida3 && <DefaultText style={styles.textoPlano}>{evaluation.evitarRecaida3}</DefaultText>}
						{!evaluation.evitarRecaida1 && !evaluation.evitarRecaida2 && !evaluation.evitarRecaida3 && <DefaultText style={styles.textoPlano}>{Traducao.t('withoutTechniquesToRelapse')}</DefaultText>}

					</Card>
				)}
			</View>
		</ScrollView>
	);
};

export const screenOptions = navData => {
	return {
		headerTitle: Traducao.t('perfilScreen'),
		headerLeft: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Menu'
					iconName={'md-menu'}
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		)
	}
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		backgroundColor: 'white',
	},
	container: {
		flex: 1,
		alignItems: 'center',
	},
	containerEval: {
		alignItems: 'center',
		paddingTop: 25,
		paddingHorizontal: 20,
	},
	avatar: {
		width: 150,
		height: 150,
		borderRadius: 75,
		marginTop: 30,
	},
	nickname: {
		marginTop: 30,
		fontSize: 22,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	email: {
		fontSize: 20,
		paddingHorizontal: 5,
	},
	createPlanText: {
		paddingHorizontal: 5,
		textAlign: 'center'
	},
	button: {
		width: Dimensions.get('window').width * 0.9,
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 20,
		padding: 10,
		backgroundColor: Colors.primaryColor,
		borderRadius: 5,
		elevation: 3,
	},
	buttonText: {
		fontSize: 20,
		color: 'white',
		// textAlign: 'center'
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	plano: {
		marginVertical: 25,
		padding: 20,
		elevation: 0
	},
	tituloPlano: {
		color: Colors.primaryColor,
		marginBottom: 5,
	},
	labelPlano: {
		fontFamily: 'open-sans-bold',
		textAlign: 'left',
		fontSize: 15,
	},
	textoPlano: {
		textAlign: 'justify',
		fontSize: 15,
		paddingBottom: 10,
	},
});

export default PerfilScreen;