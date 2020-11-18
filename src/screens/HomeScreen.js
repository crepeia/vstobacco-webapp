import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, ScrollView, ActivityIndicator, Alert, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LineChart, Grid, XAxis, YAxis } from 'react-native-svg-charts';
import { Line } from 'react-native-svg';
import moment from 'moment';

import NumberInput from '../components/UI/NumberInput';
import HeaderButton from '../components/UI/HeaderButton';
import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors';

const data = [
	{
		data: [0, 1, 4, 3, 1, 2, 0]
	},
	{
		data: [5, 5, 5, 5, 5, 5, 5],
		svg:{
			stroke: 'transparent'
		}
	}
];

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

const HomeScreen = props => {

	const [isLoading, setIsLoading] = useState(false);

	const [selectedPlot, setSelectedPlot] = useState("week");
	const [definitiveSelectedPlot, setDefinitiveSelectedPlot] = useState("week");

	const [labels, setLabels] = useState(fillLabels(7, "week"));
	const [goal, setGoal] = useState(5);

	const [sumPeriod, setSumPeriod] = useState(11);
	const [avgPeriod, setAvgPeriod] = useState((sumPeriod / 7).toFixed(2));
	const [drinksToday, setDrinksToday] = useState(0);

	// Variáveis de consumo
	const [dailyCigars, setDailyCigars] = useState('0');
	const [packPrice, setPackPrice] = useState('0');
	const [packAmount, setPackAmount] = useState('0');
	const [isModified, setIsModified] = useState(false);

	// Variável e Componente p/ gráfico
	const verticalContentInset = { top: 20, bottom: 20 };
	const HorizontalLine = (({ y }) => (
		<Line
			key={ 'zero-axis' }
			x1={ '0%' }
			x2={ '100%' }
			y1={ y(goal) }
			y2={ y(goal) } //cigarros fumados no dia
			stroke={ Colors.red }
			strokeDasharray={ [ 4, 12 ] }
			strokeWidth={ 2 }
		/>
	));

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', () => {
			return true;
		})
	}, []);

    return (
		<ScrollView contentContainerStyle={{flexGrow: 1}}>
			<View style={styles.background}>
				<View style={styles.containerTitle}>
					<DefaultText style={styles.title}>Cigarros fumados na semana</DefaultText>
				</View>

				{/* GRÁFICO */}
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
							<DefaultText>{definitiveSelectedPlot === 'year' ? 'Cigarros fumados ao longo de uma semana' : 'Cigarros fumados por dia'}</DefaultText>
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
						<DefaultText style={styles.numeroDados}>{drinksToday}</DefaultText>
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
						<DefaultTitle style={styles.numberHighlight}>{'5'}</DefaultTitle>
					</View>
					<View style={{...styles.consumoContainer, borderTopWidth: 0.8, borderBottomWidth: 0.8, borderColor: Colors.primaryColor, paddingVertical: 10}}>
						<DefaultText style={styles.consumoText}>{'Preço do maço de cigarros'}</DefaultText>
						<DefaultTitle style={styles.numberHighlight}>R$ {'4.70'}</DefaultTitle>
					</View>
					<View style={{...styles.consumoContainer, marginTop: 10}}>
						<DefaultText style={styles.consumoText}>{'Quantidade de cigarros no maço'}</DefaultText>
						<DefaultTitle style={styles.numberHighlight}>{'10'}</DefaultTitle>
					</View>
				</View>

				{/* BOTÃO SALVAR */}
				{isModified 
					&&
				<TouchableOpacity 
					onPress={() => {
						Alert.alert('Dados de consumo salvos com sucesso!');
						setIsModified(false);
					}}
					style={styles.button}
				>
					{isLoading ? 
						<ActivityIndicator size={27} color='white' />
						:
						<DefaultText style={styles.buttonText}>{'Salvar alterações'}</DefaultText>
					}
				</TouchableOpacity>
				}

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