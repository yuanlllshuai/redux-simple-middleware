// import axios from "axios";
import { createAsynType, createAsynReducer, createSyncReducer } from 'redux-simple-middleware/lib/reduxAPI'

const initState = {
    isFecting: false,
    isSucceed: true,
    data: null,
}

const pre = 'test';
const successType = `${pre}_SUCCESS`;

export const testReducer = createAsynReducer(initState, pre);

export const syncReducer = createSyncReducer({}, successType);

function syncAction() {
    return {
        type: successType,
        data: { value: 'success' }
    }
}

export function test() {
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
        callback: {
            successCall: (_, dispatch) => dispatch(syncAction()),
            // successCall: dispatch => dispatch(syncAction()),//1
            failureCall: () => console.log('失败'),
        },
    };
}