import React, { useCallback, useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Dimensions, ActivityIndicator, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import NetInfo from '@react-native-community/netinfo';
import { useSelector, useDispatch } from 'react-redux';

import * as tipActions from '../store/actions/tips';
import * as challengeActions from "../store/actions/challenge";

import HeaderButton from '../components/UI/HeaderButton';
import TipCard from '../components/UI/TipCard';
import Colors from '../constants/Colors';
import DefaultText from '../components/DefaultText';
import OfflineWarning from '../components/OfflineWarning';
import Traducao from '../components/Traducao/Traducao';

import Tips from "../constants/Tips";

// const dicas = [
// 	{
// 		id: 1,
// 		title: 'Dica 1',
// 		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel ipsum eros. Fusce accumsan a purus quis fermentum. Vivamus porta lectus eu purus tempus malesuada a eu dolor. Mauris iaculis vitae magna sed convallis.'
// 	},
// 	{
// 		id: 2,
// 		title: 'Dica 2',
// 		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel ipsum eros. Fusce accumsan a purus quis fermentum. Vivamus porta lectus eu purus tempus malesuada a eu dolor. Mauris iaculis vitae magna sed convallis.'
// 	}
// ]

const DicasScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const [isOnline, setIsOnline] = useState(true);

    const availableTips = useSelector(state => state.tips.availableTips);
    const tips = useSelector(state => state.tips.userTips);

    const dispatch = useDispatch();

    const loadTips = useCallback(async () => {
        if (isOnline) {
            setError(null);
            setIsRefreshing(true);
            try {
                await dispatch(tipActions.fetchUserTips());
            } catch (err) {
                setError(err.message);
            }
            setIsRefreshing(false);
        }

    }, [dispatch, isOnline, setIsLoading, setIsRefreshing, setError]);

    useEffect(() => {
        const subscription = props.navigation.addListener('willFocus', loadTips);
        return subscription;
    }, [loadTips]);

    useEffect(() => {
        setIsLoading(true);
        loadTips().then(() => {
            setIsLoading(false);
        });

    }, [dispatch, loadTips]);

    const handleConnectivityChange = (isConnected) => {
        setIsOnline(isConnected);
    };

    useEffect(() => {
        //Função para testar se o usuario esta conectado a internet
        NetInfo.fetch().then(state => {
            setIsOnline(state.isConnected);
        });
    });

    if (error) {
        return (
            <View style={styles.loading}>
                <DefaultText>{Traducao.t('error')}</DefaultText>
                <Button title={Traducao.t('tryAgain')} onPress={loadTips} color={Colors.primaryColor} />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size='large' color={Colors.primaryColor} />
            </View>
        );
    }

    if (!isLoading && tips && tips.length === 0) {
        return (
            <View style={styles.loading}>
                <DefaultText style={{ paddingHorizontal: 5 }}>{Traducao.t('noTips')}</DefaultText>
            </View>
        );
    }

    return (
        <View style={styles.background}>
            <OfflineWarning show={!isOnline} />
            <FlatList
                onRefresh={loadTips}
                refreshing={isRefreshing}
                data={tips}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ flexGrow: 1, width: Dimensions.get('window').width }}
                extraData={tips}
                renderItem={itemData => {
                    const tip = Tips.find(t => t.id === itemData.item.id);
                    return (
                        <TipCard
                            title={tip.title}
                            description={tip.description}
                            isRead={itemData.item.read}
                            onPressTip={() => {
                                dispatch(challengeActions.completeTipChallenge());
                                props.navigation.navigate('DicasDetalhe', {
                                    tipId: itemData.item.id,
                                    tipTitle: itemData.item.title,
                                    isLiked: itemData.item.liked
                                })
                            }}
                        />
                    )
                }}
            />
        </View>
    );
};

export const screenOptions = navData => {
    return {
        headerTitle: Traducao.t('dicasScreen'),
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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 5
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default DicasScreen;