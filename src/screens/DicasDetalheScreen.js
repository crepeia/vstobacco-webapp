import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FontAwesome } from '@expo/vector-icons';

import Card from '../components/UI/Card';
import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors';

const DicasDetalheScreen = props => {

    const [likedTip, setLikedTip] = useState(null);

    const title = props.route.params ? props.route.params.title : null;
    const description = props.route.params ? props.route.params.description : null;

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.background}>
                <Card style={styles.textContainer}>
                    <DefaultTitle style={styles.title}>{title}</DefaultTitle>
                    <DefaultText style={styles.descrip}>{description}</DefaultText>
                    <DefaultTitle style={styles.data}>28/10/2020</DefaultTitle>
                </Card>
                <View style={styles.toggleContainer} >
                    <DefaultText style={styles.likeText}>Você gostou dessa dica?</DefaultText>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity onPress={() => setLikedTip(false)}>
                            <FontAwesome name={likedTip === false ? "thumbs-down" : "thumbs-o-down"} size={38} color={'#aaa'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setLikedTip(true)}>
                            <FontAwesome name={likedTip === true ? "thumbs-up" : "thumbs-o-up"} size={38} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
	background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 30
    },
    textContainer: {
        alignItems: 'center',
        padding: 4,
        elevation: 4,
        borderRadius: 20,
    },
    title: {
        color: Colors.primaryColor,
        fontSize: 32,
        marginTop: 10,
        marginBottom: 20,
    },
    descrip: {
        marginHorizontal: 10,
        fontSize: 20,
        color: Colors.primaryColor
    },
    data: {
        alignSelf: 'flex-end',
        marginRight: 16,
        color: Colors.primaryColor,
        fontSize: 15
    },
    toggleContainer: {
        width: Dimensions.get('window').width * 0.8,
        alignItems: 'center',
        marginTop: 30
    },
    likeText: {
        fontSize: 16
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 100,
        marginTop: 10
    }
});

export const screenOptions = navData => {

    const routeParams = navData.route.params ? navData.route.params : {};

    return {
		headerTitle: routeParams.title ? routeParams.title : 'Detalhes',
    }
};

export default DicasDetalheScreen;