import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';

import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

import Colors from '../constants/Colors';

const AddCigarrosScreen = props => {
    const [cigarros, setCigarros] = useState(0);

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [valueDate, setValueDate] = useState(new Date());
    
    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
    const [markedDate, setMarkedDate] = useState(moment().format("dddd"));

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
        <View style={styles.background}>
            <View style={styles.numeroCigarrosContainer}>
                <View style={styles.titleContainer}>
                    <TouchableOpacity activeOpacity={0.4} style={styles.calendarButtonContainer} onPress={() => setShowDatePicker(true)}>
                        <View style={styles.calendarDataContainer}>
                            <Ionicons name='md-calendar' style={styles.calendarIcon}/>
                            <Text style={styles.calendarData}>{date}</Text>
                        </View>
                        <Text style={styles.calendarChangeText}>alterar data</Text>
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
                            Cigarros fumados
                        </Text>
                    </View>

                    {/**BOTÃO + */}
                    <TouchableOpacity activeOpacity={0.4} style={styles.botaoCigarro} onPress={addCigarro}>
                        <Ionicons name='md-add' style={{fontSize: 27, color: 'white'}} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.4} onPress={() => {}} style={styles.button}>
                        <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.informeCigarrosContainer}>
                    <Text style={styles.informeCigarrosTxt}>
                        Informe a quantidade de cigarros fumados acima.
                    </Text>
                </View>
            </View>
        </View>
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
    numeroCigarros:
    {
        color: Colors.accentColor,
        fontSize: 200,
        fontFamily: 'open-sans-bold',
        alignSelf: 'center',
        maxHeight: 240
    },
    numeroCigarrosContainer:
    {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 75
    },
    titleContainer:
    {
        alignItems: 'center',
    },
    title:
    {
        color: Colors.primaryColor,
        marginTop: 5
    },
    inputButton:
    {
        color: Colors.secondaryColor,
        fontSize: 27,
    },
    button:
    {
        width: 300,
        padding: 10,
        marginTop: 40,
        backgroundColor: Colors.primaryColor,
        borderRadius: 7,
        elevation: 2,
    },
    buttonText:
    {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    calendarButtonContainer:
    {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.primaryColor,
        borderRadius: 7,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    calendarDataContainer:
    {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarIcon:
    {
        fontSize: 27,
        color: Colors.primaryColor,
        marginRight: 15
    },
    calendarData:
    {
        color: Colors.primaryColor
    },
    calendarChangeText:
    {
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
    }
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