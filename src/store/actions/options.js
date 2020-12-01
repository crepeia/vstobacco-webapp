export const FETCH_OPTIONS = 'FETCH_OPTIONS';
export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';
export const UPDATE_OPTIONS_ROLLBACK = 'UPDATE_OPTIONS_ROLLBACK';
export const UPDATE_OPTIONS_COMMIT = 'UPDATE_OPTIONS_COMMIT';
export const STORE_ID_CIGAR_NOTIFICATION = 'STORE_ID_CIGAR_NOTIFICATION';
export const STORE_ID_ACHIEVEMENTS_NOTIFICATION = 'STORE_ID_ACHIEVEMENTS_NOTIFICATION';
export const STORE_ID_TIP_NOTIFICATION = 'STORE_ID_TIP_NOTIFICATION';


import Options from '../../models/Options';
import Localhost from '../../constants/Localhost';
import moment from 'moment';


export const fetchOptions = () => {
    return async (dispatch, getState) => {
        console.log("Fetch options")
        const userToken = getState().user.token;
        const userId = getState().user.currentUser.id;


        // const response = await fetch(`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/mobileoptions/find/${userId}`, {
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json',
        //         'Authorization': `Bearer ${userToken}`
        //     }
        // });
        // //console.log(response)
        // if (!response.ok) {
        //     throw new Error('Não foi possível obter as suas configurações.');
        // }

        // const resData = await response.json();


        // const userOp = new Options(resData.id, resData.user.id, resData.allowCigarNotifications, resData.allowTipNotifications, resData.allowAchievementsNotifications,
        //     moment(resData.cigarNotificationTime, "HH:mmZZ").format("HH:mm"), moment(resData.tipNotificationTime, "HH:mmZZ").format("HH:mm"), moment(resData.achievementsNotificationTime, "HH:mmZZ").format("HH:mm"),
        //     resData.notificationToken)

        const userOp = new Options (6, 22795, true, true, true, moment('13:00', "HH:mmZZ").format("HH:mm"), moment('13:00', "HH:mmZZ").format("HH:mm"), 
        moment('13:00', "HH:mmZZ").format("HH:mm"), 'VLz1pJD0g-IacYh3geV8Z2');

        // const userOp = getState().options.options;
        console.log(userOp);
        dispatch({ type: FETCH_OPTIONS, options: userOp });
    }

}


export const updateOptions = (allowCigarNotifications, allowTipNotifications, allowAchievementsNotifications, cigarNotificationTime, tipNotificationTime, achievementsNotificationTime, notificationToken) => {
    return async (dispatch, getState) => {
        console.log("Update options")
        const token = getState().user.token;
        const optionsId = getState().options.options.id;
        const userId = getState().user.currentUser.id;


        dispatch({
            type: UPDATE_OPTIONS,
            options: { optionsId, userId, allowCigarNotifications, allowTipNotifications, allowAchievementsNotifications, cigarNotificationTime, tipNotificationTime, achievementsNotificationTime, notificationToken},
            // meta: {
            //     offline: {
            //         effect: {
            //             url: `http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/mobileoptions/edit/${userId}`,
            //             method: 'PUT',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //                 'Accept': 'application/json',
            //                 'Authorization': `Bearer ${token}`
            //             },
            //             body: JSON.stringify({
            //                 id: optionsId,
            //                 allowCigarNotifications: allowCigarNotifications,
            //                 allowTipNotifications: allowTipNotifications,
            //                 allowAchievementsNotifications: allowAchievementsNotifications,
            //                 cigarNotificationTime: moment(CigarNotificationTime, "HH:mm").format("HH:mmZ"),
            //                 tipNotificationTime: moment(tipNotificationTime, "HH:mm").format("HH:mmZ"),
            //                 achievementsNotificationTime: moment(tipNotificationTime, "HH:mm").format("HH:mmZ"),
            //                 notificationToken: notificationToken
            //             })
            //         },
            //         commit: { type: UPDATE_OPTIONS_COMMIT },
            //         rollback: { type: UPDATE_OPTIONS_ROLLBACK }
            //     }
            // }

        });
    }

}

export const storeIdCigarNotification = (idCigarNotification) => {
    return async (dispatch) => {
        dispatch({ type: STORE_ID_CIGAR_NOTIFICATION, idCigarNotification });
    }
}

export const storeIdAchievementsNotification = (idAchievementsNotification) => {
    return async (dispatch) => {
        dispatch({ type: STORE_ID_ACHIEVEMENTS_NOTIFICATION, idAchievementsNotification });
    }
}

export const storeIdTipNotification = (idTipNotification) => {
    return async (dispatch) => {
        dispatch({ type: STORE_ID_TIP_NOTIFICATION, idTipNotification });
    }
}
