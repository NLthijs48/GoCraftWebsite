import {SiteContent} from 'components/SiteContent'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Loading} from 'modules/pages/components/Loading'
import * as React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
import {configureStore} from 'store/configureStore'
import {THEME} from 'types'

const {store, persistor} = configureStore()

export function SiteConfiguration() {
    return (
        <AppContainer>
            <Provider store={store}>
                <PersistGate loading={<Loading size={80} />} persistor={persistor}>
                    <Router>
                        <MuiThemeProvider theme={THEME}>
                            <SiteContent />
                        </MuiThemeProvider>
                    </Router>
                </PersistGate>
            </Provider>
        </AppContainer>
    )
}
