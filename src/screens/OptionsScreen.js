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

const OptionsScreen = props => {

	const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const options = useSelector(state => state.options.options);
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
	const [cigarNotificationTime, setCigarNotificationTime] = useState(moment(options.tipNotificationTime, "HH:mm").format("HH:mm"));
    const [cigarNotificationTimeString, setCigarNotificationTimeString] = useState();

	const [tipNotification, setTipNotification] = useState(options.allowTipNotifications);
	const [tipNotificationTime, setTipNotificationTime] = useState(moment(options.tipNotificationTime, "HH:mm").format("HH:mm"));
	const [tipNotificationTimeString, setTipNotificationTimeString] = useState();
	
	const [achievementsNotification, setAchievementsNotification] = useState(options.allowAchievementsNotifications);
	const [achievementsNotificationTime, setAchievementsNotificationTime] = useState(moment(options.achievementsNotificationTime, "HH:mm").format("HH:mm"));
    const [achievementsNotificationTimeString, setAchievementsNotificationTimeString] = useState();

	const [isInRanking, setIsInRanking] = useState(true);

	const [isModified, setIsModified] = useState(false);

	useEffect(() => {
        setIsInRanking(inRanking)
        
	}, [inRanking])
	
	const saveOptions = useCallback(async () => {
        console.log('aqui lu');
        let finalStatus = '';
        let token = '';
		setIsLoading(true);
		console.log('aqui lu 2');
        if (cigarNotification || tipNotification || achievementsNotification) {
            if (Constants.isDevice) {
                const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
                finalStatus = existingStatus;

                if (existingStatus !== 'granted') {
                    alert('Olá! Permita que o aplicativo te envie notificações para receber os lembretes!');
                    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Não foi possível obter o token de notificações!');
                    setIsLoading(false);
                    return;
                }
                token = await Notifications.getExpoPushTokenAsync();
            } else {
                alert('Notificações só funcionam em dispositivos físicos!');
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
        if (cigarNotification) {
            Notifications.cancelAllScheduledNotificationsAsync();
            const localNotification = {
                title: "Lembrete",
                body: "Informe a quantidade de cigarros fumados hoje!",
                data: JSON.stringify({ screen: "Cigarros Fumados" }),
                android: { sound: true } // Make a sound on Android
            }

            const schedulingOptions = {
                time: moment(cigarNotificationTime, "HH:mm").isBefore(moment()) ? moment(cigarNotificationTime, "HH:mm").add(1, 'day').toDate() : moment(cigarNotificationTime, "HH:mm").toDate(),
                // (date or number) — A Date object representing when to fire the notification or a number in Unix epoch time. Example: (new Date()).getTime() + 1000 is one second from now.
                repeat: 'day'
            };

            //Notifications.addListener(handleNotification)
            Notifications.scheduleNotificationAsync(localNotification, schedulingOptions);
        } else {
            Notifications.cancelAllScheduledNotificationsAsync();
        }

        await dispatch(optionsActions.updateOptions(cigarNotification, tipNotification, achievementsNotification, cigarNotificationTime, tipNotificationTime, achievementsNotificationTime, token));
        await dispatch(userActions.toggleRanking(isInRanking, userNickname));

		console.log("chega aqui lu");
        setIsLoading(false);
        setIsModified(false);
        Alert.alert('Opções', 'Alterações salvas com sucesso!', [{ text: 'Ok', style: 'destructive' }])
    }, [dispatch, isInRanking, cigarNotification, cigarNotificationTime, tipNotification, tipNotificationTime, achievementsNotification, achievementsNotificationTime]);
    
    // useEffect(()=> {
    //     props.navigation.setParams({ modified: isModified })
    //     props.navigation.setParams({ saveFunc: saveOptions })
    // }, [dispatch, isModified, isInRanking, cigarNotification, cigarNotificationTime, tipNotification, tipNotificationTime, achievementsNotification, achievementsNotificationTime])

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
			<View style={styles.background}>

				{/* HEADER DAS NOTIFICAÇÕES */}
				<OptionsHeader
					title='Notificações'
				>
					<HelpButtonModal title='Notificações'>
						<DefaultText style={styles.helpText}>{'Estas opções controlam o envio de notificações para seu dispositivo.'}</DefaultText>
						
						<DefaultText style={styles.helpText}>
							<DefaultText style={{fontFamily: 'open-sans-bold' }}>{'Lembrete de registro de cigarros'}</DefaultText>
							{': notificação para lembrar de informar o número de cigarros fumados no dia.'}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							<DefaultText style={{fontFamily: 'open-sans-bold' }}>{'Lembrete de dicas'}</DefaultText>
							{': notificação para lembrar a leitura das dicas recebidas automaticamente.'}
						</DefaultText>
                	</HelpButtonModal>
				</OptionsHeader>

				{/* SWITCH -> REGISTRO CIGARROS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{'Lembretes de registro de cigarros'}</DefaultText>
					</View>
				
					<View style={styles.toggleContainer}>
						<Switch
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={cigarNotification ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setCigarNotification(prevState => !prevState)
								setIsModified(true)}
								
							}
							value={cigarNotification}
						/>
					</View>
				</View>

				{/* HORÁRIO -> REGISTRO CIGARROS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{'Horário do lembrete'}</DefaultText>
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
													setIsModified(true)
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
						<DefaultText style={styles.optionText}>{'Lembrete de novas dicas'}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Switch
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={tipNotification ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setTipNotification(prevState => !prevState)
								setIsModified(true)}
							}
							value={tipNotification}
						/>
					</View>
				</View>

				{/* HORÁRIO -> NOVAS DICAS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{'Horário do lembrete'}</DefaultText>
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
													setIsModified(true)
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
						<DefaultText style={styles.optionText}>{'Informações de suas conquistas'}</DefaultText>
					</View>
				
					<View style={styles.toggleContainer}>
						<Switch
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={achievementsNotification ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setAchievementsNotification(prevState => !prevState)
								setIsModified(true)}
								
							}
							value={achievementsNotification}
						/>
					</View>
				</View>

				{/* HORÁRIO -> CONQUISTAS */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{'Horário do lembrete'}</DefaultText>
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
													setIsModified(true)
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
					title='Ranking'
				>
					<HelpButtonModal title='Ranking'>
						<DefaultText style={styles.helpText}>
							{'Você pode optar por não aparecer no ranking de desafios através desta configuração.'}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							{'Se você deseja participar do ranking, visite a tela de Ranking pelo menu lateral.'}
						</DefaultText>
						<DefaultText style={styles.helpText}>
							{'Nosso ranking garante o anonimato e permite que você valide seu progresso em relação a outros usuários do aplicativo.'}
						</DefaultText>
                	</HelpButtonModal>
				</OptionsHeader>

				{/* SWITCH -> RANKING */}
				<View style={styles.line}>
					<View style={styles.textContainer}>
						<DefaultText style={styles.optionText}>{'Participar do ranking'}</DefaultText>
					</View>
					<View style={styles.toggleContainer}>
						<Switch
							disabled={!true}
							trackColor={{ false: "#767577", true: Colors.primaryColor }}
							thumbColor={isInRanking ? Colors.primaryColor : "#f4f3f4"}
							ios_backgroundColor="#3e3e3e"
							onValueChange={() => {
								setIsInRanking(prevState => !prevState)
								setIsModified(true)}
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
						<DefaultText style={styles.buttonText}>{'Salvar'}</DefaultText>
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
        textAlign:'center'
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
		headerTitle: 'Opções',
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