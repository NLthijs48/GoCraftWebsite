import {PreFetch} from 'components/PreFetch'
import {LeftDrawer} from 'modules/drawer/components/LeftDrawer'
import {TopBar} from 'modules/drawer/components/TopBar'
import {DrawerState} from 'modules/drawer/model'
import {Routes} from 'modules/routing/components/Routes'
import {VerticalMenu} from 'modules/routing/components/VerticalMenu'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import MenuProps = __MaterialUI.Menus.MenuProps

const logo = require('images/logo.png')

class SiteContentDisplay extends React.Component<StateToProps, {}> {
    public render() {
        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    flex: 1,
                }}
            >
                {!this.props.drawer.docked && <TopBar />}
                <div
                    style={{
                        display: 'flex',
                        height: '100%',
                        flex: 1,
                        position: 'relative',
                    }}
                >
                    <LeftDrawer>
                        {this.props.drawer.docked &&
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}}>
                                <img src={logo} alt="logo" style={{height: 40}}/>
                            </div>
                        }
                        <VerticalMenu source="header-menu"/>
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
