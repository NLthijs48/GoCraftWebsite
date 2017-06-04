import {Location} from 'history'
import React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {Menu, MenuEntry, MenuItems, MenuState} from '../model'
import {MenuItemPage} from './MenuItemPage'

interface MenuRoutesProps {
    source: string
    location: Location
}
class MenuRoutesDisplay extends React.Component<MenuRoutesProps & StateToProps, {}> {
    public render() {
        const location = this.props.location
        return <div>{menuToRoutes(this.props.menu.byId, this.props.menu.items, '/', location)}</div>
    }
}

function getMenuItemPageFunction(itemInfo: MenuEntry) {
    return () => <MenuItemPage item={itemInfo} />
}

function menuToRoutes(byId: Menu, items: MenuItems, base: string, location: Location): Array<React.ReactElement<any>> {
    const result: Array<React.ReactElement<any>> = []
    items.map((item) => {
        const itemInfo: MenuEntry = byId[item]
        const path = base + nameToPath(itemInfo.title) + '/:one?/:two?/:three?'
        result.push(<Route location={location} key={path} path={path} render={getMenuItemPageFunction(itemInfo)} />)
        if(itemInfo.children.length) {
            result.push(...menuToRoutes(byId, itemInfo.children, path + '/', location))
        }
    })
    return result
}

interface StateToProps {
    menu: MenuState
}
export const MenuRoutes = connect<StateToProps, {}, MenuRoutesProps>(
    (state: AppState, ownProps: MenuRoutesProps): StateToProps => ({
        menu: state.menus[ownProps.source] || {},
    }),
)(MenuRoutesDisplay)
