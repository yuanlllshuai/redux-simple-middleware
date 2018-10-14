// import axios from "axios";
<<<<<<< HEAD
import { createAction, createReducer, createAsynType, createAsynReducer } from 'redux-simple-middleware/lib/reduxAPI'
=======
import { createAsynType, createAsynReducer, createSyncReducer } from 'redux-simple-middleware/lib/reduxAPI'
>>>>>>> e65ff41606cba8ad15f3bf627bbe30fefd406202

const initState = {
    isFecting: false,
    isSucceed: true,
    data: null,
}

const pre = 'test';
<<<<<<< HEAD

const syncType = `${pre}_SYNC_DATA`;
export const syncAction = createAction(syncType, 'stringData');
export const syncReducer = createReducer('', {
    [syncType](state, action) {
        return action.stringData;
    }
})

export const testReducer = createAsynReducer(initState, pre);
export function asynAction() {
=======
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
>>>>>>> e65ff41606cba8ad15f3bf627bbe30fefd406202
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
<<<<<<< HEAD
        resHandle: response => {
            if (response.data.errCode === 200) {
                return true
            } else {
                return false
            }
        },
        callback: {
            successCall: () => console.log('成功'),
=======
        callback: {
            successCall: (_, dispatch) => dispatch(syncAction()),
>>>>>>> e65ff41606cba8ad15f3bf627bbe30fefd406202
            // successCall: dispatch => dispatch(syncAction()),//1
            failureCall: () => console.log('失败'),
        },
    };
}