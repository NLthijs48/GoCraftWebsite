import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import reducer from 'reducer'
import {composeWithDevTools} from 'redux-devtools-extension'

// TODO use localstorage to keep most state
export default function configureStore() {
    const middlewares: any[] = [promise, thunk]

    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({timestamp: false}))
    }

    return createStore(
        reducer,
        {}, // Persisted state
        composeWithDevTools(
            applyMiddleware(...middlewares),
        ),
    )
}
