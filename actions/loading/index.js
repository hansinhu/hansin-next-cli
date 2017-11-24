import {actionTypes} from '../../reducers/loading';

export const setLoading = (loading) => dispatch => {
    return dispatch({
        type: actionTypes.LOADING,
        loading
    })
};
