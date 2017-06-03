import {SiteContent} from 'components/SiteContent'
import {green700} from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {configureStore} from 'store/configureStore'

const store = configureStore()

export function SiteConfiguration() {
    return (
        <AppContainer>
            <Provider store={store}>
                <MuiThemeProvider
                    muiTheme={getMuiTheme({
                        palette: {
                            primary1Color: green700,
                        },
                        appBar: {
                            height: 50,
                        },
                    })}
                >
                    <Router>
                        <SiteContent />
                    </Router>
                </MuiThemeProvider>
            </Provider>
        </AppContainer>
    )
}
