import {SiteConfiguration} from 'components/SiteConfiguration'
import Raven from 'raven-js'
import * as React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {isLocalhost} from 'utils/utils'

if(!isLocalhost()) {
    Raven
        .config('https://a79017f727aa428e8f44e3763453e505@sentry.io/188788')
        .install()
}

require('font-awesome-webpack')

injectTapEventPlugin()

const render = () => {
    ReactDOM.render(
        <SiteConfiguration />,
        document.getElementById('site'),
    )
}

render()

// Setup hot reload
if(module.hot) {
    // Handle React component updates
    module.hot.accept('./components/SiteConfiguration', () => {
        // Fix to get components to hot update (https://github.com/gaearon/react-hot-loader/issues/249#issuecomment-249105895)
        const nextRootLayout = require('./components/SiteConfiguration')
        render()
    })
}
