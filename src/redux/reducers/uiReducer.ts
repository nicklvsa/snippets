import { UI_TYPES, ActionModel } from '../types';

interface InitialStateModel {
    loading: boolean;
    errors: string;
}

const initState: InitialStateModel = {
    loading: false,
    errors: '',
};

export default function(state = initState, action: ActionModel) {
    switch (action.type) {
        case UI_TYPES.SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case UI_TYPES.CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
            };

        case UI_TYPES.LOADING_UI:
            return {
                ...state,
                loading: false,
                errors: null,
            };

        case UI_TYPES.STOP_LOADING_UI:
            return {
                ...state,
                loading: false,
            };

        default:
            return state;
    }
}