import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';

const gender = {
    masc: {
        value: 'M',
        placeholder: 'Masculino',
    },
    fem: {
        value: 'F',
        placeholder: 'Feminino'
    },
    none: {
        value: 'N',
        placeholder: 'Não informar'
    }
} 

const GenderButton = props => {
    
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

const FormPicker = props => {

    const [isOpen, setIsOpen] = useState(false);
    const [chosenGender, setChosenGender] = useState();

    return (
        <View style={styles.pickerContainer}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
            <View style={props.error && props.touched ? styles.error : styles.picker}>
                <TouchableOpacity 
                    style={styles.pickerContent}
                    activeOpacity={0.4}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <DefaultText>{props.value === null ? 'Escolha seu sexo' : `${chosenGender}`}</DefaultText>
                    <Ionicons 
                        name={isOpen ? 'md-arrow-dropup' : 'md-arrow-dropdown'}
                        size={24}
                        color={Colors.primaryColor}
                    />
                </TouchableOpacity>
                {isOpen &&
                    <View>
                        <GenderButton 
                            onTouch={() => {
                                props.onValueChange(gender.masc.value)
                                setChosenGender(gender.masc.placeholder)
                                setIsOpen(!isOpen)
                            }} 
                            value={gender.masc.placeholder} 
                        />
                        <GenderButton 
                            onTouch={() => {
                                props.onValueChange(gender.fem.value)
                                setChosenGender(gender.fem.placeholder)
                                setIsOpen(!isOpen)
                            }} 
                            value={gender.fem.placeholder} 
                        />
                        <GenderButton 
                            onTouch={() => {
                                props.onValueChange(gender.none.value)
                                setChosenGender(gender.none.placeholder)
                                setIsOpen(!isOpen)
                            }} 
                            value={gender.none.placeholder} 
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
        borderColor: Colors.errorColor,
        backgroundColor: Colors.errorColor,
        elevation: 1
    },
    errorText:
    {
        fontSize: 12,
        color: 'white',
        textAlign: 'center',
    },
});

export default FormPicker;