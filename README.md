# redux-simple-middleware
[![npm version](https://img.shields.io/npm/v/redux-simple-middleware.svg)](https://www.npmjs.com/package/redux-simple-middleware)<br/>
a simple redux middleware and some redux API

## Install:
    npm install --save redux-simple-middleware

## Usage Example:<br/>
configureStore.js:<br/>
```javascript
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
```javascript
import { createAction, createReducer, createAsynType, createAsynReducer } from 'redux-simple-middleware/lib/reduxAPI'
const pre = 'asyc';//custom
```
Synchronous Action:<br/>
```javascript
const syncType = `${pre}_SYNC_STRING_DATA`;
const initState = '';
//reducer
export const syncReducer = createReducer('', {
    [syncType](state, action) {
        return action.stringData;
    }
})
//action
export const syncAction = createAction(syncType, 'stringData');
```
Asynchronous Action:<br/>
```javascript
const initState = {
    isFecting: false,
    isSucceed: true,
    data: null,
}
//reducer
export const testReducer = createAsynReducer(initState, pre);
//action
export function test() {
    return {
        types: createAsynType(pre),
        shouldSaveData: true, //default: true
        shouldfetchAPI: getState => getState.myReducers.testReducer, //default: () => true
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
        resHandle: response => {
            if (response.data.errCode === 200) {
                return true
            } else {
                return false
            }
        },
        dealData: data => {
            return {
                ...data,
                value: `hello${data.value}`
            }
        },
        callback: {
            successCall: (data, dispatch, getState) => console.log('succeed', data),
            // successCall: dispatch => dispatch(syncAction()),//when shouldSaveData: false
            failureCall: () => console.log('failed'),
        },
    };
}

