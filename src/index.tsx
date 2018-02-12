import '@babel/polyfill'
import {SiteConfiguration} from 'components/SiteConfiguration'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import Raven from 'raven-js'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {isLocalhost} from 'utils/utils'

const a = new Promise(() => {
    // Force Promise polyfill, otherwise it does not work somehow
})

if(!isLocalhost()) {
    // Sentry setup
    Raven
        .config('https://a79017f727aa428e8f44e3763453e505@sentry.io/188788')
        .install()

    // ServiceWorker and AppCache setup
    OfflinePluginRuntime.install({
        onUpdateReady: () => {
            OfflinePluginRuntime.applyUpdate()
        },
    })
}

require('font-awesome-webpack')

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
