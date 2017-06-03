import {SiteConfiguration} from 'components/SiteConfiguration'
import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const render = () => {
    ReactDOM.render(
        <SiteConfiguration />,
        document.getElementById('site'),
    )
}

render()

if(module.hot) {
    module.hot.accept('./components/SiteConfiguration', () => {
        render()
    })
}
