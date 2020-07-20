// Model for all reducer types
export interface ActionModel {
    type: USER_TYPES | UI_TYPES | DATA_TYPES;
    payload?: any;
}

// User reducer types
export enum USER_TYPES {
    SET_AUTHED = 'SET_AUTHED',
    SET_UNAUTHED = 'SET_UNAUTHED',
    LOADING_USER = 'LOADING_USER',
    SET_USER = 'SET_USER',
};

// UI reducer types
export enum UI_TYPES {
    LOADING_UI = 'LOADING_UI',
    STOP_LOADING_UI = 'STOP_LOADING_UI',
    LOADING_DATA = 'LOADING_DATA',
    SET_ERRORS = 'SET_ERRORS',
    CLEAR_ERRORS = 'CLEAR_ERRORS',
};

// Data reducer types
export enum DATA_TYPES {
    LOADING_DATA = 'LOADING_DATA',
};
