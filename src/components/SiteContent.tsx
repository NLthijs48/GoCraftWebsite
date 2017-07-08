import {PreFetch} from 'components/PreFetch'
import {LeftDrawer} from 'modules/drawer/components/LeftDrawer'
import {TopBar} from 'modules/drawer/components/TopBar'
import {DrawerState} from 'modules/drawer/model'
import {Routes} from 'modules/pages/components/routing/Routes'
import {VerticalMenu} from 'modules/pages/components/routing/VerticalMenuNew'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Websocket} from 'websocket/websocket'

class SiteContentDisplay extends React.Component<StateToProps, {}> {
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
}

interface StateToProps {
    drawer: DrawerState
}
export const SiteContent = withRouter<any>(connect<StateToProps, {}, {}>(
    (state: AppState): StateToProps => ({
        drawer: state.drawer,
    }),
)(SiteContentDisplay))
