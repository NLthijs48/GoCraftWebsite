import React from 'react'
import ReactDOM from 'react-dom'
import Site from './components/Site'
import {AppContainer} from 'react-hot-loader'

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        document.getElementById('site')
    )
}

render(Site)

if(module.hot) {
    module.hot.accept('./components/Site', () => {
        render(Site)
    })
}
