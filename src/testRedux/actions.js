// import axios from "axios";
import { createAction, createReducer, createAsynType, createAsynReducer } from 'redux-simple-middleware/lib/reduxAPI'

const initState = {
    isFecting: false,
    isSucceed: true,
    data: null,
}

const pre = 'test';

const syncType = `${pre}_SYNC_DATA`;
export const syncAction = createAction(syncType, 'stringData');
export const syncReducer = createReducer('', {
    [syncType](state, action) {
        return action.stringData;
    }
})

export const testReducer = createAsynReducer(initState, pre);
export function asynAction() {
    return {
        types: createAsynType(pre),
        // shouldSaveData: false,  //1
        fetchAPI: () => new Promise(resolve => {
            const response = {
                data: {
                    errCode: 200,
                    data: {
                        value: 'success'
                    }
                }
            };
            resolve(response);
        }),
        dealData: data => {
            return {
                ...data,
                value: `成功${data.value}`
            }
        },
        resHandle: response => {
            if (response.data.errCode === 200) {
                return true
            } else {
                return false
            }
        },
        callback: {
            successCall: () => console.log('成功'),
            // successCall: dispatch => dispatch(syncAction()),//1
            failureCall: () => console.log('失败'),
        },
    };
}