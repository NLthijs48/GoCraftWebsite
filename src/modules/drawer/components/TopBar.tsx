import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
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
        const {drawer} = this.props
        return (
            <Toolbar style={{
                backgroundColor: THEME.palette.primary1Color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                zIndex: 11, // Appear above menu bar
                padding: 0,
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
                maxHeight: '48px', // TODO fix
            }}>
                {!drawer.docked &&
                    <IconButton onClick={this.onMenuIconTap} style={{
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
                        marginLeft: drawer.docked ? '256px' : 0,
                    }}
                >
                    <img src={logo} alt="logo" style={{maxHeight: 75, marginTop: '-0.1em'}}/>
                </NavLink>
                <Filler />
                {!drawer.docked && <div style={{width: '2.8em'}} />}
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
export const TopBar = withRouter<any>(connect<StateToProps, DispatchToProps, MenuProps, AppState>(
    (state) => ({
        drawer: state.drawer,
    }),
    (dispatch) => ({
        updateOpen: (to) => dispatch(updateDrawerOpen(to)),
    }),
)(TopBarDisplay))
