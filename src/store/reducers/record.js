import {
    FETCH_RECORD,
    UPDATE_RECORD,
    UPDATE_RECORD_ROLLBACK,
    FETCH_DAILY_LOGS,
    SAVE_LOG,
    SAVE_LOG_ROLLBACK,
    LOAD_RECORD,
	LOAD_DAILY_LOGS,
} from '../actions/record';

import Record from '../../models/Record';

const initialState = {
	record: null,
	needSync: false,
	dailyLogs: [],
};

export default (state = initialState, action) => {
    let existingIndex = -1;
	let updatedLogs = [];
    switch (action.type) {
        case LOAD_RECORD:
			return {
				...state,
				record: new Record(action.recordId, action.dailyCigars, action.packPrice, action.packAmount, action.userId, action.filled),
			};
		case LOAD_DAILY_LOGS:
			return {
				...state,
				dailyLogs: action.dailyLogs,
			};
        case FETCH_RECORD:
            return {
                ...state,
                record: new Record(
                    action.recordId,
                    action.cigarsDaily,
                    action.packPrice,
                    action.packAmount,
                    action.userId,
                    action.filled
                )
            };
        case UPDATE_RECORD:
			const newRecord = state.record;
			newRecord.cigarsDaily = action.cigarsDaily;
            newRecord.packPrice = action.packPrice;
            newRecord.packAmount = action.packAmount;
            newRecord.filled = action.filled;

			return { 
                ...state,
                record: newRecord,
                needSync: false 
            };
        case UPDATE_RECORD_ROLLBACK:
            return { 
                ...state,
                needSync: true 
            };
        case FETCH_DAILY_LOGS:
            return {
                ...state,
                dailyLogs: action.loadedLogs,
            };
        case SAVE_LOG:
            existingIndex = state.dailyLogs.findIndex((log) => log.logDate === action.payload.logDate);
            updatedLogs = [];
            if (existingIndex >= 0) {
                updatedLogs = [...state.dailyLogs];
                updatedLogs[existingIndex] = action.payload;
                return { 
                    ...state,
                    dailyLogs: updatedLogs
                };
            } else {
                updatedLogs = state.dailyLogs.concat([action.payload]);
                return { 
                    ...state, 
                    dailyLogs: updatedLogs 
                };
            }
        case SAVE_LOG_ROLLBACK:
            existingIndex = state.dailyLogs.findIndex((log) => log.logDate === action.meta.oldLog.logDate);

            if (action.meta.action === 'edit') {
                updatedLogs = [...state.dailyLogs];
                updatedLogs[existingIndex] = action.meta.oldLog;
                return { 
                    ...state,
                    dailyLogs: updatedLogs
                };
            } else if (action.meta.action === 'create') {
                updatedLogs = [...state.dailyLogs];
                updatedLogs.splice(existingIndex, 1);
                return { 
                    ...state, 
                    dailyLogs: updatedLogs 
                };
            }
            return state;
        default:
            return state;
    }
};