import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Switch, Dimensions, FlatList, ActivityIndicator, Alert } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DefaultText from '../components/DefaultText';
import HeaderButton from '../components/UI/HeaderButton';
import HelpButtonModal from '../components/HelpButtonModal';
import OptionsHeader from '../components/OptionsHeader';
import HourContainer from '../components/UI/HourContainer';

// redux
import * as optionsActions from '../store/actions/options';
import * as userActions from '../store/actions/user';
import { useDispatch, useSelector } from "react-redux";

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


import Colors from '../constants/Colors';
import Traducao from '../components/Traducao/Traducao';

// o que ele faz quando chega notificacao com o app aberto
Notifications.setNotificationHandler({
	handleNotification: async () => {
		return {
			shouldShowAlert: true
		};
	}
});

const OptionsScreen = props => {
	const today = new Date();
	const day = today.getDate();
	const isEven = day % 2;

	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);

	const options = useSelector(state => state.options.options);
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

	const lifeTimeSavedText = `${mes === 1 ? `${mes} ${Traducao.t('month')}` : `${mes} ${Traducao.t('months')}`}, ${dia === 1 ? `${dia} ${Traducao.t('day')}` : `${dia} ${Traducao.t('days')}`}, ${hora === 1 ? `${hora} ${Traducao.t('hour')}` : `${hora} ${Traducao.t('hours')}`} e ${horaPercent === 1 ? `${horaPercent} ${Traducao.t('minute')}` : `${horaPercent} ${Traducao.t('minutes')}`}`;
	// fim calculo tempo vida

	const inRanking = useSelector((state) => state.user.currentUser.inRanking);
	const userNickname = useSelector((state) => state.user.currentUser.nickname);

	// Variáveis para o Modal
	const hours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
	const [modalCigarVisible, setModalCigarVisible] = useState(false);
	const [modalTipVisible, setModalTipVisible] = useState(false);
	const [modalAchievementsVisible, setModalAchievementsVisible] = useState(false);
	const deviceWidth = Dimensions.get('window').width;
	const deviceHeight = Dimensions.get('window').height;

	const [cigarNotification, setCigarNotification] = useState(options.allowCigarNotifications);
	const [cigarNotificationTime, setCigarNotificationTime] = useState(moment(options.cigarNotificationTime, "HH:mm").format("HH:mm"));
	const [cigarNotificationTimeString, setCigarNotificationTimeString] = useState();

	const [tipNotification, setTipNotification] = useState(options.allowTipNotifications);
	const [tipNotificationTime, setTipNotificationTime] = useState(moment(options.tipNotificationTime, "HH:mm").format("HH:mm"));
	const [tipNotificationTimeString, setTipNotificationTimeString] = useState();

	const [achievementsNotification, setAchievementsNotification] = useState(options.allowAchievementsNotifications);
	const [achievementsNotificationTime, setAchievementsNotificationTime] = useState(moment(options.achievementsNotificationTime, "HH:mm").format("HH:mm"));
	const [achievementsNotificationTimeString, setAchievementsNotificationTimeString] = useState();

	const [isInRanking, setIsInRanking] = useState(true);

	useEffect(() => {
		setIsInRanking(inRanking);
	}, [inRanking])

	const saveOptions = useCallback(async () => {
		let finalStatus = '';
		let token = '';
		setIsLoading(true);
		if (cigarNotification || tipNotification || achievementsNotification) {
			if (Constants.isDevice) {
				const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
				finalStatus = existingStatus;

				if (existingStatus !== 'granted') {
					alert(Traducao.t('notificationPermission'));
					const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
					finalStatus = status;
				}
				if (finalStatus !== 'granted') {
					alert(Traducao.t('nonTokenPermission'));
					setIsLoading(false);
					return;
				}
				token = (await Notifications.getExpoPushTokenAsync()).data;
			} else {
				alert(Traducao.t('notificationsDevices'));
			}

			if (Platform.OS === 'android') {
				Notifications.setNotificationChannelAsync('default', {
					name: 'default',
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: '#FF231F7C',
				});
			}
		}

		Notifications.cancelAllScheduledNotificationsAsync();

		// notificacao cigarros 

		if (cigarNotification) {
			let idCigarNotification = await Notifications.scheduleNotificationAsync({
				content: {
					title: Traducao.t('reminder'),
					body: Traducao.t('informQuantity'),
					data: JSON.stringify({ screen: "Cigarros fumados" }),
					sound: true
				},
				trigger: {
					hour: parseInt(cigarNotificationTime),
					minute: 0,
					repeats: true
				}
			});
		}

		// notificacao conquistas

		if (achievementsNotification) {
			let idAchievementsNotification = await Notifications.scheduleNotificationAsync({
				content: {
					title: Traducao.t('conquest'),
					body: isEven === 0 ? `${Traducao.t('conquestPhrasePart1')} ${cigarsNotSmoken} ${Traducao.t('conquestPhrasePart2')} ${lifeTimeSavedText} ${Traducao.t('conquestPhrasePart3')}`
						: `${Traducao.t('conquestPhrasePart4')} ${cigarsNotSmoken} ${Traducao.t('conquestPhrasePart5')}${moneySaved.toFixed(2)}!`,
					data: JSON.stringify({ screen: " Conquistas" }),
					sound: true
				},
				trigger: {
					hour: parseInt(achievementsNotificationTime),
					minute: 0,
					repeats: true
				}
			});
		}

		// notificacao dicas

		if (tipNotification) {
			let idTipNotification = await Notifications.scheduleNotificationAsync({
				content: {
					title: Traducao.t('reminder'),
					body: Traducao.t('reminderTip'),
					data: JSON.stringify({ screen: "Dicas" }),
					sound: true
				},
				trigger: {
					hour: parseInt(tipNotificationTime),
					minute: 0,
					repeats: true
				}
			});
		}

		await dispatch(optionsActions.updateOptions(cigarNotification, tipNotification, achievementsNotification, cigarNotificationTime, tipNotificationTime, achievementsNotificationTime, token));
		await dispatch(userActions.toggleRanking(isInRanking, userNickname));

		setIsLoading(false);
		Alert.alert(Traducao.t('options'), Traducao.t('savedChanges'), [{ text: 'Ok', style: 'destructive' }])
	}, [dispatch, isInRanking, cigarNotification, cigarNotificationTime, tipNotification, tipNotificationTime, achievementsNotification, achievementsNotificationTime]);


	return (
		<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
			<View style={styles.background}>

				{/* HEADER DAS NOTIFICAÇÕES */}
				<OptionsHeader
					title={Traducao.t('notifications')}
				>
					<HelpButtonModal title={Traducao.t('notifications')}>
						<DefaultText style={styles.helpText}>{Traducao.t('sendingNotifications')}</DefaultText>

						<DefaultText style={styles.helpText}>
							<DefaultText style={{ fontFamily: 'open-sans-bold' }}>{Traducao.t('registerCigarettes')}</DefaultText>
							{Traducao.t('explanationRegisterCigarettes')}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							<DefaultText style={{ fontFamily: 'open-sans-bold' }}>{Traducao.t('registerReminderTips')}</DefaultText>
							{Traducao.t('explanationReminderTips')}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							<DefaultText style={{ fontFamily: 'open-sans-bold' }}>{Traducao.t('registerReminderConquests')}</DefaultText>
							{Traducao.t('explanationReminderConquests')}
						</DefaultText>
					</HelpButtonModal>
				</OptionsHeader>

				{/* SWITCH -> REGISTRO CIGARROS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('registerCigarettes')}</DefaultText>
					</View>

					<View style={styles.toggleContainer}>
						<Switch
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={cigarNotification ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setCigarNotification(prevState => !prevState)
							}
							}
							value={cigarNotification}
						/>
					</View>
				</View>

				{/* HORÁRIO -> REGISTRO CIGARROS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('reminderTime')}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Modal
							isVisible={modalCigarVisible}
							onBackdropPress={() => setModalCigarVisible(false)}
							hideModalContentWhileAnimating={true}
							deviceWidth={deviceWidth}
							deviceHeight={deviceHeight}
							backdropOpacity={0.5}
							animationIn='lightSpeedIn'
							animationOut='lightSpeedOut'
							animationInTiming={1000}
							animationOutTiming={600}
							backdropTransitionInTiming={1000}
						>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<View style={styles.modalContainer}>
									<View style={styles.modaltoggleContainer}>
										<TouchableOpacity activeOpacity={0.6} onPress={() => setModalCigarVisible(false)}>
											<Ionicons
												name='md-close'
												size={30}
											/>
										</TouchableOpacity>
									</View>

									<FlatList
										keyExtractor={item => item}
										data={hours}
										contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
										renderItem={itemData => (
											<HourContainer
												data={itemData.item}
												onPress={() => {
													setCigarNotificationTimeString(itemData.item)
													setCigarNotificationTime(moment(moment().format("YYYY-MM-DD").toString() + ' ' + itemData.item).format("HH:mm"))
													setModalCigarVisible(false)
												}}
											/>
										)}
									/>
								</View>
							</View>
						</Modal>

						<TouchableOpacity onPress={() => setModalCigarVisible(true)}>
							<DefaultText style={styles.hourText}>{cigarNotificationTimeString === undefined ? cigarNotificationTime : cigarNotificationTimeString}</DefaultText>
						</TouchableOpacity>

					</View>
				</View>

				{/* SWITCH -> NOVAS DICAS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('reminderNewTips')}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Switch
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={tipNotification ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setTipNotification(prevState => !prevState)
							}
							}
							value={tipNotification}
						/>
					</View>
				</View>

				{/* HORÁRIO -> NOVAS DICAS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('reminderTime')}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Modal
							isVisible={modalTipVisible}
							onBackdropPress={() => setModalTipVisible(false)}
							hideModalContentWhileAnimating={true}
							deviceWidth={deviceWidth}
							deviceHeight={deviceHeight}
							backdropOpacity={0.5}
							animationIn='lightSpeedIn'
							animationOut='lightSpeedOut'
							animationInTiming={1000}
							animationOutTiming={600}
							backdropTransitionInTiming={1000}
						>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<View style={styles.modalContainer}>
									<View style={styles.modaltoggleContainer}>
										<TouchableOpacity activeOpacity={0.6} onPress={() => setModalTipVisible(false)}>
											<Ionicons
												name='md-close'
												size={30}
											/>
										</TouchableOpacity>
									</View>

									<FlatList
										keyExtractor={item => item}
										data={hours}
										contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
										renderItem={itemData => (
											<HourContainer
												data={itemData.item}
												onPress={() => {
													setTipNotificationTimeString(itemData.item)
													setTipNotificationTime(moment(moment().format("YYYY-MM-DD").toString() + ' ' + itemData.item).format("HH:mm"))
													setModalTipVisible(false)
												}}
											/>
										)}
									/>
								</View>
							</View>
						</Modal>

						<TouchableOpacity onPress={() => setModalTipVisible(true)}>
							<DefaultText style={styles.hourText}>{tipNotificationTimeString === undefined ? tipNotificationTime : tipNotificationTimeString}</DefaultText>
						</TouchableOpacity>

					</View>
				</View>

				{/* SWITCH -> CONQUISTAS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('conquestsInfo')}</DefaultText>
					</View>

					<View style={styles.toggleContainer}>
						<Switch
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={achievementsNotification ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setAchievementsNotification(prevState => !prevState)
							}

							}
							value={achievementsNotification}
						/>
					</View>
				</View>

				{/* HORÁRIO -> CONQUISTAS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('reminderTime')}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Modal
							isVisible={modalAchievementsVisible}
							onBackdropPress={() => setModalAchievementsVisible(false)}
							hideModalContentWhileAnimating={true}
							deviceWidth={deviceWidth}
							deviceHeight={deviceHeight}
							backdropOpacity={0.5}
							animationIn='lightSpeedIn'
							animationOut='lightSpeedOut'
							animationInTiming={1000}
							animationOutTiming={600}
							backdropTransitionInTiming={1000}
						>
							<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
								<View style={styles.modalContainer}>
									<View style={styles.modaltoggleContainer}>
										<TouchableOpacity activeOpacity={0.6} onPress={() => setModalAchievementsVisible(false)}>
											<Ionicons
												name='md-close'
												size={30}
											/>
										</TouchableOpacity>
									</View>

									<FlatList
										keyExtractor={item => item}
										data={hours}
										contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start' }}
										renderItem={itemData => (
											<HourContainer
												data={itemData.item}
												onPress={() => {
													setAchievementsNotificationTimeString(itemData.item)
													setAchievementsNotificationTime(moment(moment().format("YYYY-MM-DD").toString() + ' ' + itemData.item).format("HH:mm"))
													setModalAchievementsVisible(false)
												}}
											/>
										)}
									/>
								</View>
							</View>
						</Modal>

						<TouchableOpacity onPress={() => setModalAchievementsVisible(true)}>
							<DefaultText style={styles.hourText}>{achievementsNotificationTimeString === undefined ? achievementsNotificationTime : achievementsNotificationTimeString}</DefaultText>
						</TouchableOpacity>

					</View>
				</View>

				{/* HEADER RANKING */}
				<OptionsHeader
					title={Traducao.t('ranking')}
				>
					<HelpButtonModal title={Traducao.t('ranking')}>
						<DefaultText style={styles.helpText}>
							{Traducao.t('notAppearInRankingInfo')}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							{Traducao.t('participateRankInfo')}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							{Traducao.t('anonymousRankingInfo')}
						</DefaultText>
					</HelpButtonModal>
				</OptionsHeader>

				{/* SWITCH -> RANKING */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{Traducao.t('participateRanking')}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Switch
							disabled={!inRanking}
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={isInRanking ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setIsInRanking(prevState => !prevState)
							}
							}
							value={isInRanking}
						/>
					</View>
				</View>

				{/* BOTÃO SALVAR */}
				<TouchableOpacity
					onPress={() => {
						saveOptions();
					}}
					style={styles.button}
				>
					{isLoading ?
						<ActivityIndicator size={27} color='white' />
						:
						<DefaultText style={styles.buttonText}>{Traducao.t('save')}</DefaultText>
					}
				</TouchableOpacity>

			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'white',
		paddingTop: 6
	},
	helpText: {
		fontSize: 16,
		marginBottom: 15,
		textAlign: 'center'
	},
	line: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: Dimensions.get('window').width * 0.9,
		marginBottom: 12,
		paddingVertical: 1,
	},
	textContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		maxWidth: '80%',
	},
	toggleContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%',
	},
	optionText: {
		fontSize: 15,
		fontFamily: 'open-sans',
	},
	modalContainer: {
		borderRadius: 15,
		backgroundColor: 'white',
		width: Dimensions.get('window').width * 0.6,
		height: Dimensions.get('window').height * 0.5,
		paddingBottom: 20
	},
	modaltoggleContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingRight: 20,
		paddingVertical: 5
	},
	hourText: {
		color: Colors.primaryColor,
		fontFamily: 'open-sans-bold',
		fontSize: 16,
	},
	button: {
		width: Dimensions.get('window').width * 0.9,
		marginVertical: 20,
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
		headerTitle: Traducao.t('optionsScreen'),
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

export default OptionsScreen;