import ChallengeUser from "../../models/ChallengeUser";
import Challenge from "../../models/Challenge";

export const FETCH_USER_CHALLENGES = 'FETCH_USER_CHALLENGES';
export const FETCH_CHALLENGES = 'FETCH_CHALLENGES';
export const DELETE_CHALLENGE = 'DELETE_CHALLENGE';
export const LOAD_CHALLENGES = 'LOAD_CHALLENGES';
export const FETCH_RANKING = 'FETCH_RANKING';
export const COMPLETE_CHALLENGE = 'COMPLETE_CHALLENGE';

import moment from 'moment';
import Localhost from '../../constants/Localhost';

export const loadChallenges = (availableChallenges, userChallenges, points) => {

    return { type: LOAD_CHALLENGES, availableChallenges: availableChallenges, userChallenges: userChallenges, points: points };

}

export const fetchChallenges = () => {

    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challenge`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error('Algo deu errado ao carregar os desafios.');
            }

            const resData = await response.json();

            const loadedChallenges = [];
            for (const key in resData) {
                loadedChallenges.push(new Challenge(resData[key].id, resData[key].title,
                    resData[key].description, resData[key].type,
                    resData[key].base_value, resData[key].modifier));
            }

            dispatch({ type: FETCH_CHALLENGES, challenges: loadedChallenges });
        }

    } catch (err) {
        console.log(err)
        throw err;
    };

}

export const fetchUserChallenges = () => {

    try {
        return async (dispatch, getState) => {
            const userId = getState().user.currentUser.id;
            const token = getState().user.token;
            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/find/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Algo deu errado ao carregar os desafios do usuário.');
            }

            let loadedChallenges = []

            const resData = await response.json();

            for (const key in resData) {
                loadedChallenges.push(new ChallengeUser(resData[key].id, resData[key].challenge.id, resData[key].user.id,
                    resData[key].score, resData[key].dateCreated, resData[key].dateCompleted));
            }

            const responseScore = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/points`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Algo deu errado ao carregar os pontos do usuário.');
            }

            const resDataScore = await responseScore.json();
            const sortedChallenges = loadedChallenges.sort((a, b) => moment(a.dateCompleted).isAfter(moment(b.dateCompleted))?
                                        -1 : moment(a.dateCompleted).isSame(moment(b.dateCompleted))? 0 : 1);

            dispatch({ type: FETCH_USER_CHALLENGES, challenges: sortedChallenges, points: resDataScore });
        }

    } catch (err) {
        throw err;
    };

}

export const completeLoginChallenge = () => {
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;
            const challenge =  (getState().challenges.availableChallenges).
                                    find(c => c.id === 1);
            //console.log(challenge)
            const currentDate = moment(new Date()).format("YYYY-MM-DD");

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/completeCreateChallenge`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: {id: userId},
                    challenge: {id: challenge.id},
                    dateCreated: currentDate,
                    dateCompleted: currentDate,
                    score: challenge.baseValue,
                })
            });

            if (!response.ok) {
                if(response.status !== 304) {
                    throw new Error('Algo deu errado ao completar o desafio.');
                }
            } else {
                const resData = await response.json();
                //console.log(resData)

                const newChUser = new ChallengeUser(resData.id, resData.challenge.id, resData.user.id,
                    resData.score, resData.dateCreated, resData.dateCompleted)
                dispatch({ type: COMPLETE_CHALLENGE, challenge: newChUser, challengeUserId: resData.id, score: challenge.baseValue, dateCompleted: resData.dateCompleted });
            }
            
        }

    } catch (err) {
        throw err;
    };
}

export const completePlanChallenge = () => {
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;
            const challenge =  (getState().challenges.availableChallenges).
                                    find(c => c.id === 2);
            //console.log(challenge)
            const currentDate = moment(new Date()).format("YYYY-MM-DD");

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/completeCreateChallenge`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: {id: userId},
                    challenge: {id: challenge.id},
                    dateCreated: currentDate,
                    dateCompleted: currentDate,
                    score: challenge.baseValue,
                })
            });

            if (!response.ok) {
                if(response.status !== 304) {
                    throw new Error('Algo deu errado ao completar o desafio do plano.');
                }
            } else {
                const resData = await response.json();
                //console.log(resData)

                const newChUser = new ChallengeUser(resData.id, resData.challenge.id, resData.user.id,
                    resData.score, resData.dateCreated, resData.dateCompleted)
                dispatch({ type: COMPLETE_CHALLENGE, challenge: newChUser, challengeUserId: resData.id, score: challenge.baseValue, dateCompleted: resData.dateCompleted });
            }
            
        }

    } catch (err) {
        throw err;
    };

}

export const completeTipChallenge = () => {
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;
            const challenge =  (getState().challenges.availableChallenges).
                                    find(c => c.id === 3);
            const userChallenges =  (getState().challenges.userChallenges).
                                    filter(c => c.challengeId === 3).sort((a, b) => moment(a.dateCompleted).isAfter(moment(b.dateCompleted))?
                                                                                -1 : moment(a.dateCompleted).isSame(moment(b.dateCompleted))? 0 : 1);
            // console.log(userChallenges)
            const yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");

            const lastDay = userChallenges.reduce((acc, curr) => {
                let id = moment(curr.dateCompleted).format("YYYY-MM-DD");
                //console.log(id)
                //console.log(acc)

                if (id === acc){
                    return moment(acc).add(-1, 'days').format("YYYY-MM-DD");
                } else {
                    return acc;
                }
            }, yesterday);

            const streak = moment().diff(lastDay, 'days');
            //console.log(streak);
            //console.log(lastDay);
            //console.log(yesterday);

            
            const currentDate = moment(new Date()).format("YYYY-MM-DD");

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/completeCreateChallenge`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: {id: userId},
                    challenge: {id: challenge.id},
                    dateCreated: currentDate,
                    dateCompleted: currentDate,
                    score: challenge.baseValue + (streak * challenge.modifier),
                })
            });

            if (!response.ok) {
                if(response.status !== 304) {
                    throw new Error('Algo deu errado ao completar o desafio de dicas.');
                }
            } else {
                const resData = await response.json();
                console.log(resData)

                const newChUser = new ChallengeUser(resData.id, resData.challenge.id, resData.user.id,
                    resData.score, resData.dateCreated, resData.dateCompleted)
                dispatch({ type: COMPLETE_CHALLENGE, challenge: newChUser, challengeUserId: resData.id, score: challenge.baseValue, dateCompleted: resData.dateCompleted });
            }
            
        }

    } catch (err) {
        throw err;
    };

}

export const completeDailyLogChallenge = () => {
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;
            const challenge =  (getState().challenges.availableChallenges).
                                    find(c => c.id === 4);
            const userChallenges =  (getState().challenges.userChallenges).
                                    filter(c => c.challengeId === 4).sort((a, b) => moment(a.dateCompleted).isAfter(moment(b.dateCompleted))?
                                    -1 : moment(a.dateCompleted).isSame(moment(b.dateCompleted))? 0 : 1);
            // console.log(userChallenges)
            const yesterday = moment().add(-1, 'days').format("YYYY-MM-DD");

            const lastDay = userChallenges.reduce((acc, curr) => {
                let id = moment(curr.dateCompleted).format("YYYY-MM-DD");
                //console.log(id)
                //console.log(acc)

                if (id === acc){
                    return moment(acc).add(-1, 'days').format("YYYY-MM-DD");
                } else {
                    return acc;
                }
            }, yesterday);

            const streak = moment().diff(lastDay, 'days');
            //console.log(streak);
            //console.log(lastDay);
            //console.log(yesterday);

            
            const currentDate = moment(new Date()).format("YYYY-MM-DD");

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/completeCreateChallenge`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: {id: userId},
                    challenge: {id: challenge.id},
                    dateCreated: currentDate,
                    dateCompleted: currentDate,
                    score: challenge.baseValue + (streak * challenge.modifier),
                })
            });

            if (!response.ok) {
                if(response.status !== 304) {
                    throw new Error('Algo deu errado ao completar o desafio de informar cigarros.');
                }
            } else {
                const resData = await response.json();
                console.log(resData)

                const newChUser = new ChallengeUser(resData.id, resData.challenge.id, resData.user.id,
                    resData.score, resData.dateCreated, resData.dateCompleted)
                dispatch({ type: COMPLETE_CHALLENGE, challenge: newChUser, challengeUserId: resData.id, score: challenge.baseValue, dateCompleted: resData.dateCompleted });
            }
            
        }

    } catch (err) {
        throw err;
    };

}

export const completeDontSmokeChallenge = (date) => {
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;
            const challenge =  (getState().challenges.availableChallenges).
                                    find(c => c.id === 5);
            const userChallenges =  (getState().challenges.userChallenges).
                                    filter(c => c.challengeId === 5).sort((a, b) => moment(a.dateCompleted).isAfter(moment(b.dateCompleted))?
                                    -1 : moment(a.dateCompleted).isSame(moment(b.dateCompleted))? 0 : 1);
            // console.log(userChallenges)
            const yesterday = moment(date).add(-1, 'days').format("YYYY-MM-DD");

            const lastDay = userChallenges.reduce((acc, curr) => {
                let id = moment(curr.dateCompleted).format("YYYY-MM-DD");
                //console.log(id)
                //console.log(acc)

                if (id === acc){
                    return moment(acc).add(-1, 'days').format("YYYY-MM-DD");
                } else {
                    return acc;
                }
            }, yesterday);

            const streak = moment(date).diff(lastDay, 'days');
            //console.log(streak);
            //console.log(lastDay);
            //console.log(yesterday);

            
            const currentDate = moment(date).format("YYYY-MM-DD");

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/completeCreateChallenge`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    user: {id: userId},
                    challenge: {id: challenge.id},
                    dateCreated: currentDate,
                    dateCompleted: currentDate,
                    score: challenge.baseValue + (streak * challenge.modifier),
                })
            });

            if (!response.ok) {
                if(response.status !== 304) {
                    throw new Error('Algo deu errado ao completar o desafio de não fumar.');
                }
            } else {
                const resData = await response.json();
                console.log(resData)

                const newChUser = new ChallengeUser(resData.id, resData.challenge.id, resData.user.id,
                    resData.score, resData.dateCreated, resData.dateCompleted)
                dispatch({ type: COMPLETE_CHALLENGE, challenge: newChUser, challengeUserId: resData.id, score: challenge.baseValue, dateCompleted: resData.dateCompleted });
            }
            
        }

    } catch (err) {
        throw err;
    };

}

export const checkDontSmokeChallenge = (date) => {
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;
            const challenge =  (getState().challenges.availableChallenges).
                                    find(c => c.id === 5);
            const userChallenges =  (getState().challenges.userChallenges).
                                    filter(c => c.challengeId === 5).reverse();
            // console.log(userChallenges)

            const challengeValue = userChallenges.find(c => c.dateCompleted === date)
            // console.log(challengeValue)
            if(challengeValue){
                // console.log("aqui2?")
                const currentDate = moment(date).format("YYYY-MM-DD");

                const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/deleteChallenge/${challengeValue.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                console.log(response.body)
                if (!response.ok) {
                    throw new Error('Algo deu errado ao conferir desafio de não fumar.');
                } 
                

                dispatch({ type: DELETE_CHALLENGE, challengeId: challengeValue.id});
            
                
            }
        }

    } catch (err) {
        throw err;
    };

}

export const computePoints = () => {

    try {
        return async (dispatch, getState) => {
            const userId = getState().user.currentUser.id;
            const token = getState().user.token;

            const responseScore = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/points`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Algo deu errado ao computar pontos.');
            }

            const resDataScore = await responseScore.json();

            dispatch({ type: FETCH_USER_CHALLENGES, points: resDataScore });
        }

    } catch (err) {
        throw err;
    };

}

export const fetchRanking = () => {

    try {
        return async (dispatch, getState) => {
            // console.log("aqui")
            const token = getState().user.token;
            const today = moment().format("YYYY-MM-DD").toString();

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/challengeuser/rank/${today}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            // console.log(response.data)

            if (!response.ok) {
                throw new Error('Algo deu errado ao carregar ranking.');
            }

            const resData = await response.json();
            
            console.log(resData)
            const {weeklyResult, monthlyResult, yearlyResult} = resData

            weeklyResult.sort((a, b) => b.score - a.score)
            let position = 1
            let lastScore = weeklyResult[0].score;
            weeklyResult.forEach(wr => {
                if(wr.score != lastScore){
                    position += 1;
                    lastScore = wr.score;
                }
                wr.position = position
            });

            monthlyResult.sort((a, b) => b.score - a.score)
            position = 1
            lastScore = monthlyResult[0].score;
            monthlyResult.forEach(wr => {
                if(wr.score != lastScore){
                    position += 1;
                    lastScore = wr.score;
                }
                wr.position = position
            });

            yearlyResult.sort((a, b) => b.score - a.score)
            position = 1
            lastScore = yearlyResult[0].score;
            yearlyResult.forEach(wr => {
                if(wr.score != lastScore){
                    position += 1;
                    lastScore = wr.score;
                }
                wr.position = position
            });

            dispatch({ type: FETCH_RANKING, weeklyResult, monthlyResult, yearlyResult });
        }

    } catch (err) {
        throw err;
    };

}