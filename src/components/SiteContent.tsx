import {PreFetch} from 'components/PreFetch'
import {Action, Location, UnregisterCallback} from 'history'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {LeftDrawer} from 'modules/drawer/components/LeftDrawer'
import {TopBar} from 'modules/drawer/components/TopBar'
import {DrawerState} from 'modules/drawer/model'
import {Routes} from 'modules/pages/components/routing/Routes'
import {VerticalMenu} from 'modules/pages/components/routing/VerticalMenu'
import * as React from 'react'
import * as ReactGA from 'react-ga'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Websocket} from 'websocket/websocket'

ReactGA.initialize('UA-72556535-1')

type AllSiteContentProps = StateToProps & DispatchToProps & RouteComponentProps<any>
class SiteContentDisplay extends React.Component<AllSiteContentProps, {}> {
    private unlisten: UnregisterCallback

    public constructor(props: AllSiteContentProps) {
        super(props)
        this.onNavigate = this.onNavigate.bind(this)
    }

    public componentDidMount() {
        this.unlisten = this.props.history.listen(this.onNavigate)
        this.trackPage(this.props.location.pathname)
    }

    public componentWillUnmount() {
        this.unlisten()
    }

    public render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    flex: 1,
                }}
            >
                <Websocket />
                <TopBar />

                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <LeftDrawer>
                        <VerticalMenu />
                    </LeftDrawer>
                    <Routes/>
                    <PreFetch />
                </div>
            </div>
        )
    }

    private onNavigate(location: Location, action: Action) {
        console.log('NAVIGATION:', action, location)
        // Close drawer when it is not docked and we are navigating
        if(this.props.drawer.open && !this.props.drawer.docked) {
            this.props.closeDrawer()
        }

        this.trackPage(location.pathname)
    }

    private trackPage(page: string) {
        ReactGA.set({
            page,
        })
        ReactGA.pageview(page)
    }
}

interface StateToProps {
    drawer: DrawerState
}
interface DispatchToProps {
    closeDrawer: () => void
}
export const SiteContent = withRouter<any>(connect<StateToProps, DispatchToProps, {}, AppState>(
    (state) => ({
        drawer: state.drawer,
    }),
    (dispatch) => ({
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(SiteContentDisplay))
