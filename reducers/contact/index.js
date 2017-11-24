export const actionTypes = {
    CONTACT: 'CONTACT',
    COUNT: 'COUNT',
    EMAILFORMATERROR: 'EMAILFORMATERROR',
    ERRORNAME: 'ERRORNAME',
    ERROREMAIL: 'ERROREMAIL',
    ERRORMESSAGE: 'ERRORMESSAGE'
};

export const contact = (state = {
    contact: null,
    count: 0,
    emailFormatError:false,
    errorName:false,
    errorEmail:false,
    errorMessage: false
}, action) => {
    switch (action.type) {
        case actionTypes.COUNT:
            return Object.assign({}, state, {
                count: action.count
            });
        case actionTypes.CONTACT:
            return Object.assign({}, state, {
                contact: action.contact
            });
        case actionTypes.EMAILFORMATERROR:
            return Object.assign({}, state, {
                emailFormatError: action.emailFormatError
            });
        case actionTypes.ERRORNAME:
            return Object.assign({}, state, {
                errorName: action.errorName
            });
        case actionTypes.ERROREMAIL:
            return Object.assign({}, state, {
                errorEmail: action.errorEmail
            });
        case actionTypes.ERRORMESSAGE:
            return Object.assign({}, state, {
                errorMessage: action.errorMessage
            });
        default:
            return state
    }
};