import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors'

const FormDate = props => {

    const minDate = moment().add(-100, 'years')
    const maxDate = moment().subtract(18, 'years')

    const [showDatePicker, setShowDatePicker] = useState(false)
    const [valueDate, setValueDate] = useState(new Date(maxDate))

    return (
        <View style={styles.container}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
            <TouchableOpacity
                {...props}
                activeOpacity={0.4}
                onPress={() => {
                    setShowDatePicker(true)
                }}
                style={props.error && props.touched ? styles.error : styles.dateInput}
            >
                <DefaultText>{props.value === '' ? "--/--/----" : props.value}</DefaultText>
            </TouchableOpacity>
            {showDatePicker &&
                <DateTimePicker
                    value={valueDate}
                    mode='date'
                    minimumDate={new Date(minDate)}
                    maximumDate={new Date(maxDate)}
                    onChange={(event, dt) => {
                        setShowDatePicker(false)
                        if(event.type === 'set')
                        {
                            setValueDate(dt)
                            props.onChangeDate(moment(dt).format("DD-MM-YYYY"))
                            props.onValueChange(moment(dt).format("YYYY-MM-DD"))
                        }
                    }}
                />
            }
            {props.error && props.touched &&
            <View style={styles.errorContainer}>
                <DefaultText style={styles.errorText}>{props.error}</DefaultText>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container:
    {
        width: '80%',
        marginBottom: 25
    },
    title: 
    {
        alignSelf: 'flex-start',
        marginLeft: 4,
        marginBottom: 2,
        color: 'white',
        fontWeight: 'bold'
    },
    dateInput:
    {
        justifyContent: 'center',
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 2,
    },
    error:
    {
        justifyContent: 'center',
        height: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: Colors.errorColor,
        borderRadius: 5,
    },
    errorContainer:
    {
        marginHorizontal: 20,
        paddingBottom: 2,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomStartRadius: 12,
        borderBottomEndRadius: 12,
        backgroundColor: Colors.errorColor,
        borderColor: Colors.errorColor,
        elevation: 1
    },
    errorText:
    {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
});

export default FormDate;