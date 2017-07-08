import Drawer from 'material-ui/Drawer'
import {updateDrawerDocked, updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Dispatch} from 'redux'

interface LeftDrawerProps {
    source: string
}
class LeftDrawerDisplay extends React.PureComponent<LeftDrawerProps & DispatchToProps & StateToProps, {}> {

    constructor(props: any) {
        super(props)
        this.state = {width: 0, height: 0}
        this.updateDocked = this.updateDocked.bind(this)
        this.requestChange = this.requestChange.bind(this)
    }

    public componentDidMount() {
        this.updateDocked();
        window.addEventListener('resize', this.updateDocked)
    }

    public componentWillUnmount() {
        window.removeEventListener('resize', this.updateDocked)
    }

    public updateDocked() {
        const newDocked = window.innerWidth >=800
        if(this.props.drawer.docked !== newDocked) {
            this.props.updateDocked(newDocked)
        }
    }

    public render() {
        const {docked, open} = this.props.drawer
        return (
            <Drawer
                open={docked || open}
                docked={docked}
                style={{zIndex: 10}}
                containerStyle={{position: docked ? 'static': 'absolute', paddingTop: '1.5em'}}
                containerClassName="overflow"
                onRequestChange={this.requestChange}
                className="Drawer"
            >
                {this.props.children}
            </Drawer>
        )
    }

    private requestChange(open: boolean, reason: string) {
        this.props.updateOpen(open, reason)
    }
}

interface StateToProps {
    drawer: DrawerState
}
interface DispatchToProps {
    updateOpen: (to: boolean, reason: string) => void
    updateDocked: (to: boolean) => void
}
export const LeftDrawer = withRouter<any>(connect<StateToProps, DispatchToProps, LeftDrawerProps>(
    (state: AppState, ownProps: LeftDrawerProps): StateToProps => ({
        drawer: state.drawer,
    }),
    (dispatch: Dispatch<any>, ownProps: LeftDrawerProps): DispatchToProps => ({
        updateOpen: (to, reason) => dispatch(updateDrawerOpen(to, reason)),
        updateDocked: (to) => dispatch(updateDrawerDocked(to)),
    }),
)(LeftDrawerDisplay))
