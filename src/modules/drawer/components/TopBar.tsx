import Hidden from 'material-ui/Hidden'
import IconButton from 'material-ui/IconButton'
import Toolbar from 'material-ui/Toolbar'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {THEME} from 'types'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'

const logo = require('images/logo.png')

interface MenuProps {
    source: string
}
class TopBarDisplay extends React.PureComponent<MenuProps & DispatchToProps & StateToProps & RouteComponentProps<any>, {}> {

    constructor(props: any) {
        super(props)
        this.onMenuIconTap = this.onMenuIconTap.bind(this)
    }

    public render() {
        return (
            <Toolbar style={{
                backgroundColor: THEME.palette.primary.main,
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                zIndex: 11, // Appear above menu bar
                padding: 0,
                boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
                height: '56px',
                minHeight: 0,
                maxHeight: '56px',
            }}>
                <Hidden mdUp>
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
                </Hidden>

                <Filler />

                <NavLink to="/" style={{height: '100%'}}>
                    <img src={logo} alt="logo" style={{
                        maxHeight: this.props.location.pathname === '/' ? 100 : 75,
                        transition: 'max-height 150ms ease-in-out',
                    }}/>
                </NavLink>

                <Filler />

                <Hidden mdUp>
                    <div style={{width: '2.8em'}} />
                </Hidden>
            </Toolbar>
        )
    }

    private onMenuIconTap() {
        this.props.updateOpen(!this.props.drawer.open, 'button')
    }
}

interface StateToProps {
    drawer: DrawerState
}
interface DispatchToProps {
    updateOpen: (to: boolean, reason?: string) => void
}
export const TopBar = withRouter<any>(connect<StateToProps, DispatchToProps, MenuProps, AppState>(
    (state) => ({
        drawer: state.drawer,
    }),
    (dispatch) => ({
        updateOpen: (to, reason) => dispatch(updateDrawerOpen(to, reason)),
    }),
)(TopBarDisplay))
