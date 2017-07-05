import {rootReducer} from 'reducer'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

// TODO use localstorage to keep most state
export function configureStore() {
    const middlewares: any[] = [promise, thunk]

    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({timestamp: false}))
    }

    const store = createStore(
        rootReducer,
        {}, // Persisted state
        composeWithDevTools(
            applyMiddleware(...middlewares),
        ),
    )

    if(module.hot) {
        // Handle hot reducer updates
        module.hot.accept('../reducer', () => {
            store.replaceReducer(require('../reducer').rootReducer)
            store.dispatch({type: 'REDUCER_UPDATED'})
        })
    }

    return store
}
