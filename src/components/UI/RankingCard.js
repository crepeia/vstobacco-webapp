import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';

const RankingCard = props => {

    let styleText = styles.text;
    let iconColor;
    let colorBackground;

    if (props.position === 1) {
        styleText = styles.textGold;
        iconColor = '#FFC738';
        colorBackground = '#FCF0DF';
    } else {
        if (props.position === 2) {
            styleText = styles.textSilver;
            iconColor = '#AAAAAA';
            colorBackground = '#F7F7F7';
        } else {
            if (props.position === 3) {
                styleText = styles.textBronze;
                iconColor = '#751616';
                colorBackground = '#DAC0C0';
            } else {
                iconColor = Colors.primaryColor;
                colorBackground = '#AEC4E0';
            }
        }
    }
    
    return (
        <View style={{...styles.container, backgroundColor: colorBackground}}>
            <View style={styles.positionContainer}>
                {props.position <= 3 ? 
                    <Ionicons 
                        style={{marginRight: 10}}
                        name='md-trophy'
                        size={27}
                        color={iconColor}
                    />
                    :
                    <Ionicons 
                        style={{marginRight: 10}}
                        name='md-person'
                        size={27}
                        color={iconColor}
                    />
                }
                <DefaultText style={styleText}># {props.position}</DefaultText> 
                <DefaultText style={{...styleText, marginLeft: 20}}>{props.nickname}</DefaultText>
            </View>
            <DefaultText style={styleText}>{props.score}</DefaultText>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 2,
        paddingVertical: 14,
        paddingHorizontal: 25,
        width: Dimensions.get('window').width * 0.8,
        shadowColor: 'gray',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 4,
        borderRadius: 10,
        // borderColor: '#ccc',
        // borderWidth: 1
    },
    positionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.primaryColor,
        fontSize: 20,
        fontFamily: 'open-sans-bold',
    },
    textGold: {
        color: '#FFC738',
        fontSize: 20,
        fontFamily: 'open-sans-bold',
    },
    textSilver: {
        color: '#AAAAAA',
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
    textBronze: {
        color: '#751616',
        fontSize: 20,
        fontFamily: 'open-sans-bold'
    },
});

export default RankingCard;