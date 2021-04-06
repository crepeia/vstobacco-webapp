import React, { useState, useCallback, useEffect } from 'react';
import {
    StyleSheet,
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Dimensions,
    Button
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import { useSelector, useDispatch } from 'react-redux';
import * as challengeActions from '../store/actions/challenge';

import moment from "moment";

import Colors from '../constants/Colors';
import DefaultTitle from '../components/DefaultTitle';
import DefaultText from '../components/DefaultText';
import HeaderButton from '../components/UI/HeaderButton';
import ChallengeCard from '../components/UI/ChallengeCard';
import { LineChart } from 'react-native-chart-kit';
import Traducao from '../components/Traducao/Traducao';

// dados fictícios
import { availableChallengesArray } from '../dummyData/availableChallenges';
import { userChallengesArray } from '../dummyData/userChallenges';

const fillLabels = (numLabels, format) => {
    const today = moment();
    if (format === "week") {
      let lab = [moment(today).format("dddd").substr(0, 3)];
      for (let i = 1; i < numLabels; i++) {
        lab.unshift(moment(today).subtract(i, "days").format("dddd").substr(0, 3));
      }
      return lab;
    } else if (format === "month") {
      let lab = [moment(today).format("MM-DD")];
      for (let i = 1; i < numLabels; i++) {
        lab.unshift(moment(today).subtract(i, "days").format("MM-DD"));
      }
      return lab;
    } else if (format === "year") {
      let lab = [moment(today).format("MMM/YY")];
      for (let i = 1; i < numLabels; i++) {
        lab.unshift(moment(today).subtract(i, "month").format("MMM/YY"));
      }
      return lab;
    }
};

const fillData = (arr, days, format) => {
  const today = moment();
	let data = [];
	if (format === "week" || format === "month" ) {
        let reducedLog = arr.reduce((acc, curr) => {
            let id = moment(curr.dateCompleted).format("YYYY-MM-DD");     
            if (!acc[id]) {
              acc[id] = { id: id, dateScore: 0 };
            }
            acc[id].dateScore += curr.score;
            return acc;
        }, {});
        //console.log(reducedLog)
        for (let i = 0; i < days; i++) {
                let index = moment(today).subtract(i, "days").format("YYYY-MM-DD");
                if(reducedLog[index]){
                  data.unshift(reducedLog[index].dateScore);
                } else {
                  data.unshift(0);
                } 
		    }
  } else if (format === "year") { 
		  let reducedLog = arr.reduce((acc, curr) => {
        let id = moment(curr.dateCompleted).format("MMM/YY");
        if (!acc[id]) {
          acc[id] = { id: id, dateScore: 0 };
        }
        acc[id].dateScore += curr.score;
        return acc;
		  }, {});
		  for (let i = 0; i < 12; i++) {
        let index = moment(today).subtract(i, "month").format("MMM/YY");
        if(reducedLog[index]){
				  data.unshift(reducedLog[index].dateScore);
			  } else {
				  data.unshift(0);
			  }
		  }   
  }
	return data;
};


const DesafiosScreen = props => {
    const dispatch = useDispatch();

    const availableChallenges = useSelector(state => state.challenges.availableChallenges);
    const userChallenges = useSelector(state => state.challenges.userChallenges);
    const points = useSelector(state => state.challenges.points);
    const evaluation = useSelector((state) => state.evaluation.evaluation);

    const dailyChallenges = availableChallenges.filter(challenge => challenge.type === 'DAILY');
    const onceChallenges = availableChallenges.filter(challenge => challenge.type === 'ONCE');


    const [isDaily, setIsDaily] = useState(true);
    const [isOnce, setIsOnce] = useState(false);
    const [showGraphic, setShowGraphic] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();

	const [labels, setLabels] = useState([]);
	const [data, setData] = useState([]);
    
    useEffect(() => {
        setData(fillData(userChallenges, 7, "week"));
        setLabels(fillLabels(7, "week"));
    }, [userChallenges])

    const loadChallenges = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(challengeActions.fetchUserChallenges());
            if(evaluation){
                await dispatch(challengeActions.completePlanChallenge());
            }
        } catch (err) {
            setError(err.message);
        }
        setIsRefreshing(false);

    }, [dispatch, setIsLoading, setIsRefreshing, setError]);

    useEffect(() => {
        const subscription = props.navigation.addListener('willFocus', loadChallenges);

        return subscription;
    }, []);

    useEffect(() => {
        setIsLoading(true);
        loadChallenges().then(() => {
            setIsLoading(false);
        });

    }, [dispatch, loadChallenges]);

    if (error) {
        return (
            <View style={styles.loading}>
                <DefaultText>{Traducao.t('error')}</DefaultText>
                <DefaultText style={{textAlign: 'center', marginVertical: 5}}>{error}</DefaultText>

                <Button title={Traducao.t('tryAgain')} onPress={loadChallenges} color={Colors.primaryColor} />
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

    if (!isLoading && availableChallenges.length === 0) {
        return (
            <View style={styles.loading}>
                <DefaultText style={{paddingHorizontal: 5}}>{Traducao.t('noChallenge')}</DefaultText>
            </View>
        );
    }
    

    if (showGraphic) {
        return (
            <View style={styles.challengesContainer}>
                <View style={styles.filterContainer}>
                    <TouchableOpacity 
                        style={styles.filterBox} 
                        activeOpacity={0.6} 
                        onPress={() => {
                            setIsDaily(true);
                            setIsOnce(false);
                            setShowGraphic(false);
                        }}
                    >
                        <DefaultTitle style={isDaily ? styles.filterTitle : styles.filterTitleInactive}>{Traducao.t('daily')}</DefaultTitle>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.filterBox}
                        activeOpacity={0.6} 
                        onPress={() => {
                            setIsDaily(false);
                            setIsOnce(true);
                            setShowGraphic(false);
                        }}
                    >
                        <DefaultTitle style={isOnce ? styles.filterTitle : styles.filterTitleInactive}>{Traducao.t('unique')}</DefaultTitle>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.filterBox}
                        activeOpacity={0.6} 
                        onPress={() => {
                            setIsDaily(false);
                            setIsOnce(false);
                            setShowGraphic(true);
                            
                        }}
                    >
                        <DefaultTitle style={showGraphic ? styles.filterTitle : styles.filterTitleInactive}>{Traducao.t('graphics')}</DefaultTitle>
                    </TouchableOpacity>
                </View>
                <View style={styles.titleContainer}>
                    <DefaultTitle style={styles.scoreText}>{Traducao.t('points')} {points}</DefaultTitle>
                    <DefaultTitle style={styles.scoreText}>{Traducao.t('lastWeekPoints')}</DefaultTitle>
                </View>
                {
                    <LineChart
							data={{
								labels: labels,
								datasets: [
									{
										data: data,
									},
								],
							}}
							width={Dimensions.get("window").width * 0.9} // from react-native
							height={270}
							verticalLabelRotation={-90}
							xLabelsOffset={20}
							//segments={data.reduce((a, b) => Math.max(a, b)) - data.reduce((a, b) => Math.min(a, b)) + 1}
							chartConfig={{
								backgroundColor: "#0052cc",
								backgroundGradientFrom: "white",
                                backgroundGradientTo: "white",
                                strokeWidth: 2,
								decimalPlaces: 1, // optional, defaults to 2dp
								color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
							}}
                            fromZero={true}
                            style={{borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 5, marginVertical: 5}}
						/>
                        }
            </View>
        );
    }

    return (
            <FlatList
                ListHeaderComponent={
                    <View style={styles.challengesContainer}>
                        <View style={styles.filterContainer}>
                            <TouchableOpacity 
                                style={styles.filterBox} 
                                activeOpacity={0.6} 
                                onPress={() => {
                                    setIsDaily(true);
                                    setIsOnce(false);
                                    setShowGraphic(false);
                                }}
                            >
                                <DefaultTitle style={isDaily ? styles.filterTitle : styles.filterTitleInactive}>{Traducao.t('daily')}</DefaultTitle>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.filterBox}
                                activeOpacity={0.6} 
                                onPress={() => {
                                    setIsDaily(false);
                                    setIsOnce(true);
                                    setShowGraphic(false);
                                }}
                            >
                                <DefaultTitle style={isOnce ? styles.filterTitle : styles.filterTitleInactive}>{Traducao.t('unique')}</DefaultTitle>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.filterBox}
                                activeOpacity={0.6} 
                                onPress={() => {
                                    setIsDaily(false);
                                    setIsOnce(false);
                                    setShowGraphic(true);
                                    setData(fillData(userChallenges, 7, "week"));
                                    setLabels(fillLabels(7, "week"));
                                }}
                            >
                                <DefaultTitle style={showGraphic ? styles.filterTitle : styles.filterTitleInactive}>{Traducao.t('graphics')}</DefaultTitle>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.titleContainer}>
                            <DefaultTitle style={styles.scoreText}>{Traducao.t('points')} {points}</DefaultTitle>
                        </View>
                    </View>
                }
                onRefresh={loadChallenges}
                refreshing={isRefreshing}
                style={styles.listStyle}
                data={isDaily ? dailyChallenges : onceChallenges}
                keyExtractor={item => item.id.toString()}
                renderItem={itemData => {
                    const usrCh = userChallenges.filter(c => c.challengeId === itemData.item.id);
                    const datesCompleted = usrCh.map(c => c.dateCompleted)
                    return (
                        <View style={styles.listContainer}>
                            <ChallengeCard
                                title={itemData.item.title}
                                text={itemData.item.description}
                                score={itemData.item.baseValue}
                                modifier={itemData.item.modifier}
                                type={itemData.item.type}
                                userChallenges={usrCh}
                                datesCompleted={datesCompleted}
                            />
                        </View>
                    )
                }}
            />
    );
}

export const screenOptions = navData => {
  return {
    headerTitle: Traducao.t('desafiosScreen'),
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
    challengesContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
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
        color: '#ccc',
        fontSize: 18
    },
    titleContainer: {
        marginVertical: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scoreText: {
        fontSize: 22,
        color: Colors.primaryColor
    },
    listStyle: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'white',
    },
    listContainer: {
        flex: 1,
        alignItems: 'center'
    }
})

export default DesafiosScreen;