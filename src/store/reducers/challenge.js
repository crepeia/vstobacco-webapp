import { 
    FETCH_USER_CHALLENGES, 
    COMPLETE_CHALLENGE, 
    FETCH_CHALLENGES, 
    LOAD_CHALLENGES, 
    DELETE_CHALLENGE, 
    FETCH_RANKING } 
from "../actions/challenge";

const initialState = {
    availableChallenges: [],
    userChallenges: [],
    points: 0,
    weeklyRank: [],
    monthlyRank: [],
    yearlyRank: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CHALLENGES: {
            return {
                availableChallenges: action.availableChallenges,
                userChallenges: action.userChallenges,
                points: action.points
            }
        }
        case FETCH_CHALLENGES:

            return {
                ...state,
                availableChallenges: action.challenges
            }
        case FETCH_USER_CHALLENGES:

            return {
                ...state,
                userChallenges: action.challenges,
                points: action.points
            }
        case COMPLETE_CHALLENGE:
            const cIndex = state.userChallenges.findIndex(ch => ch.id === action.challenge.id);
            let points = state.points;
            if (cIndex >= 0) {
                const updatedCh = [...state.userChallenges];

                updatedCh[cIndex].dateCompleted = action.dateCompleted;
                points = points - updatedCh[cIndex].score + action.score;
                updatedCh[cIndex].score = action.score;

                console.log("aqui1")
                return { ...state, userChallenges: updatedCh, points: points }
            } else {
                console.log(action.challenge)
                const updatedCh = [...state.userChallenges];
                points += action.challenge.score;
                return { ...state, userChallenges: [...state.userChallenges, action.challenge], points: points}
            }
        case DELETE_CHALLENGE:
            const index = state.userChallenges.findIndex(ch => ch.id === action.challengeId);
            let numPoints = state.points;
            if (index >= 0) {
                const updatedCh = [...state.userChallenges];
                
                numPoints = numPoints - updatedCh[index].score;
                updatedCh.splice(index, 0)
                console.log("aqui1")
                return { ...state, userChallenges: updatedCh, points: numPoints }
            }
        case FETCH_RANKING:
            return {...state, 
                    weeklyRank: action.weeklyResult,
                    monthlyRank: action.monthlyResult,
                    yearlyRank: action.yearlyResult
                }
        default:
            return state;
    }
}