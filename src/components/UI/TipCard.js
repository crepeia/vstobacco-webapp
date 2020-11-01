import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DefaultTitle from '../DefaultTitle';
import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';

const TipCard = props => {
    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={props.onPressTip}>
            <DefaultTitle style={{ ...styles.title, textDecorationLine: 'none' }}>{props.title}</DefaultTitle>
            <DefaultText numberOfLines={3} style={styles.description}>{props.description}</DefaultText>
            <View style={styles.readMoreContainer}>
                <DefaultText style={styles.readMore}>Ler mais</DefaultText>
                <MaterialCommunityIcons name="arrow-right-bold-outline" size={24} color="#999" />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    card: {
        alignSelf: 'center',
        width: '90%',
        backgroundColor: 'white',
        marginTop: 20,
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