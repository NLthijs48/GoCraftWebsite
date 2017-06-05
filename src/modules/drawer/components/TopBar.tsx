import AppBar from 'material-ui/AppBar'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Dispatch} from 'redux'

const logo = require('images/logo.png')

interface MenuProps {
    source: string
}
class TopBarDisplay extends React.Component<MenuProps & DispatchToProps & StateToProps, {}> {

    constructor(props: any) {
        super(props)
        this.onMenuIconTap = this.onMenuIconTap.bind(this)
    }

    public render() {
        return (
            <AppBar
                title={
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',
                        }}
                    >
                        <img src={logo} alt="logo" style={{height: 40}}/>
                    </div>
                }
                onLeftIconButtonTouchTap={this.onMenuIconTap}
                showMenuIconButton={!this.props.drawer.docked}
                iconElementRight={<div style={{width: 56}} />}
            />
        )
    }

    private onMenuIconTap() {
        this.props.updateOpen(!this.props.drawer.open)
    }
}

interface StateToProps {
    drawer: DrawerState
}
interface DispatchToProps {
    updateOpen: (to: boolean) => void
}
export const TopBar = withRouter<any>(connect<StateToProps, DispatchToProps, MenuProps>(
    (state: AppState, ownProps: MenuProps): StateToProps => ({
        drawer: state.drawer,
    }),
    (dispatch: Dispatch<any>, ownProps: MenuProps): DispatchToProps => ({
        updateOpen: (to) => dispatch(updateDrawerOpen(to)),
    }),
)(TopBarDisplay))
