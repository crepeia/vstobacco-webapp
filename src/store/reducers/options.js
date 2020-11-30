import Options from '../../models/Options';
import moment from 'moment';

import { FETCH_OPTIONS, UPDATE_OPTIONS, UPDATE_OPTIONS_COMMIT, UPDATE_OPTIONS_ROLLBACK } from '../actions/options';

const initialState = {
    options: {
        id: 6, 
        userId: 22795, 
        allowCigarNotifications: true, 
        allowTipNotifications: true, 
        allowAchievementsNotifications: true, 
        cigarNotificationTime: '19:00-03:00',
        tipNotificationTime: '19:00-03:00',
        achievementsNotificationTime: '19:00-03:00',
        notificationToken: 'VLz1pJD0g-IacYh3geV8Z2'
    },
    needSync: false
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
        default:
            return state;
    }
}