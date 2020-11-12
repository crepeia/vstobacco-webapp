import AsyncStorage from '@react-native-async-storage/async-storage';

export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_DID_TRY_LOGIN = 'SET_DID_TRY_LOGIN';
export const TOGGLE_RANKING = 'TOGGLE_RANKING';

import Localhost from '../../constants/Localhost';

const encryptPassword = (senha) => {
	var CryptoJS = require('crypto-js');
	var pwhash = CryptoJS.enc.Utf8.parse('ekhilAitcapWarHy');
	var key = CryptoJS.enc.Hex.parse(pwhash.toString(CryptoJS.enc.Hex).substr(0, 32));

	var encrypted = CryptoJS.AES.encrypt(senha, key, {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7,
	});

	var ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

	return ciphertext;
};


export const setDidTryLogin = () => {
	return { type: SET_DID_TRY_LOGIN }
}

export const authenticate = (token, userId, userName, userEmail, birthDate, gender, inRanking, nickname) => {
	return {
		type: AUTHENTICATE,
		userId: userId,
		userName: userName,
		userEmail: userEmail,
		birthDate: birthDate,
		gender: gender,
		// isAdmin: isAdmin,
		token: token,
		inRanking: inRanking,
		nickname: nickname
	};
};

export const signin = (email, password) => {
	return async (dispatch) => {
		const encryptedPass = encryptPassword(password);
		const response = await fetch(
			`http://${Localhost.address}:${Localhost.port}/aes/webresources/authenticate/${email}/${encryptedPass}/`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

		if (!response.ok) {
			throw new Error('Email ou senha incorretos!');
		}
		const token = await response.text();

		const responseUser = await fetch(
			`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/user/login/${token}/`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!responseUser.ok) {
			throw new Error('Não foi possível fazer login. \nErro no servidor!');
		}

		const usr = await responseUser.json();
		console.log(usr);

		/**
		 * General checks to simplify future service calls
		 * Check is user already have chat, record and options tables and create them.
		 */
		

		if (usr.record == null) {
			//CREATE RECORD
			console.log('CREATE RECORD');
			const recordResponse = await fetch(
				`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/record/`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						user: { id: usr.id },
						dailyGoal: 0,
						weeklyGoal: 0
					}),
				}
			);

			if (!recordResponse.ok) {
				throw new Error('Não foi possível criar o registro!');
			}
		}

		dispatch({
			type: SIGNIN,
			userId: usr.id,
			userName: usr.name,
			userEmail: usr.email,
			birthDate: '11/11/2020',
			gender: 'M',
			token: token,
			// isAdmin: usr.admin,
			// isConsultant: usr.consultant,
			// chatId: chatId,
			inRanking: false,
			nickname: ''
		});
		saveDataToStorage(token, usr.id, usr.name, usr.email, '11/11/2020', 'M', false, '');
	
		// dispatch({
		// 	type: SIGNIN,
		// 	userId: usr.id,
		// 	userName: usr.name,
		// 	userEmail: usr.email,
		// 	birthDate: usr.birthDate,
		// 	gender: usr.gender,
		// 	token: token,
		// 	// isAdmin: usr.admin,
		// 	// isConsultant: usr.consultant,
		// 	// chatId: chatId,
		// 	inRanking: usr.inRanking,
		// 	nickname: usr.nickname
		// });
		// saveDataToStorage(token, usr.id, usr.name, usr.email, usr.birthDate, usr.gender, usr.inRanking, usr.nickname);
	};
};

export const signup = (jsonForm) => {
	return async (dispatch) => {

		encryptedPass = encryptPassword(jsonForm.password)
		jsonForm.password = encryptedPass
		//console.log(jsonForm)

		const response = await fetch(
			`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/user/${encryptedPass}/`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify(jsonForm),
				
			}
		);

		if (!response.ok) {
			throw new Error('Não foi possível criar o registro!');
		}

		const usr = await response.json();

		// console.log(usr)
	};
};

export const toggleRanking = (inRanking, nickname) => {
	return async (dispatch, getState) => {
		const token = getState().user.token;
		const userId = getState().user.id;
		//console.log(inRanking)
		//console.log(nickname)
		const response = await fetch(
			`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/user/setInRanking/`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					id: userId,
					inRanking: inRanking,
					nickname: nickname
				})
			}
		);

		

		if (!response.ok) {
			throw new Error("Erro ao participar do ranking.");
		}
		console.log(response.body)
		AsyncStorage.mergeItem(
			'userData',
			JSON.stringify({
				inRanking: inRanking,
				nickname: nickname
			}))

		dispatch({ type: TOGGLE_RANKING, inRanking: true, nickname: 'Alex' });

		// dispatch({ type: TOGGLE_RANKING, inRanking: inRanking, nickname: nickname });
	};
}

export const logout = () => {
	return async (dispatch, getState) => {
		const token = getState().user.token;

		const response = await fetch(
			`http://${Localhost.address}:${Localhost.port}/aes/webresources/authenticate/secured/logout/${token}/`,
			{
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error('Não foi possível fazer logout.');
		}

		AsyncStorage.removeItem('userData');
		dispatch({ type: LOGOUT });
	};
};


const saveDataToStorage = (token, userId, userName, userEmail, birthDate, gender, isAdmin, isConsultant, chatId, inRanking, nickname) => {
	AsyncStorage.setItem(
		'userData',
		JSON.stringify({
			token: token,
			userId: userId,
			userName: userName,
			userEmail: userEmail,
			birthDate: birthDate,
			gender: gender,
			// isAdmin: isAdmin,
			// isConsultant: isConsultant,
			// chatId: chatId,
			inRanking: inRanking,
			nickname: nickname
		})
	);
};
