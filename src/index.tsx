import '@babel/polyfill'
import {SiteConfiguration} from 'components/SiteConfiguration'
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
        .config('https://a79017f727aa428e8f44e3763453e505@sentry.io/188788', {
            dataCallback: (data) => {
                // Error occured and update is available? Update now
                if ((window as any).swUpdate) {
                    (window as any).location.reload()
                }
                return data
            },
        })
        .install()

    // ServiceWorker and AppCache setup
    /* Disabled, need to solve serving on /subdomains
    OfflinePluginRuntime.install({
        onUpdateReady: () => {
            console.log('ServiceWorker update available, applying...')
            OfflinePluginRuntime.applyUpdate()
        },
        onUpdating: () => {
            console.log('ServiceWorker is updating...')
        },
        onUpdated: () => {
            (window as any).swUpdate = true
            console.log('ServiceWorker has updated, page will reload on navigate')
        },
        onUpdateFailed: () => {
            console.log('ServiceWorker updated failed!')
        },
    })
    */

    // Remove service worker
    navigator.serviceWorker.getRegistrations().then((registrations) => {
        for(const registration of registrations) {
            registration.unregister()
        }
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
