import {
    FETCH_DAILY_ACHIEVEMENTS,
    SAVE_ACHIEVEMENT,
} from '../actions/achievement';

const sumAchievements = (achievements) => {
    let objAchievements = {
        objCigarsNotSmoken: 0,
        objLifeTimeSaved: 0,
        objMoneySaved: 0
    };

    for (const key in achievements) {
        objAchievements.objCigarsNotSmoken += achievements[key].cigarsNotSmoken;
        objAchievements.objLifeTimeSaved += achievements[key].lifeTimeSaved;
        objAchievements.objMoneySaved += achievements[key].moneySaved;
    };

    return objAchievements;
};

const initialState = {
    dailyAchievements: [],
    cigarsNotSmoken: 0,
    lifeTimeSaved: 0,
    moneySaved: 0
};

export default (state = initialState, action) => {
    let existingIndex = -1;
	let updatedAchievements = [];
    switch (action.type) {
        case FETCH_DAILY_ACHIEVEMENTS:
            let updatedData = sumAchievements(action.loadedAchievements);
            return {
                dailyAchievements: action.loadedAchievements,
                cigarsNotSmoken: updatedData.objCigarsNotSmoken,
                lifeTimeSaved: updatedData.objLifeTimeSaved,
                moneySaved: updatedData.objMoneySaved
            };
        case SAVE_ACHIEVEMENT:
            existingIndex = state.dailyAchievements.findIndex((log) => log.logDate === action.payload.logDate);
            updatedAchievements = [];
            updatedCigarsNotSmoken = 0;
            updatedLifeTimeSaved = 0;
            updatedMoneySaved = 0.0;

            if (existingIndex >= 0) {
                updatedAchievements = [...state.dailyAchievements];
                updatedAchievements[existingIndex] = action.payload;
                let updatedVariables = sumAchievements(updatedAchievements);
                return { 
                    dailyAchievements: updatedAchievements,
                    cigarsNotSmoken: updatedVariables.objCigarsNotSmoken,
                    lifeTimeSaved: updatedVariables.objLifeTimeSaved,
                    moneySaved: updatedVariables.objMoneySaved
                };
            } else {
                updatedAchievements = state.dailyAchievements.concat([action.payload]);
                let updatedVariables = sumAchievements(updatedAchievements);
                return { 
                    dailyAchievements: updatedAchievements,
                    cigarsNotSmoken: updatedVariables.objCigarsNotSmoken,
                    lifeTimeSaved: updatedVariables.objLifeTimeSaved,
                    moneySaved: updatedVariables.objMoneySaved
                };
            }
        default:
            return state;
    }
};