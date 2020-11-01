import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/UI/HeaderButton';
import DefaultTitle from '../components/DefaultTitle';
import RankingCard from '../components/UI/RankingCard';
import Colors from '../constants/Colors';

//temporário:
import { currentRank } from '../dummyData/currentRank';


const RankingScreen = props => {

    const [isWeekly, setIsWeekly] = useState(true);
    const [isMonthly, setIsMonthly] = useState(false);
    const [isYearly, setIsYearly] = useState(false);

    return (
            <FlatList
                ListHeaderComponent={
                    <View style={styles.container}>
                        <View style={styles.filterContainer}>
                            <TouchableOpacity 
                                style={styles.filterBox} 
                                activeOpacity={0.6} 
                                onPress={() => {
                                    setIsWeekly(true);
                                    setIsMonthly(false);
                                    setIsYearly(false);
                                    console.log(currentRank);
                                }}
                            >
                                <DefaultTitle style={isWeekly ? styles.filterTitle : styles.filterTitleInactive}>Semanal</DefaultTitle>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.filterBox}
                                activeOpacity={0.6} 
                                onPress={() => {
                                    setIsWeekly(false);
                                    setIsMonthly(true);
                                    setIsYearly(false);
                                }}
                            >
                                <DefaultTitle style={isMonthly ? styles.filterTitle : styles.filterTitleInactive}>Mensal</DefaultTitle>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.filterBox}
                                activeOpacity={0.6} 
                                onPress={() => {
                                    setIsWeekly(false);
                                    setIsMonthly(false);
                                    setIsYearly(true);
                                }}
                            >
                                <DefaultTitle style={isYearly ? styles.filterTitle : styles.filterTitleInactive}>Anual</DefaultTitle>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
                style={styles.listStyle}
                data={currentRank}
                keyExtractor={(item, index) => index+''}
                renderItem={itemData => {
                    return (
                        <View style={{
                          marginHorizontal: Dimensions.get('window').width * 0.05,
                          marginVertical: 4
                        }}>
                            <RankingCard 
                                position={itemData.item.position}
                                nickname={itemData.item.nickname}
                                score={itemData.item.score}
                            />
                        </View>
                    )
                }}
            />
        )
};

export const screenOptions = navData => {
    return {
      headerTitle: 'Ranking',
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
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer: {
        padding: 20,
    },
    learnMoreBox: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 20
    },
    title: {
        color: Colors.primaryColor,
        fontSize: 34,
        textAlign: 'center',
        marginBottom: 20
    },
    text: {
        marginTop: 10,
        fontSize: 18,
    },
    bellowText: {
        fontSize: 18,
        color: Colors.primaryColor, 
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        padding: 10,
        marginBottom: 10,
        backgroundColor: Colors.primaryColor,
        borderRadius: 7,
        elevation: 2,
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    filterBox: {
        width: '33.3333%',
        padding: 8,
        backgroundColor: Colors.primaryColor
    },
    filterTitle: {
        color: 'white',
        fontSize: 18,
        textDecorationLine:"underline"
    },
    filterTitleInactive: {
        color: '#dcdcdc',
        fontSize: 18
    },
    listStyle: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
    },
});

export default RankingScreen;