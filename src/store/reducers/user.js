import { AUTHENTICATE, TOGGLE_RANKING, LOGOUT, SIGNIN } from '../actions/user';

import User from '../../models/User';

const initialState = {
	token: null,
	currentUser: null,
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
		case LOGOUT:
			return initialState;
		default:
			return state;
	}
};