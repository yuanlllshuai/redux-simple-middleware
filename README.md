# redux-simple-middleware
a simple redux middleware and some redux API

    npm install --save redux-simple-middleware

### Usage:<br/>
configureStore.js:<br/>
```
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import simpleMiddleware from 'redux-simple-middleware'

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(simpleMiddleware),
        )
    )
}
```
action.js:<br/>
```
import { createAsynType, createAsynReducer, createSyncReducer } from 'redux-simple-middleware/lib/reduxAPI'
```
Synchronous Action:<br/>
```
const syncType = `SYNCTYPE`;
const initState = {};
//reducer
export const syncReducer = createSyncReducer(initState, myType);
//action
export function syncAction(data) {
    return {
        type: syncType,
        data
    }
}
```
Asynchronous Action:<br/>
```
const initState = {
    isFecting: false,
    isSucceed: true,
    data: null,
}
const pre = 'asyc';//custom
//reducer
export const testReducer = createAsynReducer(initState, pre);
//action
export function test() {
    return {
        types: createAsynType(pre),
        // shouldSaveData: false,
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
            successCall: (data, dispatch, getState) => console.log('succeed', data),
            // successCall: dispatch => dispatch(syncAction()),//when shouldSaveData: false,
            failureCall: () => console.log('failed'),
        },
    };
}

