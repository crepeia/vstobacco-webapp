import { LIKE_TIP, READ_TIP, FETCH_USER_TIPS, DISLIKE_TIP, FETCH_TIPS, LOAD_TIPS, SEND_TIP, LIKE_TIP_ROLLBACK, DISLIKE_TIP_ROLLBACK, READ_TIP_ROLLBACK } from "../actions/tips";

const initialState = {
    availableTips: [],
    userTips: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LIKE_TIP: {
            const tipIndexLike = state.userTips.findIndex(tip => tip.id === action.tipId && tip.userId === action.userId);
            if (tipIndexLike >= 0) {
                const updatedTips = [...state.userTips];
                updatedTips[tipIndexLike].liked = action.liked

                return { ...state, userTips: updatedTips }
            } else {
                return state;
            }
        }
        case LIKE_TIP_ROLLBACK: {
            const tipIndexLike = state.userTips.findIndex(tip => tip.id === action.meta.tipId && tip.userId === action.meta.userId);
            if (tipIndexLike >= 0) {
                const updatedTips = [...state.userTips];
                updatedTips[tipIndexLike].liked = action.meta.oldLiked
                return { ...state, userTips: updatedTips }
            } else {
                return state;
            }
        }

        case DISLIKE_TIP: {
            const tipIndexDislike = state.userTips.findIndex(tip => tip.id === action.tipId && tip.userId === action.userId);
            if (tipIndexDislike >= 0) {
                const updatedTips = [...state.userTips];
                updatedTips[tipIndexDislike].liked = action.liked
                return { ...state, userTips: updatedTips }
            } else {
                return state;
            }
        }
        case DISLIKE_TIP_ROLLBACK: {
            const tipIndexDislike = state.userTips.findIndex(tip => tip.id === action.meta.tipId && tip.userId === action.meta.userId);
            if (tipIndexDislike >= 0) {
                const updatedTips = [...state.userTips];
                updatedTips[tipIndexDislike].liked = action.meta.oldLiked
                return { ...state, userTips: updatedTips }
            } else {
                return state;
            }
        }

        case READ_TIP: {
            const tipIndex = state.userTips.findIndex(tip => tip.id === action.tipId && tip.userId === action.userId);
            if (tipIndex >= 0) {
                const updatedTips = [...state.userTips];
                updatedTips[tipIndex].read = true;
                return { ...state, userTips: updatedTips }

            } else {
                return state;
            }
        }
        case READ_TIP_ROLLBACK:
            const tipIndex = state.userTips.findIndex(tip => tip.id === action.tipId && tip.userId === action.userId);
            if (tipIndex >= 0) {
                const updatedTips = [...state.userTips];
                updatedTips[tipIndex].read = false;
                return { ...state, userTips: updatedTips }

            } else {
                return state;
            }
        case FETCH_USER_TIPS:
            return {
                ...state,
                userTips: action.tips
            }

        case FETCH_TIPS:
            return {
                ...state,
                availableTips: action.tips
            }

        case LOAD_TIPS:
            return {
                availableTips: action.availableTips,
                userTips: action.userTips
            }

        case SEND_TIP:
            const index = state.userTips.findIndex(tip => tip.id === action.tip.id && tip.userId === action.tip.userId);

            if (index >= 0) {
                return state;
            } else {
                const updatedTips = state.userTips.concat([action.tip]);
                return {
                    ...state,
                    userTips: updatedTips
                }
            }

        default:
            return state;
    }
}