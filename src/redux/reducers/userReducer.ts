import { USER_TYPES, ActionModel } from '../types';

const initState = {
    authed: false,
    loading: false,
    creds: {},
};

export default function(state = initState, action: ActionModel) {
    switch (action.type) {
        case USER_TYPES.SET_AUTHED:
            return {
                ...state,
                authed: true,
            };

        case USER_TYPES.SET_UNAUTHED:
            return initState;

        case USER_TYPES.SET_USER:
            return {
                authed: true,
                loading: false,
                ...action.payload,
            };

        case USER_TYPES.LOADING_USER:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};