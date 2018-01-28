import {SiteContent} from 'components/SiteContent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import * as React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {configureStore} from 'store/configureStore'
import {THEME} from 'types'

const store = configureStore()

// TODO add back theme
export function SiteConfiguration() {
    return (
        <AppContainer>
            <Provider store={store}>
                <Router>
                    <MuiThemeProvider theme={THEME}>
                        <SiteContent />
                    </MuiThemeProvider>
                </Router>
            </Provider>
        </AppContainer>
    )
}
