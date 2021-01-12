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
            if (action.evaluation.dataParar != null) {


                const ev = new Evaluation(action.evaluation.id, moment(action.evaluation.dataParar).format("YYYY-MM-DD"), action.evaluation.enfrentarFissuraBeberAgua, 
                action.evaluation.enfrentarFissuraComer, action.evaluation.enfrentarFissuraLerRazoes, action.evaluation.enfrentarFissuraRelaxamento, 
                action.evaluation.evitarRecaida1, action.evaluation.evitarRecaida2, action.evaluation.evitarRecaida3);
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