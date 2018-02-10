import {Store} from 'react-redux'
import {AppState, reducers} from 'reducer'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import {persistCombineReducers, persistReducer, persistStore} from 'redux-persist'
import {Persistor} from 'redux-persist/es/types'
import storage from 'redux-persist/lib/storage'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

export function configureStore(): {store: Store<AppState|undefined>, persistor: Persistor} {
    const middlewares: any[] = [promise, thunk]

    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({timestamp: false}))
    }

    const config = {
        key: 'primary',
        storage,
        blacklist: ['players', 'reducerVersion'],
        throttle: 300,
    }

    const reducer = persistCombineReducers<AppState>(config, reducers)

    const store = createStore(
        reducer,

        composeWithDevTools(
            applyMiddleware(...middlewares),
        ),
    )

    // Start periodic save
    const persistor = persistStore(store)

    if(module.hot) {
        // Handle hot reducer updates
        module.hot.accept('../reducer', () => {
            store.replaceReducer(persistReducer(config, require('../reducer').rootReducer))
            store.dispatch({type: 'REDUCER_UPDATED'})
        })
    }

    return {store, persistor}
}
