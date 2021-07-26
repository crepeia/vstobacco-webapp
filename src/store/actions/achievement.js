export const FETCH_DAILY_ACHIEVEMENTS = "FETCH_DAILY_ACHIEVEMENTS";
export const SAVE_ACHIEVEMENT = "SAVE_ACHIEVEMENT";

import Achievement from '../../models/Achievement';
import Localhost from "../../constants/Localhost";
import moment from 'moment';

export const fetchDailyAchievements = () => {
	return async (dispatch, getState) => {
		const userId = getState().user.currentUser.id;
		const token = getState().user.token;

		const responseDailyAchievements = await fetch(
			`http://${Localhost.localhost}/wati/webresources/achievement/find/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!responseDailyAchievements.ok) {
			throw new Error('Erro ao carregar conquistas diárias');
		}

		const dailyAchievements = await responseDailyAchievements.json();
		const loadedAchievements = [];

		if (dailyAchievements != null) {
			for (const key in dailyAchievements) {
				loadedAchievements.push(
					new Achievement(
						dailyAchievements[key].cigarsNotSmoken,
						dailyAchievements[key].lifeTimeSaved,
						dailyAchievements[key].moneySaved,
						moment(dailyAchievements[key].logDate).format("YYYY-MM-DD"),
					)
				);
			}
		}

		dispatch({
			type: FETCH_DAILY_ACHIEVEMENTS,
			loadedAchievements: loadedAchievements
		});
	};
};

export const saveAchievement = (cigars, date) => {
	return async (dispatch, getState) => {

		const userId = getState().user.currentUser.id;

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

		let newDate = moment.utc(date).format();

		const saveAchievementResponse = await fetch(
			`http://${Localhost.localhost}/wati/webresources/achievement/editOrCreate`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					cigarsNotSmoken: achievement.cigarsNotSmoken,
					lifeTimeSaved: achievement.lifeTimeSaved,
					moneySaved: achievement.moneySaved,
					logDate: newDate,
					user: { id: userId }
				})
			}
		);

		if (!saveAchievementResponse.ok) {
			throw new Error('Erro ao persistir conquistas');
		}

		dispatch({
			type: SAVE_ACHIEVEMENT,
			payload: achievement
		});
	};
};