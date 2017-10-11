import {Store} from 'react-redux'
import {AppState, rootReducer} from 'reducer'
import {applyMiddleware, createStore} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {createLogger} from 'redux-logger'
import {autoRehydrate, persistStore} from 'redux-persist'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

export function configureStore(): Store<AppState|undefined> {
    const middlewares: any[] = [promise, thunk]

    if(process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger({timestamp: false}))
    }

    const store = createStore(
        rootReducer,

        undefined,

        composeWithDevTools(
            applyMiddleware(...middlewares),
            autoRehydrate(),
        ),
    )

    // Start periodic save
    persistStore(store, {
        blacklist: ['players'],
        debounce: 200,
    })

    if(module.hot) {
        // Handle hot reducer updates
        module.hot.accept('../reducer', () => {
            store.replaceReducer(require('../reducer').rootReducer)
            store.dispatch({type: 'REDUCER_UPDATED'})
        })
    }

    return store
}
