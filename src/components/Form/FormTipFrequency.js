import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';
import Traducao from '../Traducao/Traducao';

const TipButton = props => {
    
    return (
        <TouchableOpacity
            style={styles.pickerData}
            onPress={props.onTouch}
            activeOpacity={0.4}
        >
            <DefaultText>{props.value}</DefaultText>
        </TouchableOpacity>
    )
}

const FormTipFrequency = props => {

    const [isOpen, setIsOpen] = useState(false);
    const [chosenData, setChosenData] = useState();

    
    
    return (
        <View style={styles.pickerContainer}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
            <View style={props.error && props.touched ? styles.error : styles.picker}>
                <TouchableOpacity 
                    style={styles.pickerContent}
                    activeOpacity={0.4}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <DefaultText>{props.value === -1 ? Traducao.t('chooseAFrequency') : `${chosenData}`}</DefaultText>
                    <Ionicons 
                        name={isOpen ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
                        size={24}
                        color={Colors.primaryColor}
                    />
                </TouchableOpacity>
                {isOpen &&
                    <View>
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[0].id)
                                setChosenData(props.tipsFrequencyData[0].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[0].frequency}
                        />
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[1].id)
                                setChosenData(props.tipsFrequencyData[1].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[1].frequency} 
                        />
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[2].id)
                                setChosenData(props.tipsFrequencyData[2].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[2].frequency} 
                        />
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[3].id)
                                setChosenData(props.tipsFrequencyData[3].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[3].frequency} 
                        />
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[4].id)
                                setChosenData(props.tipsFrequencyData[4].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[4].frequency} 
                        />
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[5].id)
                                setChosenData(props.tipsFrequencyData[5].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[5].frequency} 
                        />
                        <TipButton 
                            onTouch={() => {
                                props.onValueChange(props.tipsFrequencyData[6].id)
                                setChosenData(props.tipsFrequencyData[6].frequency)
                                setIsOpen(!isOpen)
                            }} 
                            value={props.tipsFrequencyData[6].frequency} 
                        />
                    </View>
                }
            </View>
            {props.error && props.touched &&
            <View style={styles.errorContainer}>
                <DefaultText style={styles.errorText}>{props.error}</DefaultText>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    pickerContainer:
    {
        width: '80%',
        marginBottom: 20,
    },
    title: 
    {
        alignSelf: 'flex-start',
        marginLeft: 4,
        marginBottom: 2,
        color: 'white',
        fontWeight: 'bold'
    },
    picker:
    {
        justifyContent: 'center',
        minHeight: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        borderColor: 'white',
        elevation: 4,
    },
    pickerContent:
    {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pickerData:
    {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderTopWidth: StyleSheet.hairlineWidth,
    },
    error:
    {
        justifyContent: 'center',
        minHeight: 40,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        borderBottomWidth: 2,
        borderTopWidth: 2,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: Colors.redError,
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
        backgroundColor: Colors.redError,
        elevation: 1
    },
    errorText:
    {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
});

export default FormTipFrequency;