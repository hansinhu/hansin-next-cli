import {actionTypes} from '../../reducers/company';
import axios from '../../plugins/axios'
import { basicConfig } from '../../static/js/config'


export const setCompany = (companyData) => dispatch => {
    return dispatch({
        type: actionTypes.COMPANYDATA,
        companyData
    })
};

export const setShowEmpty = (showEmpty) => dispatch => {
    return dispatch({
        type: actionTypes.SHOWEMPTY,
        showEmpty
    })
};

export const setFetchCompany = (fetchCompany) => dispatch => {
    return dispatch({
        type: actionTypes.FETCHCOMPANY,
        fetchCompany
    })
};

export function getCompany(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/companyinfo.do' ,{
                params: Object.assign({}, preload,{unLogin: true,unLoading: true}) || {}
            })
            .then((res) => {
                if (res.data.success && res.data.data) {
                    dispatch(setCompany(res.data.data));
                    dispatch(setShowEmpty(false));
                    dispatch(setFetchCompany(false));
                }else {
                    dispatch(setShowEmpty(true));
                }
            }).catch((error) => {
                dispatch(setShowEmpty(true));
            });
    }
}
