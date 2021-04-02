import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, RefreshControl, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import * as Notifications from 'expo-notifications';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Line } from 'react-native-svg';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';

import HeaderButton from '../components/UI/HeaderButton';
import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors';

import * as optionsActions from '../store/actions/options';

import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

const mesPassado = moment().add(-31, 'days').format("MMMM");
const mesAtual = moment().format("MMMM");
const today = moment().format("YYYY-MM-DD");

const fillLabels = (numLabels, format) => {
	if (format === "week") {
		let lab = [moment(today).format("dddd").substr(0, 3)];
		for (let i = 1; i < numLabels; i++) {
			lab.unshift(moment(today).subtract(i, "days").format("dddd").substr(0, 3));
		}
		return lab;
	} else if (format === "month") {
		let lab = [moment(today).format("DD")]; // colocar DD %2 ou DD-MM %3
		for (let i = 1; i < numLabels; i++) {
			lab.unshift(moment(today).subtract(i, "days").format("DD")); // colocar DD %2 ou DD-MM %3
		}
		return lab;
	} else if (format === "year") {
		let lab = [moment(today).format("WW")]; // colocar WW %3 ou WW/YY %5
		for (let i = 1; i < numLabels; i++) {
			lab.unshift(moment(today).subtract(i, "weeks").format("WW")); // colocar WW %3 ou WW/YY %5
		}
		return lab;
	}
};


const fillData = (logs, days, format, dailyCigars) => {
	let data = [];
	let dailyCigarsArray = [];
	if (format === "week" || format === "month") {
		for (let i = 0; i < days; i++) {
			let index = logs.findIndex((l) => moment(l.logDate).isSame(moment(today).subtract(i, "days")));
			if (index >= 0) {
				data.unshift(logs[index].cigars);
			} else {
				data.unshift(0);
			}
			dailyCigarsArray.unshift(Number(dailyCigars));
		}
		
		return [
			{data: data},
			{
				data: dailyCigarsArray,
				svg:{
					stroke: 'transparent'
				}
			}];
	} else if (format === "year") {
		let reducedLog = logs.reduce((acc, curr) => {
			let id = moment(curr.logDate).format("WW/YY");

			if (!acc[id]) {
				acc[id] = { id: id, sumCigars: 0 };
			}
			acc[id].sumCigars += curr.cigars;
			return acc;
		}, {});

		let reducedObjArr = Object.keys(reducedLog).map((key) => {
			return reducedLog[key];
		});

		for (let i = 0; i < 52; i++) {
			let index = reducedObjArr.findIndex((l) => l.id === moment(today).subtract(i, "weeks").format("WW/YY"));
			if (index >= 0) {
				data.unshift(reducedObjArr[index].sumCigars);
			} else {
				data.unshift(0);
			}
			dailyCigarsArray.unshift(Number(dailyCigars));
		}
		
	}
	return [
		{data:data},
		{
			data:dailyCigarsArray,
			svg:{
				stroke: 'transparent'
			}
		}];
};

const HomeScreen = props => {

	const dispatch = useDispatch();

	// Para atualização das notificações de conquistas
	const today = new Date();
	const day = today.getDate();
	const isEven = day % 2;

	const cigarsNotSmoken = useSelector(state => state.achievement.cigarsNotSmoken);
	const moneySaved = useSelector(state => state.achievement.moneySaved);
	const lifeTimeSaved = useSelector(state => state.achievement.lifeTimeSaved);

	const options = useSelector((state) => state.options.options);

	const registerForPushNotificationsAsync = useCallback(async () => {

		// calculo tempo vida	
		const mes = lifeTimeSaved > 43800 ? Math.floor(lifeTimeSaved / 43800) : 0;
		const mesPercent = mes >= 1 ? lifeTimeSaved % 43800 : lifeTimeSaved;

		const dia = mesPercent > 1440 ? Math.floor(mesPercent / 1440) : 0;
		const diaPercent = dia >= 1 ? mesPercent % 1440 : mesPercent;

		const hora = diaPercent > 60 ? Math.floor(diaPercent / 60) : 0;
		const horaPercent = hora >= 1 ? diaPercent % 60 : diaPercent; //minutos

		const lifeTimeSavedText = `${mes === 1 ? `${mes} mês` : `${mes} meses`}, ${dia === 1 ? `${dia} dia` : `${dia} dias`}, ${hora === 1 ? `${hora} hora` : `${hora} horas`} e ${horaPercent === 1 ? `${horaPercent} minuto` : `${horaPercent} minutos`}`;
		// fim calculo tempo vida

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

			Alert.alert('Sobre as notificações: ', 'Você pode alterar o horário de notificação em Opções no menu.', [
				{ text: "Ok", style: "destructive" },
			]);

			let token = (await Notifications.getExpoPushTokenAsync()).data;

			Notifications.cancelAllScheduledNotificationsAsync();

			// configuração notificação cigarro

			if (options.allowCigarNotifications) {
				let idCigarNotification = await Notifications.scheduleNotificationAsync({
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
			}

			// configuracao notificacao conquista

			if (options.allowAchievementsNotifications) {
				let idAchievementsNotification = await Notifications.scheduleNotificationAsync({
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
			}

			// configuracao notificacao dicas

			if (options.allowTipNotifications) {
				let idTipNotification = await Notifications.scheduleNotificationAsync({
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
			}

			await dispatch(
				optionsActions.updateOptions(
					options.allowCigarNotifications,
					options.allowTipNotifications,
					options.allowAchievementsNotifications,
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
			console.log("Se estou no emulador cai aqui");
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
		
	}, [cigarsNotSmoken, lifeTimeSaved, moneySaved]);

	// Para atualização das notificações de conquistas

	// const handleNotification = (notification) => {
	// 	//console.log(notification);
	// 	if (notification.origin === "selected") {
	// 		props.navigation.navigate({
	// 			routeName: notification.data.screen,
	// 		});
	// 	}
	// };

	// useEffect(() => {
	// 	Notifications.addListener(handleNotification);
	// }, []);

	const record = useSelector((state) => state.record.record);
	const dailyLogs = useSelector((state) => state.record.dailyLogs);

	const [isLoading, setIsLoading] = useState(false);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const [selectedPlot, setSelectedPlot] = useState("week");
	const [definitiveSelectedPlot, setDefinitiveSelectedPlot] = useState("week");

	const [labels, setLabels] = useState(fillLabels(7, "week"));
	const [data, setData] = useState(fillData(dailyLogs, 7, "week"));

	const [sumPeriod, setSumPeriod] = useState(
		dailyLogs
			.filter((log) => moment(log.logDate) > moment().subtract(7, "days") && moment(log.logDate) <= moment())
			.map((wl) => wl.cigars)
			.reduce((a, b) => a + b, 0)
	);
	const [avgPeriod, setAvgPeriod] = useState((sumPeriod / 7).toFixed(2));
	const [cigarsToday, setCigarsToday] = useState(
		dailyLogs.findIndex((wl) => wl.logDate === today) >= 0 ? dailyLogs.find((wl) => wl.logDate === today).cigars : 0
	);

	const setPlotType = useCallback(() => {
		let sum = 0;
		setCigarsToday(
			dailyLogs.findIndex((wl) => wl.logDate === today) >= 0
				? dailyLogs.find((wl) => wl.logDate === today).cigars
				: 0
		);
		setLabels(fillLabels(7, "week"));
		setData(fillData(dailyLogs, 7, "week", record.cigarsDaily));
		sum = dailyLogs
			.filter(
				(log) => moment(log.logDate) > moment().subtract(7, "days") && moment(log.logDate) <= moment()
			)
			.map((wl) => wl.cigars)
			.reduce((a, b) => a + b, 0);
		setSumPeriod(sum);
		setAvgPeriod((sum / 7).toFixed(2));
		return;
	}, [dailyLogs]);

	const resetState = useCallback(async () => {
		setIsRefreshing(true);
		setPlotType();
		registerForPushNotificationsAsync();
		setIsRefreshing(false);
	}, [dailyLogs, cigarsNotSmoken, lifeTimeSaved, moneySaved]);

	useEffect(() => {
		const unsubscribe = props.navigation.addListener('focus', resetState);
	  
		return unsubscribe;
	}, [resetState]);

	if (isLoading) {
		return (
			<View style={styles.loading}>
				<ActivityIndicator size='large' color={Colors.secondaryColor} />
			</View>
		);
	}
	
	// Variáveis de consumo
	const dailyCigars = record.cigarsDaily.toString();
	const packPrice = record.packPrice.toString();
	const packAmount = record.packAmount.toString();

	// Variável e Componente p/ gráfico
	const verticalContentInset = { top: 20, bottom: 20 };
	const HorizontalLine = (({ y }) => (
		<Line
			key={ 'zero-axis' }
			x1={ '0%' }
			x2={ '100%' }
			y1={ y(dailyCigars) }
			y2={ y(dailyCigars) } //cigarros fumados no dia antes
			stroke={ Colors.red }
			strokeDasharray={ [ 4, 12 ] }
			strokeWidth={ 2 }
		/>
	));

    return (
		<ScrollView 
			refreshControl={<RefreshControl 
			refreshing={isRefreshing} 
			onRefresh={() =>  {
				resetState();
			}}/>} 
			contentContainerStyle={{flexGrow: 1}}>
			<View style={styles.background}>
				<View style={{marginVertical: 20}}>
					<DefaultTitle style={styles.title}>Cigarros fumados na semana</DefaultTitle>
				</View>
				{/* GRÁFICO */}
				{!isRefreshing && (
				<View style={styles.chartContainer}>
					<YAxis 
						data={data[0].data.concat(data[1].data)}
						style={{ marginBottom: 14 }}
						contentInset={verticalContentInset}
						svg={{
							fontSize: 10, 
							fill: 'grey'
						}}
						numberOfTicks={5}
					/>
					<View style={{flex: 1, marginLeft: 10 }}>
						<LineChart
							style={{ flex: 1 }}
							data={data}
							contentInset={verticalContentInset}
							svg={{ stroke: Colors.primaryColor }}								
						>
							<Grid />
							<HorizontalLine />
						</LineChart>
						<XAxis 
							style={{ marginHorizontal: -10,  }}
							data={data[0].data}
							formatLabel={definitiveSelectedPlot === 'week' ? (_, index) => labels[index] : definitiveSelectedPlot === 'month' ? (_, index) => (index+1)%2 === 0 ? labels[index] : '' : (_, index) => (index+1)%3 === 0 ? labels[index] : '' }
							contentInset={{ left: 14, right: 14 }}
							svg={{
								fontSize: 10, 
								fill: 'grey',
							}}
						/>
					</View>
				</View>
				)}
				{/* GRÁFICO LEGENDA */}
				<View style={{width: '100%', alignItems: 'center', paddingHorizontal: 10}}>
					{definitiveSelectedPlot === 'year' ?
						<View style={{marginBottom: 2}}>
							<DefaultText style={{fontSize: 11}}>{'Números acima correspondem às semanas e cada ano tem 52 semanas'}</DefaultText>
						</View>
						:
						definitiveSelectedPlot === 'month' ?
						<View style={{marginBottom: 2}}>
							<DefaultText style={{fontSize: 11}}>{'Números acima correspondem aos dias de' + mesAtual + ' e ' + mesPassado}</DefaultText>
						</View>
						:
						null
					}
					<View style={styles.chartSubtitle}>
						<View style={styles.subtitleContainer}>
							<View style={{...styles.circleSubtitle, backgroundColor: Colors.primaryColor}} />
							<DefaultText>{definitiveSelectedPlot === 'year' ? 'Cigarros na semana' : 'Cigarros'}</DefaultText>
						</View>
						<View style={styles.subtitleContainer}>
							<View style={{...styles.circleSubtitle, backgroundColor: Colors.red}} />
							<DefaultText>{definitiveSelectedPlot === 'year' ? 'Cigarros fumados ao longo de uma semana' : 'Cigarros fumados por dia antes da intervenção'}</DefaultText>
						</View>
					</View>
				</View>

				{/* DADOS DO GRÁFICO */}
				<View style={styles.linhaDados}>
					<View style={styles.dados}>
						<DefaultText style={styles.numeroDados}>{avgPeriod}</DefaultText>
						<DefaultText style={styles.legendaDados}>{'média'}</DefaultText>
						<DefaultText style={styles.legendaDados}>{'cigarros/dia'}</DefaultText>
					</View>

					<View style={styles.dados}>
						<DefaultText style={styles.numeroDados}>{cigarsToday}</DefaultText>
						<DefaultText style={styles.legendaDados}>{'cigarros hoje'}</DefaultText>
					</View>

					<View style={styles.dados}>
						<DefaultText style={styles.numeroDados}>{sumPeriod}</DefaultText>
						<DefaultText style={styles.legendaDados}>{'total de cigarros'}</DefaultText>
						<DefaultText style={styles.legendaDados}>{'no período'}</DefaultText>
					</View>
				</View>

				{/* DADOS DE CONSUMO */}
				<View style={styles.colunaConsumo}>
					<View style={{...styles.consumoContainer, marginBottom: 10}}>
						<DefaultText style={styles.consumoText}>{'Cigarros fumados por dia antes'}</DefaultText>
						<DefaultTitle style={styles.numberHighlight}>{dailyCigars}</DefaultTitle>
					</View>
					<View style={{...styles.consumoContainer, borderTopWidth: 0.8, borderBottomWidth: 0.8, borderColor: Colors.primaryColor, paddingVertical: 10}}>
						<DefaultText style={styles.consumoText}>{'Preço do maço de cigarros'}</DefaultText>
						<DefaultTitle style={styles.numberHighlight}>R$ {packPrice}</DefaultTitle>
					</View>
					<View style={{...styles.consumoContainer, marginTop: 10}}>
						<DefaultText style={styles.consumoText}>{'Quantidade de cigarros no maço'}</DefaultText>
						<DefaultTitle style={styles.numberHighlight}>{packAmount}</DefaultTitle>
					</View>
				</View>

			</View>
		</ScrollView>
    );
};

const styles = StyleSheet.create({
    background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white'
    },
    containerTitle: {
      	marginVertical: 20
    },
    title: {
		color: Colors.primaryColor,
		fontSize: 22,
		fontWeight: "bold"
	},
	chartContainer: {
		height: 260,
		width: '100%',
		paddingHorizontal: 18,
		paddingVertical: 2,
		flexDirection: 'row',
	},
	chartSubtitle: {
		width: Dimensions.get('window').width * 0.65,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 12,
	},
	subtitleContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	circleSubtitle: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: Colors.red,
		marginRight: 6
	},
	linhaDados: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-around",
		alignItems: "flex-start",
		marginTop: 20
	},
	dados: {
		marginBottom: 20,
	},
	numeroDados: {
		fontSize: 30,
		color: Colors.primaryColor,
		alignSelf: "center",
	},
	legendaDados: {
		color: '#999',
		paddingTop: 2,
		alignSelf: "center",
	},
	colunaConsumo: {
		width: Dimensions.get('window').width * 0.95,
		paddingVertical: 10,
		paddingHorizontal: 10,
		borderWidth: 0.8,
		borderRadius: 10,
		borderColor: Colors.primaryColor
	},
	consumoContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	consumoText: {
		color: Colors.primaryColor,
		fontSize: 15,
		fontFamily: 'open-sans-bold'
	},
	numberHighlight: {
		marginRight: 4,
		color: Colors.primaryColor,
		fontSize: 18
	},
	button: {
        width: Dimensions.get('window').width * 0.9,
        marginBottom: 20,
        padding: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 7,
		elevation: 3,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
	centeredModal: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modal: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
});

export const screenOptions = navData => {
    return {
		headerTitle: 'Home',
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
		),
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item 
					title='Cigarros fumados'
					iconName={'md-add-circle'}
					onPress={() => {
					navData.navigation.navigate('Cigarros fumados');
					}}
				/>
			</HeaderButtons>
		)
    }
};

export default HomeScreen;