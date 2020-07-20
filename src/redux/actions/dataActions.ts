import { DATA_TYPES, UI_TYPES, ActionModel } from '../types';
import axios from 'axios';
import { Dispatch } from 'react';

export const pushLocalError = (error: string) => (dispatch: Dispatch<ActionModel>) => {
    dispatch({
        type: UI_TYPES.SET_ERRORS,
        payload: error,
    });
};