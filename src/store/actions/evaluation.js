import Localhost from '../../constants/Localhost';

export const FETCH_EVALUATION = 'FETCH_EVALUATION'
export const LOAD_EVALUATION = 'LOAD_EVALUATION'

export const loadEvaluation = (evaluation) => {
    return { type: LOAD_EVALUATION, evaluation: evaluation };

}

export const fetchEvaluation = () => {

    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            const userId = getState().user.currentUser.id;

            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/aes/webresources/secured/evaluation/find/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Algo deu errado.');
            }

            const resData = await response.json();
            dispatch({ type: FETCH_EVALUATION, evaluation: resData });
        }

    } catch (err) {
        throw err;
    };

}