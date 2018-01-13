import {WithStyles} from 'material-ui'
import Drawer from 'material-ui/Drawer'
import Hidden from 'material-ui/Hidden'
import {Theme} from 'material-ui/styles'
import withStyles from 'material-ui/styles/withStyles'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {THEME} from 'types'

const styles = (theme: Theme) => ({
    paper: {
        width: 260,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
            height: '100%',
        },
    },
})

interface LeftDrawerProps {
    source: string
}
class LeftDrawerDisplay extends React.PureComponent<LeftDrawerProps & DispatchToProps & StateToProps & WithStyles, {}> {

    public render() {
        const {classes, drawer, children} = this.props
        return (
            <div style={{display: 'flex'}}>
                <Hidden mdUp>
                    <Drawer
                        type="temporary"
                        anchor="left"
                        open={drawer.open}
                        classes={classes}
                        onClose={this.toggleDrawerSelect}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {children}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <div style={{height: '100%', position: 'relative'}}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: '-1px',
                            height: '56px',
                            backgroundColor: THEME.palette.primary1Color,
                            zIndex: 12, // Higher than <Toolbar>
                        }}/>
                        <Drawer
                            type="permanent"
                            open
                            classes={classes}
                            style={{height: '100%', paddingTop: '56px'}}
                        >
                            {children}
                    </Drawer>
                    </div>
                </Hidden>
            </div>
        )
    }

    private toggleDrawerSelect = () => {
        this.props.updateOpen(!this.props.drawer.open, 'select')
    }

}

interface StateToProps {
    drawer: DrawerState
}
interface DispatchToProps {
    updateOpen: (to: boolean, reason: string) => void
}
export const LeftDrawer = withRouter<any>(connect<StateToProps, DispatchToProps, LeftDrawerProps, AppState>(
    (state) => ({
        drawer: state.drawer,
    }),
    (dispatch) => ({
        updateOpen: (to, reason) => dispatch(updateDrawerOpen(to, reason)),
    }),
)(withStyles(styles as any, {withTheme: true})(LeftDrawerDisplay)))
