import {actionTypes} from '../../reducers/contact';
import axios from '../../plugins/axios'
import { basicConfig } from '../../static/js/config'
import Message from 'antd/lib/message';
import Toast from 'antd-mobile/lib/toast';

export const storeContact = (contact) => dispatch => {
    return dispatch({
        type: actionTypes.CONTACT,
        contact: contact
    })
};
export const storeCount = (count) => dispatch => {
    return dispatch({
        type: actionTypes.COUNT,
        count: count
    })
};
export const setEmailFormatError = (emailFormatError) => dispatch => {
    return dispatch({
        type: actionTypes.EMAILFORMATERROR,
        emailFormatError
    })
};

export const setErrorName = (errorName) => dispatch => {
    return dispatch({
        type: actionTypes.ERRORNAME,
        errorName
    })
};

export const setErrorEmail = (errorEmail) => dispatch => {
    return dispatch({
        type: actionTypes.ERROREMAIL,
        errorEmail
    })
};

export const setErrorMessage = (errorMessage) => dispatch => {
    return dispatch({
        type: actionTypes.ERRORMESSAGE,
        errorMessage
    })
};

export function getContact(preload) {
    return (dispatch, getState) => {
        let device = getState().home.device
        return axios.post(basicConfig.interfaceUrl + '/buy/add/contactus',
            Object.assign({}, preload,{unLogin: true}) || {}
        )
        .then((res) => {
            if (res.data.success) {
                if (device == 'pc') {
                    Message.success('contact success!');
                }else if (device == 'mobile') {
                    Toast.info('contact success!', 1);
                }
            }
        }).catch((error) => {

        });
    }
}
