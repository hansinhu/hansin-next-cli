export const actionTypes = {
    LOADING: 'LOADING'
};

export const loading = (state = {
    loading: false
}, action) => {
    switch (action.type) {
        case actionTypes.LOADING:
            return Object.assign({}, state, {
                loading: action.loading,
            });
        default:
            return state
    }
};