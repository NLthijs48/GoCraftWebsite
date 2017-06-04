import List from 'material-ui/List'
import ListItem from 'material-ui/List/ListItem'
import {makeSelectable} from 'material-ui/List/makeSelectable'
import {updateDrawerOpen} from 'modules/drawer/actions'
import {DrawerState} from 'modules/drawer/model'
import React, {ReactElement} from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Dispatch} from 'redux'
import {nameToPath} from 'utils/utils'
import {fetchMenu} from '../actions'
import {Menu, MenuEntry, MenuItems, MenuState} from '../model'

// TODO make like https://github.com/callemall/material-ui/blob/master/docs/src/app/components/AppNavDrawer.js

const SelectableList = makeSelectable(List)

interface MenuProps {
    source: string
}
type AllMenuProps = MenuProps & DispatchToProps & StateToProps & RouteComponentProps<{}>
class MenuDisplay extends React.Component<AllMenuProps, {}> {
    public constructor(props: AllMenuProps) {
        super(props)
        this.handleRequestChange = this.handleRequestChange.bind(this)
    }

    public componentWillMount() {
        this.props.fetchMenu()
    }

    public render() {
        const items = this.props.menu.items
        const byId = this.props.menu.byId
        return (
            <SelectableList
                value={this.props.location.pathname}
                onChange={this.handleRequestChange}
            >
                {items && byId && menuToListItems(items, byId, '/')}
            </SelectableList>
        )
    }

    private handleRequestChange = (event: any, to: any) => {
        this.props.history.push({pathname: to})
        if(!this.props.drawer.docked) {
            this.props.closeDrawer()
        }
    }
}

/**
 * Build list of menu items
 * @param items Items to render
 * @param byId Lookup for information about the items
 * @param basePath Path these items are rendered in
 * @returns {Array<ReactElement<{}>>} List of elements to be rendered for this menu
 */
function menuToListItems(items: MenuItems, byId: Menu, basePath: string): Array<ReactElement<{}>> {
    const result: Array<ReactElement<{}>> = []
    items.map((item) => {
        const info: MenuEntry = byId[item]
        const path = basePath+nameToPath(info.title)
        const children = info.children
        result.push(
            <ListItem
                key={path}
                value={path}
                primaryText={info.title}
                nestedItems={children && children.length ? menuToListItems(children, byId, path+'/') : undefined}
            />,
        )
    })
    return result
}

interface StateToProps {
    menu: MenuState
    drawer: DrawerState
}
interface DispatchToProps {
    fetchMenu: () => void
    closeDrawer: () => void
}
export const VerticalMenu = withRouter<any>(connect<StateToProps, DispatchToProps, MenuProps>(
    (state: AppState, ownProps: MenuProps): StateToProps => ({
        menu: state.menus[ownProps.source] || {},
        drawer: state.drawer,
    }),
    (dispatch: Dispatch<any>, ownProps: MenuProps): DispatchToProps => ({
        fetchMenu: () => dispatch(fetchMenu(ownProps.source)),
        closeDrawer: () => dispatch(updateDrawerOpen(false)),
    }),
)(MenuDisplay))
