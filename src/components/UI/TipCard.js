import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DefaultTitle from '../DefaultTitle';
import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';
import Traducao from '../Traducao/Traducao';

const TipCard = props => {
    return ( 
        <View style ={props.isRead ? styles.readCard : styles.card}>
            <TouchableOpacity activeOpacity={0.9} onPress={props.onPressTip}>
                <DefaultTitle style={props.isRead ? styles.readTitle : styles.title}>{props.title}</DefaultTitle>
                <DefaultText numberOfLines={3} style={styles.description}>{props.description}</DefaultText>
                <View style={styles.readMoreContainer}>
                    <DefaultText style={styles.readMore}>{Traducao.t('readMore')}</DefaultText>
                    <MaterialCommunityIcons name="arrow-expand" size={24} color="#aaaaaa" />
                </View>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    readCard: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'white',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 2,
        opacity: 0.5
    },
    card: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'white',
        marginVertical: 5,
        paddingHorizontal: 20,
        paddingTop: 18,
        paddingBottom: 6,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 2,
    },
    title: {
        textAlign: 'left',
        color: Colors.primaryColor,
        textDecorationLine: 'none'
    },
    readTitle: {
        textAlign: 'left',
        color: Colors.primaryColor,
        textDecorationLine: 'line-through'
    },
    description: {
        marginTop: 8,
        marginBottom: 8,
        color: 'black'
    },
    readMoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    readMore: {
        color: '#999',
        marginRight: 5
    }
});

export default TipCard;