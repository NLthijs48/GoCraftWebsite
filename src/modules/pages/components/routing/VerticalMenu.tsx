import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import {Loading} from 'modules/pages/components/Loading'
import {MenuLevel} from 'modules/pages/components/routing/MenuLevel'
import {PagesState} from 'modules/pages/model'
import React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'

type AllMenuProps = DispatchToProps & StateToProps & RouteComponentProps<any>
class MenuDisplay extends React.PureComponent<AllMenuProps, {}> {
    public constructor(props: AllMenuProps) {
        super(props)
        this.handleRequestChange = this.handleRequestChange.bind(this)
    }

    public render() {
        const {pages} = this.props
        if(pages.isFetching && (!pages || !pages.byId || !pages.rootItems)) {
            return <Loading />
        }

        return <MenuLevel items={pages.rootItems} basePath="/" currentPath={this.props.location.pathname} />
    }

    private handleRequestChange = (event: any, to: any) => {
        this.props.history.push({pathname: to})
        if(!this.props.drawer.docked) {
            this.props.closeDrawer()
        }
    }
}

interface StateToProps {
    drawer: DrawerState
    pages: PagesState
}
interface DispatchToProps {
    closeDrawer: () => void
}
export const VerticalMenu = withRouter<any>(connect<StateToProps, DispatchToProps, {}, AppState>(
    (state) => ({
        drawer: state.drawer,
        pages: state.pages,
    }),
    (dispatch) => ({
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(MenuDisplay))
