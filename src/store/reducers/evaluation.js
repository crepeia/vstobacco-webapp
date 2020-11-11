import { FETCH_EVALUATION, LOAD_EVALUATION } from "../actions/evaluation";

import Evaluation from '../../models/Evaluation';

import moment from 'moment';
const initialState = {
    evaluation: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVALUATION:
            return {
                evaluation: action.evaluation
            }

        case FETCH_EVALUATION:
            if (action.evaluation.dataParada != null) {


                const ev = new Evaluation(action.evaluation.id, moment(action.evaluation.dataParada).format("YYYY-MM-DD"), action.evaluation.tecnicasFissura, 
                action.evaluation.estrategiasParaResistir);
                /*
                                AsyncStorage.setItem('evaluationData', JSON.stringify({
                                    evaluation: ev
                                }));
                */
                return {
                    evaluation: ev
                }
            } else {
                return state;
            }

        default:
            return state;
    }
}