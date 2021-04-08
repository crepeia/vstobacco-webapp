import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Checkbox from '@react-native-community/checkbox'

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';
import Traducao from '../Traducao/Traducao';

const FormCheck = props => {

    const [isTrue, setIsTrue] = useState(false)
    const [isFalse, setIsFalse] = useState(false)

    return (
        <View style={styles.container}>
            <DefaultText style={styles.title}>{props.title}</DefaultText>
            <View style={styles.checkBoxContainer}>

                <View style={styles.checkBox}>
                    <Checkbox
                        tintColors={{ true: 'white', false: 'white' }}
                        value={isTrue}
                        onValueChange={() => {
                            if (isTrue) {
                                setIsTrue(false)
                                setIsFalse(false)
                                props.onChange('')
                            } else {
                                setIsTrue(true)
                                setIsFalse(false)
                                props.onChange(true)
                            }
                        }}
                    />
                    <DefaultText style={styles.text}>{Traducao.t('yes')}</DefaultText>
                </View>

                <View style={{...styles.checkBox, marginLeft: 20}}>
                    <Checkbox
                        tintColors={{ true: 'white', false: 'white' }}
                        value={isFalse}
                        onValueChange={() => {
                            if (isFalse) {
                                setIsFalse(false)
                                setIsTrue(false)
                                props.onChange('')
                            } else {
                                setIsFalse(true)
                                setIsTrue(false)
                                props.onChange(false)
                            }
                        }}
                    />
                    <DefaultText style={styles.text}>{Traducao.t('no')}</DefaultText>
                </View>

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
    text:
    {
        color:'white'
    },
    checkBoxContainer:
    {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    checkBox:
    {
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorContainer:
    {

        marginTop: 5,
        marginHorizontal: 20,
        paddingBottom: 2,
        borderWidth: 1,
        borderRadius: 12,
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

export default FormCheck;