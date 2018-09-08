import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './rootReducer'
import myMiddleware from 'redux-simple-middleware'

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        compose(
            applyMiddleware(myMiddleware),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )
}
