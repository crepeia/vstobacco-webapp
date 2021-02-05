import TipUser from '../../models/TipUser';
import Tip from '../../models/Tip';
import moment from 'moment';
import Localhost from '../../constants/Localhost';

export const READ_TIP = 'READ_TIP';
export const READ_TIP_ROLLBACK = 'READ_TIP_ROLLBACK';

export const LIKE_TIP = 'LIKE_TIP';
export const LIKE_TIP_ROLLBACK = 'LIKE_TIP_ROLLBACK';
export const DISLIKE_TIP = 'DISLIKE_TIP';
export const DISLIKE_TIP_ROLLBACK = 'DISLIKE_TIP_ROLLBACK';
export const SEND_TIP = 'SEND_TIP';

export const FETCH_USER_TIPS = 'FETCH_USER_TIPS';
export const FETCH_TIPS = 'FETCH_TIPS';
export const LOAD_TIPS = 'LOAD_TIPS';

export const loadTips = (availableTips, userTips) => {
	return { type: LOAD_TIPS, availableTips: availableTips, userTips: userTips };
};

export const readTip = (tipId) => {
	return async (dispatch, getState) => {
		const userId = getState().user.currentUser.id;
		const token = getState().user.token;

		dispatch({
			type: READ_TIP,
			tipId: tipId,
			userId: userId,
			meta: {
				offline: {
					// the network action to execute:
					effect: {
						url: `http://${Localhost.address}:${Localhost.port}/wati/webresources/tipuser/read`,
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							id: { tipId, userId },
						}),
					},
					// action to dispatch when effect succeeds:
					// commit: { type: 'UPDATE_RECORD_COMMIT', meta: { log, action } },
					// action to dispatch if network action fails permanently:
					rollback: { type: READ_TIP_ROLLBACK, meta: { tipId, userId } },
				},
			},
		});
	};
};

export const sendTip = (tip) => {
	return async (dispatch, getState) => {
		const userId = getState().user.currentUser.id;
		const token = getState().user.token;
		const date = moment().format('YYYY-MM-DD');
		const { id, title, description } = tip;
		const newTip = new TipUser(id, userId, title, description, false, null, date);

		const response = await fetch(
			`http://${Localhost.address}:${Localhost.port}/wati/webresources/tipuser/createTip`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					id: { tipId: id, userId: userId },
					dateCreated: date,
				}),
			}
		);

		if (!response.ok) {
			throw new Error('Não foi possível enviar a dica');
		}

		dispatch({ type: SEND_TIP, tip: newTip });
	};
};

export const toggleLikeTip = (tipId, oldLiked) => {
	return async (dispatch, getState) => {
		const userId = getState().user.currentUser.id;
		const token = getState().user.token;
		const newLiked = oldLiked !== null && oldLiked ? null : true;

		dispatch({
			type: LIKE_TIP,
			tipId: tipId,
			userId: userId,
			liked: newLiked,
			meta: {
				offline: {
					// the network action to execute:
					effect: {
						url: `http://${Localhost.address}:${Localhost.port}/wati/webresources/tipuser/like`,
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							id: { tipId, userId },
							liked: newLiked,
						}),
					},
					// action to dispatch when effect succeeds:
					// commit: { type: 'UPDATE_RECORD_COMMIT', meta: { log, action } },
					// action to dispatch if network action fails permanently:
					rollback: {
						type: LIKE_TIP_ROLLBACK,
						meta: { tipId, userId, oldLiked },
					},
				},
			},
		});
	};
};

export const toggleDislikeTip = (tipId, oldLiked) => {
	return async (dispatch, getState) => {
		const userId = getState().user.currentUser.id;
		const token = getState().user.token;
		const newLiked = oldLiked !== null && !oldLiked ? null : false;

		dispatch({
			type: DISLIKE_TIP,
			tipId: tipId,
			userId: userId,
			liked: newLiked,
			meta: {
				offline: {
					// the network action to execute:
					effect: {
						url: `http://${Localhost.address}:${Localhost.port}/wati/webresources/tipuser/dislike`,
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							Authorization: `Bearer ${token}`,
						},
						body: JSON.stringify({
							id: { tipId, userId },
							liked: newLiked,
						}),
					},
					// action to dispatch when effect succeeds:
					// commit: { type: 'UPDATE_RECORD_COMMIT', meta: { log, action } },
					// action to dispatch if network action fails permanently:
					rollback: {
						type: DISLIKE_TIP_ROLLBACK,
						meta: { tipId, userId, oldLiked },
					},
				},
			},
		});
	};
};

export const fetchUserTips = () => {
	try {
		return async (dispatch, getState) => {
			const userId = getState().user.currentUser.id;
			const token = getState().user.token;

			const response = await fetch(
				`http://${Localhost.address}:${Localhost.port}/wati/webresources/tipuser/find/${userId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error('Não foi possível carregar dicas');
			}

			const resData = await response.json();
			const loadedTips = [];

			for (const key in resData) {
				loadedTips.push(
					new TipUser(
						resData[key].id.tipId,
						resData[key].id.userId,
						resData[key].tip.title,
						resData[key].tip.description,
						resData[key].readByUser,
						resData[key].liked,
						moment(resData[key].dateCreated).format('YYYY-MM-DD')
					)
				);
			}

			console.log(loadedTips);
			dispatch({ type: FETCH_USER_TIPS, tips: loadedTips });
		};
	} catch (err) {
		throw err;
	}
};

export const fetchTips = () => {
	try {
		return async (dispatch, getState) => {
			const token = getState().user.token;
			const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/tip/all`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});

			if (!response.ok) {
				throw new Error('Algo deu errado.');
			}

			const resData = await response.json();
			const loadedTips = [];

			for (const key in resData) {
				loadedTips.push(new Tip(resData[key].id, resData[key].title, resData[key].description));
			}

			console.log("Aqui lu - tips");
			console.log(loadedTips);
			dispatch({ type: FETCH_TIPS, tips: loadedTips });
		};
	} catch (err) {
		throw err;
	}
};