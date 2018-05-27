import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import {SiteContent} from 'components/SiteContent'
import {Loading} from 'modules/pages/components/Loading'
import Raven from 'raven-js'
import * as React from 'react'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import {PersistGate} from 'redux-persist/integration/react'
import {configureStore} from 'store/configureStore'
import {THEME} from 'types'

const {store, persistor} = configureStore()

export class SiteConfiguration extends React.Component<{}, {error: boolean}> {

    public constructor(props: {}) {
        super(props)
        this.state = {error: false}
    }

    public componentDidCatch(error: any, errorInfo: any) {
        Raven.captureException(error, {extra: errorInfo})
        this.setState({error: true})
    }

    public render() {
        if(this.state.error) {
            return (
                <div style={{
                    backgroundColor: 'red',
                    color: '#fff',
                    padding: '3em',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    textAlign: 'center',
                }}>
                    <h1>Oops! Something went wrong</h1>
                    <h2 style={{color: 'rgba(255,255,255,0.8)'}}>
                        Our team has been notified about the problem and will work on a solution.
                        Meanwhile, try <span style={{textDecoration: 'underline', cursor: 'pointer'}} onClick={() => window.location.reload(true)}>reloading the page</span>
                    </h2>
                </div>
            )
        }

        return (
            <AppContainer>
                <Provider store={store}>
                    <MuiThemeProvider theme={THEME}>
                        <PersistGate loading={<Loading size={80}/>} persistor={persistor}>
                            <Router>
                                <SiteContent/>
                            </Router>
                        </PersistGate>
                    </MuiThemeProvider>
                </Provider>
            </AppContainer>
        )
    }
}
