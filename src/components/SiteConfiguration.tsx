import {SiteContent} from 'components/SiteContent'
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
                            primary1Color: '#388e3c',
                            primary2Color: '#66bb6a',
                            accent1Color: '#fb8c00',
                            accent3Color: '#ff9800',
                            primary3Color: '#e0e0e0',
                            textColor: 'rgba(0, 0, 0, 0.9)',
                            secondaryTextColor: 'rgba(0, 0, 0, 0.59)',
                            borderColor: '#bdbdbd',
                            pickerHeaderColor: '#388e3c',
                            clockCircleColor: 'rgba(0, 0, 0, 0.05)',
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
