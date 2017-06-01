import React from 'react'
import ReactDOM from 'react-dom'
import {Site} from 'components/Site'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {configureStore} from 'store/configureStore'

const store = configureStore()

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <Site />
            </Provider>
        </AppContainer>,
        document.getElementById('site'),
    )
}

render()

if(module.hot) {
    module.hot.accept('./components/Site', () => {
        render()
    })
}
