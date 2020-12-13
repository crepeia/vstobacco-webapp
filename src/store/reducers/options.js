import Options from '../../models/Options';
import moment from 'moment';

import { FETCH_OPTIONS, UPDATE_OPTIONS, UPDATE_OPTIONS_COMMIT, UPDATE_OPTIONS_ROLLBACK, STORE_ID_CIGAR_NOTIFICATION, STORE_ID_ACHIEVEMENTS_NOTIFICATION, STORE_ID_TIP_NOTIFICATION } from '../actions/options';

const initialState = {
    options: {
        id: 0, 
        userId: 0, 
        allowCigarNotifications: true, 
        allowTipNotifications: true, 
        allowAchievementsNotifications: true, 
        cigarNotificationTime: '19:00', 
        tipNotificationTime: '19:00', 
        achievementsNotificationTime: '19:00', 
        notificationToken: 'Vshaudhkdhalods'
    },
    needSync: false,
    idCigarNotification: '',
    idAchievementsNotification: '',
    idTipNotification: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_OPTIONS:
            return { ...state, options: action.options, needSync: false }

        case UPDATE_OPTIONS: 
            const newOptions = new Options(action.options.optionsId, action.options.userId, action.options.allowCigarNotifications, action.options.allowTipNotifications, action.options.allowAchievementsNotifications, action.options.cigarNotificationTime, action.options.tipNotificationTime, action.options.achievementsNotificationTime, action.options.notificationToken)
            return { ...state, options: newOptions }
        case UPDATE_OPTIONS_COMMIT:
            return { ...state, needSync: false }
        case UPDATE_OPTIONS_ROLLBACK:
            return { ...state, needSync: true }
        case STORE_ID_CIGAR_NOTIFICATION:
            return { ...state, idCigarNotification: action.idCigarNotification}
        case STORE_ID_ACHIEVEMENTS_NOTIFICATION:
            return { ...state, idAchievementsNotification: action.idAchievementsNotification}
        case STORE_ID_TIP_NOTIFICATION:
            return { ...state, idTipNotification: action.idTipNotification}
        default:
            return state;
    }
}