import { Dispatch } from 'react';
import { USER_TYPES, UI_TYPES, ActionModel } from '../types';
import axios from 'axios';


export const loginUser = (userData: any, history: any) => (dispatch: Dispatch<ActionModel>) => {
    dispatch({type: UI_TYPES.LOADING_UI});
    axios.post('/check_auth', userData).then((response) => {
        const data = response.data;
        setAuthToken(data.token);
        // TODO: add dispatch to retrieve user data
        dispatch({type: UI_TYPES.CLEAR_ERRORS});
        history.push('/');
    }).catch((err) => {
        dispatch({
            type: UI_TYPES.SET_ERRORS,
            payload: err.response.data,
        })
    });
};

const setAuthToken = (token: string) => {
    const bearer = `Bearer ${token}`;
    localStorage.setItem('snippets-auth', bearer);
    axios.defaults.headers.common['Authorization'] = bearer;
};  