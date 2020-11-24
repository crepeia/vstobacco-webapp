export const FETCH_DAILY_ACHIEVEMENTS = "FETCH_DAILY_ACHIEVEMENTS";
export const SAVE_ACHIEVEMENT = "SAVE_ACHIEVEMENT";
export const SAVE_ACHIEVEMENT_ROLLBACK = "SAVE_ACHIEVEMENT_ROLLBACK";

import Achievement from '../../models/Achievement';

export const fetchDailyAchievements = () => {
    return async (dispatch, getState) => {
		const recordId = getState().record.record.id;
		const token = getState().user.token;

		// const responseDailyAchievements = await fetch(
		// 	`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/dailylog/find/${recordId}`,
		// 	{
		// 		method: "GET",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			Accept: "application/json",
		// 			Authorization: `Bearer ${token}`,
		// 		},
		// 	}
		// );
		// if (!responseDailyAchievements.ok) {
		// 	throw new Error('Erro ao carregar conquistas diárias');
		// }
		// const dailyAchievements = await responseDailyAchievements.json();
		// const loadedAchievements = [];

		// if (dailyAchievements != null) {
		// 	for (const key in dailyAchievements) {
		// 		loadedAchievements.push(
		// 			new DailyLog(
		// 				dailyAchievements[key].cigars,
		// 				moment(dailyAchievements[key].logDate).format("YYYY-MM-DD"),
		// 				// dailyAchievements[key].context,
		// 				// dailyAchievements[key].consequences
		// 			)
		// 		);
		// 	}
        // }
        
        // CRIAR CÓDIGO AINDA PARA "loadedCigarsNotSmoken", "loadedLifeTimeSaved" e "loadedMoneySaved"
        // QUANDO FOR UTILIZAR OS ENDPOINTS PARA ACHIEVEMENTS

		dispatch({
			type: FETCH_DAILY_ACHIEVEMENTS,
            loadedAchievements: [],
            loadedCigarsNotSmoken: 0,
            loadedLifeTimeSaved: 0,
            loadedMoneySaved: 0.0
			// loadedAchievements: loadedAchievements
		});
	};
};

export const saveAchievement = (cigars, date) => {
	return async (dispatch, getState) => {

		const recordId = getState().record.record.id;
        const token = getState().user.token;
        const cigarsDaily = getState().record.record.cigarsDaily;
        const packPrice = getState().record.record.packPrice;
        const packAmount = getState().record.record.packAmount;

        const thereIsAchievement = cigarsDaily - cigars;

        let currentCigarsNotSmoken = 0;
        let currentLifeTimeSaved = 0;
        let currentMoneySaved = 0;

        if (thereIsAchievement > 0) {
            currentCigarsNotSmoken = thereIsAchievement;
            currentLifeTimeSaved = currentCigarsNotSmoken * 11;
            currentMoneySaved = currentCigarsNotSmoken * (packPrice / packAmount);
        }
        
		let achievement = getState().achievement.dailyAchievements.find((dl) => dl.logDate === date);
		let oldAchievement = null;
        let action = "";
        
		if (achievement) {
			oldAchievement = new Achievement(achievement.cigarsNotSmoken, achievement.lifeTimeSaved, achievement.moneySaved, achievement.logDate);
            achievement.cigarsNotSmoken = currentCigarsNotSmoken;
            achievement.lifeTimeSaved = currentLifeTimeSaved;
            achievement.moneySaved = currentMoneySaved;
			achievement.logDate = date;
			action = "edit";
		} else {
			achievement = new Achievement(currentCigarsNotSmoken, currentLifeTimeSaved, currentMoneySaved, date);
			oldAchievement = achievement;
			action = "create";
		}
		
		// let newDate = moment.utc(date).format();

		dispatch({
			type: SAVE_ACHIEVEMENT,
			payload: achievement
			// meta: {
			// 	offline: {
			// 		// the network action to execute:
			// 		effect: {
			// 			url: `http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/dailyachievement/editOrCreate`,
			// 			method: "POST",
			// 			headers: {
			// 				"Content-Type": "application/json",
			// 				Accept: "application/json",
			// 				Authorization: `Bearer ${token}`,
			// 			},
			// 			body: JSON.stringify({
			// 				record: { id: recordId },
			// 				logDate: newDate,
			// 				cigars: cigars,
			// 				// context: context,
			// 				// consequences: consequences,
			// 			}),
			// 		},
			// 		// action to dispatch when effect succeeds:
			// 		// commit: { type: SAVE_LOG_COMMIT, meta: { achievement, action } },
			// 		// action to dispatch if network action fails permanently:
			// 		rollback: {
			// 			type: SAVE_ACHIEVEMENT_ROLLBACK,
			// 			meta: { oldAchievement, action },
			// 		},
			// 	},
			// },
		});
	};
};