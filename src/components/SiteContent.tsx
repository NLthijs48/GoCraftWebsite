import {PreFetch} from 'components/PreFetch'
import {Action, Location, UnregisterCallback} from 'history'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {LeftDrawer} from 'modules/drawer/components/LeftDrawer'
import {TopBar} from 'modules/drawer/components/TopBar'
import {DrawerState} from 'modules/drawer/model'
import {Routes} from 'modules/pages/components/routing/Routes'
import {VerticalMenu} from 'modules/pages/components/routing/VerticalMenu'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Dispatch} from 'redux'
import {Websocket} from 'websocket/websocket'

type AllSiteContentProps = StateToProps & DispatchToProps & RouteComponentProps<any>
class SiteContentDisplay extends React.Component<AllSiteContentProps, {}> {
    private unlisten: UnregisterCallback

    public constructor(props: AllSiteContentProps) {
        super(props)
        this.onNavigate = this.onNavigate.bind(this)
    }

    public componentDidMount() {
        this.unlisten = this.props.history.listen(this.onNavigate)
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
    }
}

interface StateToProps {
    drawer: DrawerState
}
interface DispatchToProps {
    closeDrawer: () => void
}
export const SiteContent = withRouter<any>(connect<StateToProps, {}, {}>(
    (state: AppState): StateToProps => ({
        drawer: state.drawer,
    }),
    (dispatch: Dispatch<any>): DispatchToProps => ({
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(SiteContentDisplay))
