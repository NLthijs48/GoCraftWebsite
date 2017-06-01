import React from 'react'
import {connect, Dispatch} from 'react-redux'
import {fetchMenu} from '../actions'
import {AppState} from 'reducer'
import {Menu, MenuEntry, MenuItems, MenuState} from '../model'
import {Route, withRouter} from 'react-router'
import {MenuItemPage} from './MenuItemPage'

interface MenuRoutesProps {
    source: string
}
class MenuRoutesDisplay extends React.Component<MenuRoutesProps & StateToProps & DispatchToProps, {}> {
    public componentWillMount() {
        this.props.fetchMenu()
    }

    public render() {
        return <div>{menuToRoutes(this.props.menu.byId, this.props.menu.items, '/')}</div>
    }
}

function getMenuItemPageFunction(itemInfo: MenuEntry) {
    return () => <MenuItemPage item={itemInfo} />
}

function menuToRoutes(byId: Menu, items: MenuItems, base: string): Array<React.ReactElement<any>> {
    const result: Array<React.ReactElement<any>> = []
    items.map((item) => {
        const itemInfo: MenuEntry = byId[item]
        const path = base + itemInfo.title.toLowerCase() + '/:one?/:two?/:three?'
        result.push(<Route key={path} path={path} render={getMenuItemPageFunction(itemInfo)} />)
        if(itemInfo.children.length) {
            result.push(...menuToRoutes(byId, itemInfo.children, path + '/'))
        }
    })
    return result
}

interface StateToProps {
    menu: MenuState
}
interface DispatchToProps {
    fetchMenu: () => void
}
export const MenuRoutes = withRouter<any>(connect<StateToProps, DispatchToProps, MenuRoutesProps>(
    (state: AppState, ownProps: MenuRoutesProps): StateToProps => ({
        menu: state.menus[ownProps.source] || {},
    }),
    (dispatch: Dispatch<any>, ownProps: MenuRoutesProps): DispatchToProps => ({
        fetchMenu: () => dispatch(fetchMenu(ownProps.source)),
    }),
)(MenuRoutesDisplay))
