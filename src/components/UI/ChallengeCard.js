import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import DefaultTitle from '../DefaultTitle';
import DefaultText from '../DefaultText';
import Colors from '../../constants/Colors';
import Moment from "moment";
import { extendMoment } from 'moment-range';
import { Ionicons } from '@expo/vector-icons';


const ChallengeCard = props => {
    const moment = extendMoment(Moment);
    const range = moment.range(moment().subtract(6,"day"), moment());
    

    const wasCompletedToday = (challenges) => {
        const today = moment().format("YYYY-MM-DD")
        const index = challenges.indexOf(today)
        return (index > -1);
    }

    const wasCompletedInDay = (day) => {
        //console.log(day)
        const index = props.datesCompleted.indexOf(day)
        return (index > -1);
    }

    const days = Array.from(range.by('days')).map(d => {
        return {day: d.format("DD"), complete: wasCompletedInDay(d.format("YYYY-MM-DD"))}
    })


    const isComplete = (props.type === 'ONCE' && props.datesCompleted.length > 0) ||
                        (props.type === 'DAILY' && wasCompletedToday(props.datesCompleted))
    
    
    const yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");

    const lastDay = props.userChallenges.reduce((acc, curr) => {
        let id = moment(curr.dateCompleted).format("YYYY-MM-DD");

        if (id === acc){
            return moment(acc).add(-1, 'days').format("YYYY-MM-DD");
        } else {
            return acc;
        }
    }, yesterday);

    const streak = moment().diff(lastDay, 'days');

    //console.log((streak * props.modifier) + props.score)
    return (
        <View style={isComplete ? styles.readContainer : styles.container}>
            <View>
                <View style={styles.topContainer}>
                    <View style={styles.containerTitle}>
                        <DefaultTitle style={styles.title}>{props.title}</DefaultTitle>
                    </View>
                    <View style={styles.scoreContainer}>
                        {isComplete &&
                            <Ionicons 
                            name="md-checkmark-circle-outline" 
                            size={30}
                            color={Colors.primaryColor}
                            style={{marginRight: 12}}
                            />
                        }
                        <DefaultTitle numberOfLines={1} style={{...styles.score, fontSize: 20}}>{(streak * props.modifier) + props.score}</DefaultTitle>
                    </View>
                </View>
                

                <View style={styles.containerDescription}>
                    <DefaultText style={styles.description}>{props.text}</DefaultText>
                </View>

                {props.type === 'DAILY' &&(
                    <View style={styles.daysContainer}>
                        <DefaultText style={styles.daysTitle}>Progresso nos últimos 7 dias</DefaultText>
                    
                        <View style={styles.days}>
                        {
                            days.map(d => <DefaultText key={d.day} style={d.complete ? styles.day : styles.dayIncomplete}>{d.day}</DefaultText>)
                        }
                        </View>
                        {isComplete &&
                            <DefaultText style={styles.continueTitle}>Continue completando para ganhar mais pontos :)</DefaultText>
                        }
                    </View>
                )}
                {props.type === 'ONCE' &&(
                    <View style={styles.badgeContainer}>
                        <View style={isComplete? styles.badge: styles.badgeIncomplete}>
                            <DefaultText style={isComplete? styles.badgeText: styles.badgeTextIncomplete}>
                                 {isComplete? "Completo!":"Incompleto"}
                            </DefaultText>
                        </View>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    readContainer: {
        width: Dimensions.get('window').width * 0.9,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 5,
        elevation: 2,
        backgroundColor: 'white',
        // opacity: 0.7
    },
    container: {
        width: Dimensions.get('window').width * 0.9,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginVertical: 5,
        elevation: 2,
        backgroundColor: 'white'
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        maxWidth: '80%',
    },
    title: {
        color: Colors.primaryColor,
        fontSize: 20,
        textAlign: 'left'
    },
    containerDescription: {
        marginHorizontal: 10,
        paddingBottom: 15
    },
    description: {
        color: 'black',
        fontSize: 15,
        paddingBottom: 10
    },
    daysContainer:{
        paddingHorizontal: 10,
        paddingBottom: 15
    },
    daysTitle:{
        color: Colors.primaryColor,
        paddingBottom: 10,
        fontFamily: 'open-sans-bold'
    },
    continueTitle: {
        width: '100%',
        color: Colors.primaryColor,
        marginTop: 10,
        fontFamily: 'open-sans-bold'
    },
    days: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    dayIncomplete: {
        borderWidth: 1,
        borderColor: Colors.primaryColor,
        padding: 5,
        borderRadius: 5,
        textAlign:'center'
    },
    day: {
        backgroundColor:  Colors.primaryColor,
        padding: 5,
        borderRadius: 5,
        textAlign:'center',
        color: 'white'
    },
    badgeContainer:{
        paddingHorizontal: 10,
        paddingBottom: 15,
    },
    badge: {
        backgroundColor: Colors.primaryColor,
        padding: 5,
        borderRadius: 5,
    },
    badgeIncomplete: {
        borderColor: Colors.primaryColor,
        backgroundColor: '#E1E1E1',
        padding: 5,
        borderRadius: 5,
    },
    badgeText:{
        textAlign:'center',
        fontFamily: 'open-sans-bold',
        color: 'white'
    },
    badgeTextIncomplete: {
        textAlign:'center',
        color: Colors.primaryColor
    },
    topContainer:{
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    scoreContainer:{
        flexDirection: 'row',
    },
    score:{
        justifyContent: 'center',
        alignItems: 'center',
        color: Colors.primaryColor,
        height: 30

    }
});

export default ChallengeCard;