import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useNetInfo } from '@react-native-community/netinfo';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import HeaderButton from '../components/UI/HeaderButton';
import OfflineWarning from '../components/OfflineWarning';

import { useDispatch, useSelector } from "react-redux";
import * as recordActions from '../store/actions/record';
import * as challengeActions from '../store/actions/challenge';
import * as achievementActions from '../store/actions/achievement';
import * as optionsActions from '../store/actions/options';

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import Colors from '../constants/Colors';
import Traducao from '../components/Traducao/Traducao';

Notifications.setNotificationHandler({
    handleNotification: async () => {
      return {
        shouldShowAlert: true
      };
    }
  });

const AddCigarrosScreen = props => {

    const NetInfo = useNetInfo();
    const dispatch = useDispatch();
    const dailyLogs = useSelector(state => state.record.dailyLogs);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [cigarros, setCigarros] = useState(0);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [valueDate, setValueDate] = useState(new Date());
    
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [markedDate, setMarkedDate] = useState(moment().format("dddd"));
    const [isOnline, setIsOnline] = useState(true);

    const loadRecord = useCallback(async () => {
        setError(null);
        if (isOnline) {
            try {

                await dispatch(recordActions.fetchDailyLogs());

            } catch (err) {
                setError(err.message);
            }
        }
    }, [dispatch, isOnline]);

    useEffect(() => {
        setIsLoading(true);
        loadRecord().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadRecord]);

    useEffect(() => {
        const index = dailyLogs.findIndex(log => log.logDate === date);
        if (index >= 0) {
            setCigarros(dailyLogs[index].cigars);
        } else {
            setCigarros(0);
        }
    }, [dispatch, loadRecord, date]);

    useEffect(() => {
        setIsOnline(NetInfo.isConnected.valueOf());
    });

    const saveLogHandler = useCallback(async () => {
        setError(null);

        try {
            setIsLoading(true);
            // await dispatch(recordActions.saveLog(cigarros, date, '', ''));
            await dispatch(recordActions.saveLog(cigarros, date));
            await dispatch(achievementActions.saveAchievement(cigarros, date));
            console.log(dailyLogs);
            await dispatch(challengeActions.completeDailyLogChallenge());
            if(cigarros === 0){
                await dispatch(challengeActions.completeDontSmokeChallenge(date));
            } else {
                await dispatch(challengeActions.checkDontSmokeChallenge(date));
            }
            console.log('correu bem lu');
        } catch (err) {
            setError(err.message);
            console.log('erro');
            console.log(err.message);
        }
        setIsLoading(false);
        props.navigation.navigate("Home");
    }, [dispatch, cigarros, date]);

    const addCigarro = () => {
        if (cigarros < 100) {
            setCigarros(cigarros + 1);
        }
    }

    const removerCigarro = () => {
        if (cigarros > 0) {
            setCigarros(cigarros - 1);
        }
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.background}>
            <OfflineWarning show={!isOnline}/>
            <View style={styles.numeroCigarrosContainer}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.4} style={styles.calendarButtonContainer} onPress={() => setShowDatePicker(true)}>
                        <View style={styles.calendarDataContainer}>
                            <Ionicons name='md-calendar' style={styles.calendarIcon}/>
                            <Text style={styles.calendarData}>{date}</Text>
                        </View>
                        <Text style={styles.calendarChangeText}>{Traducao.t('changeDate')}</Text>
                    </TouchableOpacity>
                    {showDatePicker &&
                    <DateTimePicker
                        value={valueDate}
                        mode='date'
                        minimumDate={new Date().setDate(new Date().getDate() - 1)}
                        maximumDate={new Date()}
                        onChange={(event, dt) => {
                            setShowDatePicker(false)
                            if(event.type === 'set')
                            {
                                setValueDate(dt)
                                setDate(moment(dt).format("YYYY-MM-DD"));
                                setMarkedDate(moment(dt, 'YYYY-MM-DD').format("dddd"))
                            }
                        }}
                    />
                    }
                    <Text style={styles.title}>{markedDate}</Text>

                </View>

                <View style={styles.dataContainer}>
                    {/**BOTÃO - */}
                    <TouchableOpacity activeOpacity={0.4} style={styles.botaoCigarro} onPress={removerCigarro}>
                        <Ionicons name='md-remove' style={{fontSize: 27, color: 'white'}}/>
                    </TouchableOpacity>

                    {/**NÚMERO*/}
                    <View>
                        <View style={{ borderBottomColor: '#ccc', borderBottomWidth: 2, paddingBottom: 10 }}>
                            <Text style={styles.numeroCigarros}>{cigarros}</Text>
                        </View>

                        <Text style={{ fontSize: 15, color: '#ccc', alignSelf: 'center', marginTop: 5 }}>
                            {Traducao.t('smokedCigarettes')}
                        </Text>
                    </View>

                    {/**BOTÃO + */}
                    <TouchableOpacity activeOpacity={0.4} style={styles.botaoCigarro} onPress={addCigarro}>
                        <Ionicons name='md-add' style={{fontSize: 27, color: 'white'}} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.4} onPress={saveLogHandler} style={styles.button}>
                        <Text style={styles.buttonText}>{Traducao.t('save')}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.informeCigarrosContainer}>
                    <Text style={styles.informeCigarrosTxt}>
                        {Traducao.t('amountCigarettesSmoked')}
                    </Text>
                </View>
            </View>
            {isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.primaryColor} />
                </View>
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
    dataContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 20,
        paddingHorizontal: 28
    },
    botaoCigarro: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 35,
        width: 35,
        borderRadius: 7,
        backgroundColor: Colors.primaryColor,
        elevation: 4,
    },
    numeroCigarros: {
        color: Colors.accentColor,
        fontSize: 200,
        fontFamily: 'open-sans-bold',
        alignSelf: 'center',
        maxHeight: 240
    },
    numeroCigarrosContainer: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 50,
    },
    titleContainer: {
        alignItems: 'center',
    },
    title: {
        color: Colors.primaryColor,
        marginTop: 5
    },
    inputButton: {
        color: Colors.secondaryColor,
        fontSize: 27,
    },
    button: {
        width: 300,
        padding: 10,
        marginTop: 40,
        backgroundColor: Colors.primaryColor,
        borderRadius: 7,
        elevation: 2,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    calendarButtonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.primaryColor,
        borderRadius: 7,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    calendarDataContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarIcon: {
        fontSize: 27,
        color: Colors.primaryColor,
        marginRight: 15
    },
    calendarData: {
        color: Colors.primaryColor
    },
    calendarChangeText: {
        fontSize: 10, 
        alignSelf: 'center', 
        color: Colors.primaryColor,
        textDecorationLine: 'underline'
    },
    informeCigarrosContainer: {
        padding: 20,
        marginTop: 20
    },
    informeCigarrosTxt: {
        color: Colors.primaryColor,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.secondaryColor,
        opacity: 0.5
    },
});

export const screenOptions = navData => {
    return {
      headerTitle: 'Cigarros fumados',
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

export default AddCigarrosScreen;