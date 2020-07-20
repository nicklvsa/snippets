import { DATA_TYPES, ActionModel } from '../types';

interface DataReducerStateModel {
    loading: boolean;
}

const initState: DataReducerStateModel = {
    loading: false,
};

export default function(state = initState, action: ActionModel) {
    switch (action.type) {
        case DATA_TYPES.LOADING_DATA:
            return {
                ...state,
                loading: true,
            };

        default:
            return state;
    }
};