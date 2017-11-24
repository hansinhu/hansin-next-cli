export const actionTypes = {
	COMPANYDATA: 'COMPANYDATA',
	SHOWEMPTY: 'SHOWEMPTY',
	FETCHCOMPANY: 'FETCHCOMPANY'
};

export const company = (state = {
	companyData:'',
	showEmpty: false,
    fetchCompany: true
}, action) => {
	switch(action.type) {
        case actionTypes.FETCHCOMPANY:
            return Object.assign({}, state, {
                fetchCompany: action.fetchCompany
            });
		case actionTypes.COMPANYDATA:
			return Object.assign({}, state, {
                companyData: action.companyData
			});
        case actionTypes.SHOWEMPTY:
            return Object.assign({}, state, {
                showEmpty: action.showEmpty
            });
		default:
			return state
	}
};