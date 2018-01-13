import {SiteContent} from 'components/SiteContent'
import * as React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {configureStore} from 'store/configureStore'

const store = configureStore()

// TODO add back theme
export function SiteConfiguration() {
    return (
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <SiteContent />
                </Router>
            </Provider>
        </AppContainer>
    )
}
