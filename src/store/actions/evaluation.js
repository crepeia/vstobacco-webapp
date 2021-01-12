import Localhost from '../../constants/Localhost';

export const FETCH_EVALUATION = 'FETCH_EVALUATION'
export const LOAD_EVALUATION = 'LOAD_EVALUATION'

export const loadEvaluation = (evaluation) => {
    return { type: LOAD_EVALUATION, evaluation: evaluation };

}

export const fetchEvaluation = () => {
    console.log("vem aqui lu");
    try {
        return async (dispatch, getState) => {
            const token = getState().user.token;
            console.log(token);
            const userId = getState().user.currentUser.id;
            console.log(userId);
            const response = await fetch(`http://${Localhost.address}:${Localhost.port}/wati/webresources/prontoparaparar/find/${userId}`, {
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

            console.log("aaaaaaaaaaaaaa");
            console.log(resData);
            console.log("aaaaaaaaaaaaaa");
            
            dispatch({ type: FETCH_EVALUATION, evaluation: resData });
        }

    } catch (err) {
        throw err;
    };

}