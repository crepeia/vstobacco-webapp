export const FETCH_RECORD = "FETCH_RECORD";
export const UPDATE_RECORD = "UPDATE_RECORD";
export const UPDATE_RECORD_ROLLBACK = "UPDATE_RECORD_ROLLBACK";

export const FETCH_DAILY_LOGS = "FETCH_DAILY_LOGS";
export const SAVE_LOG = "SAVE_LOG";
export const SAVE_LOG_COMMIT = "SAVE_LOG_COMMIT";
export const SAVE_LOG_ROLLBACK = "SAVE_LOG_ROLLBACK";

export const LOAD_RECORD = "LOAD_RECORD";
export const LOAD_DAILY_LOGS = "LOAD_DAILY_LOGS";

import DailyLog from '../../models/DailyLog';

import moment from "moment";
import Localhost from "../../constants/Localhost";

export const loadRecord = (recordId, dailyCigars, packPrice, packAmount, userId, filled) => {
	return {
		type: LOAD_RECORD,
		recordId: recordId,
		dailyCigars: dailyCigars,
		packPrice: packPrice,
		packAmount: packAmount,
		userId: userId,
		filled: filled
	};
};

export const loadDailyLogs = (dailyLogs) => {
	return { type: LOAD_DAILY_LOGS, dailyLogs: dailyLogs };
};

export const fetchRecord = () => {
	return async (dispatch, getState) => {
		const token = getState().user.token;
		const userId = getState().user.currentUser.id;

		const responseRecord = await fetch(
			`http://${Localhost.address}:${Localhost.port}/wati/webresources/record/find/${userId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!responseRecord.ok) {
			throw new Error('Erro ao carregar registro');
        }
        
        let record = await responseRecord.json();
        
		dispatch({
			type: FETCH_RECORD,
			recordId: record.id,
			cigarsDaily: record.cigarsDaily,
            packPrice: record.packPrice,
            packAmount: record.packAmount,
			userId: userId,
			filled: record.filled,
		});
	};
};

export const updateRecord = (cigarsDaily, packPrice, packAmount) => {
	return async (dispatch, getState) => {
		const recordId = getState().record.record.id;
		console.log("recordId: ");
		console.log(recordId);
		const userId = getState().user.currentUser.id;
		const token = getState().user.token;

		console.log("updating record");
		console.log("infos: ");
		console.log(cigarsDaily);
		console.log(packPrice);
		console.log(packAmount);
		console.log(token);
		console.log("------------------------------");

		dispatch({
            type: UPDATE_RECORD,
            recordId: recordId,
			cigarsDaily: cigarsDaily,
            packPrice: packPrice,
            packAmount: packAmount,
			userId: userId,
			filled: true,
			meta: {
				offline: {
					// the network action to execute:
					effect: {
						url: `http://${Localhost.address}:${Localhost.port}/wati/webresources/record/edit/`,
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							recordId: recordId,
							userId: { id: userId },
							cigarsDaily: cigarsDaily,
							packPrice: packPrice,
							packAmount: packAmount,
							filled: true
						}),
					},
					// action to dispatch when effect succeeds:
					// commit: { type: 'UPDATE_RECORD_COMMIT', meta: { log, action } },
					// action to dispatch if network action fails permanently:
					rollback: { type: UPDATE_RECORD_ROLLBACK },
				},
			},
		});
	};
};

export const fetchDailyLogs = () => {
	return async (dispatch, getState) => {
		const recordId = getState().record.record.id;
		const token = getState().user.token;

		const responseDailyLogs = await fetch(
			`http://${Localhost.address}:${Localhost.port}/wati/webresources/dailylog/find/${recordId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		);
		if (!responseDailyLogs.ok) {
			throw new Error('Erro ao carregar logs diários');
		}
		const dailyLogs = await responseDailyLogs.json();
		const loadedLogs = [];

		if (dailyLogs != null) {
			for (const key in dailyLogs) {
				loadedLogs.push(
					new DailyLog(
						dailyLogs[key].cigars,
						moment(dailyLogs[key].logDate).format("YYYY-MM-DD"),
						// dailyLogs[key].context,
						// dailyLogs[key].consequences
					)
				);
			}
		}

		dispatch({
			type: FETCH_DAILY_LOGS,
			loadedLogs: loadedLogs
		});
	};
};

export const saveLog = (cigars, date) => {
	return async (dispatch, getState) => {
		const recordId = getState().record.record.id;
		const token = getState().user.token;
		let log = getState().record.dailyLogs.find((dl) => dl.logDate === date);
		let oldLog = null;
		let action = "";
		if (log) {
			oldLog = new DailyLog(log.cigars, log.logDate);
			log.cigars = cigars;
			log.logDate = date;
			// log.context = context;
			// log.consequences = consequences;
			action = "edit";
		} else {
			log = new DailyLog(cigars, date);
			oldLog = log;
			action = "create";
		}
		
		let newDate = moment.utc(date).format();

		dispatch({
			type: SAVE_LOG,
			payload: log,
			meta: {
				offline: {
					// the network action to execute:
					effect: {
						url: `http://${Localhost.address}:${Localhost.port}/wati/webresources/dailylog/editOrCreate`,
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Accept: "application/json",
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							record: { id: recordId },
							logDate: newDate,
							cigars: cigars,
							// context: context,
							// consequences: consequences,
						}),
					},
					// action to dispatch when effect succeeds:
					// commit: { type: SAVE_LOG_COMMIT, meta: { log, action } },
					// action to dispatch if network action fails permanently:
					rollback: {
						type: SAVE_LOG_ROLLBACK,
						meta: { oldLog, action },
					},
				},
			},
		});
	};
};