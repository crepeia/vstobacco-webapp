import { AUTHENTICATE, TOGGLE_RANKING, LOGOUT, SIGNIN, SET_DID_TRY_LOGIN, RESET_PASSWORD } from '../actions/user';

import User from '../../models/User';

const initialState = {
	token: null,
	currentUser: null,
	didTryAutoLogin: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGNIN:
			return {
				...state,
				token: action.token,
				currentUser: new User(
					action.userId,
					action.userName,
					action.userEmail,
					action.birthDate,
					action.gender,
					action.inRanking,
					action.nickname
				),
			};
		case AUTHENTICATE:
			return {
				...state,
				token: action.token,
				currentUser: new User(
					action.userId,
					action.userName,
					action.userEmail,
					action.birthDate,
					action.gender,
					action.inRanking,
					action.nickname
				),
				didTryAutoLogin: true
			};
		case TOGGLE_RANKING:
			const newUser = new User(
				state.currentUser.id,
				state.currentUser.name,
				state.currentUser.email,
				state.currentUser.birthDate,
				state.currentUser.gender,
				action.inRanking, 
				action.nickname
			)
			return {
				...state,
				currentUser: newUser,
			};
		case SET_DID_TRY_LOGIN:
			return {
				...state,
				didTryAutoLogin: true
			};
		case LOGOUT:
			return {
                ...initialState,
                didTryAutoLogin: true
            };
		case RESET_PASSWORD:
			return state;
		default:
			return state;
	}
};