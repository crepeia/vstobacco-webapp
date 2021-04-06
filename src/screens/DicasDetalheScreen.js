import React, { useCallback, useEffect, useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Alert,
    ActivityIndicator, 
    ScrollView, 
    Dimensions 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import Card from '../components/UI/Card';
import DefaultText from '../components/DefaultText';
import DefaultTitle from '../components/DefaultTitle';
import Colors from '../constants/Colors';
import Traducao from '../components/Traducao/Traducao';

import { useSelector, useDispatch } from 'react-redux';
import { toggleDislikeTip, toggleLikeTip, readTip } from '../store/actions/tips';

const DicasDetalheScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();


    const tips = useSelector(state => state.tips.userTips);
    const { tipId } = props.route.params;

    const selectedTip = tips.find(tip => tip.id === tipId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedTip.read) {
            dispatch(readTip(tipId));
        }
    }, [dispatch]);

    const toggleLikedHandler = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(toggleLikeTip(tipId, selectedTip.liked));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, tipId]);

    const toggleDislikedHandler = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(toggleDislikeTip(tipId, selectedTip.liked));
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, tipId]);

    useEffect(() => {
        if (error) {
            Alert.alert(Traducao.t('error'), error, [{ text: 'Ok' }])
        }
    }, [error]);


    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.background}>
                <Card style={styles.textContainer}>
                    <DefaultTitle style={styles.title}>{selectedTip.title}</DefaultTitle>
                    <DefaultText style={styles.descrip}>{selectedTip.description}</DefaultText>
                    <DefaultTitle style={styles.data}>{selectedTip.dateSent}</DefaultTitle>
                </Card>
                <View style={styles.toggleContainer} >
                    <DefaultText style={styles.likeText}>{Traducao.t('likedTip')}</DefaultText>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity onPress={toggleDislikedHandler}>
                            <FontAwesome name={selectedTip.liked != null && !selectedTip.liked ? 'thumbs-down' : 'thumbs-o-down'} size={38} color={'#aaa'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleLikedHandler}>
                            <FontAwesome name={selectedTip.liked != null && selectedTip.liked ? 'thumbs-up' : 'thumbs-o-up'} size={38} color={Colors.primaryColor} />
                        </TouchableOpacity>
                    </View>
                </View>
                {isLoading &&
                <View style={styles.loading}>
                    <ActivityIndicator size='large' color={Colors.primaryColor} />
                </View>}
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
        padding: 10,
        elevation: 4,
        borderRadius: 20
    },
    title: {
        color: Colors.primaryColor,
        fontSize: 32,
        marginVertical: 10
    },
    descrip: {
        marginHorizontal: 10,
        fontSize: 20,
        color: Colors.primaryColor,
        textAlign: 'center'
    },
    data: {
        alignSelf: 'flex-end',
        marginVertical: 10,
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
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const screenOptions = navData => {

    const routeParams = navData.route.params ? navData.route.params : {};

    return {
		headerTitle: routeParams.title ? routeParams.title : Traducao.t('dicasDetalheScreenDetails'),
    }
};

export default DicasDetalheScreen;