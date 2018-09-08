import { combineReducers } from 'redux'
import { testReducer, syncReducer } from './actions'

const testReducers = combineReducers({
    testReducer,
    syncReducer
});

export default testReducers