import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {Dispatch} from 'redux'
import {THEME} from 'types'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'

const logo = require('images/logo.png')

interface MenuProps {
    source: string
}
class TopBarDisplay extends React.PureComponent<MenuProps & DispatchToProps & StateToProps, {}> {

    constructor(props: any) {
        super(props)
        this.onMenuIconTap = this.onMenuIconTap.bind(this)
    }

    public render() {
        return (
            <Toolbar style={{
                backgroundColor: THEME.palette.primary1Color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                zIndex: 11, // Appear above menu bar
                padding: 0,
            }}>
                {!this.props.drawer.docked &&
                    <IconButton onTouchTap={this.onMenuIconTap} style={{
                        fontSize: 'inherit',
                        width: '56px',
                        height: '56px',
                    }}>
                        <Icon
                            color="#FFF"
                            size="1.5em"
                            name="bars"
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    </IconButton>
                }
                <Filler />
                <NavLink to="/"
                    style={{
                        height: '100%',
                    }}
                >
                    <img src={logo} alt="logo" style={{height: 75, marginTop: '-0.1em'}}/>
                </NavLink>
                <Filler />
                {!this.props.drawer.docked && <div style={{width: '2.8em'}} />}
            </Toolbar>
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
