import { Reducer } from "react";

// monitor reducer monitors the time it takes for the reducer to complete

const round = (num: number) => Math.round(num * 100) / 100;

const monitorReducerEnhancer = (makeStore: any) => (reducer: Reducer<any, any>, initialState: {}, enhancer: any) => {
    const monitoredReducer = (state: any, action: any) => {
        const start = performance.now();
        const newState = reducer(state, action);
        const end = performance.now();

        console.log(`Info:\n-------------------\nReducer: "${action.type}"
            \nProcessing time: ${round(end - start)}s\n-------------------`);

        return newState;
    };
    return makeStore(monitoredReducer, initialState, enhancer);
};

export default monitorReducerEnhancer;