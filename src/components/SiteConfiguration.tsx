import {SiteContent} from 'components/SiteContent'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {configureStore} from 'store/configureStore'
import {THEME} from 'types'

const store = configureStore()

export function SiteConfiguration() {
    return (
        <AppContainer>
            <Provider store={store}>
                <MuiThemeProvider muiTheme={getMuiTheme(THEME)}>
                    <Router>
                        <SiteContent />
                    </Router>
                </MuiThemeProvider>
            </Provider>
        </AppContainer>
    )
}
