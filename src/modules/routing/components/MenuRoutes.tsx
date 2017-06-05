import {Location} from 'history'
import {PagesState} from 'modules/pages/model'
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
        return (
            <div>{menuToRoutes({
                basePath: '/',
                items: this.props.menu.items,
                byId: this.props.menu.byId,
                location: this.props.location,
                pages: this.props.pages,
            })}</div>
        )
    }
}

function getMenuItemPageFunction(itemInfo: MenuEntry, basePath: string) {
    return () => <MenuItemPage item={itemInfo} basePath={basePath} />
}

interface MenuToRoutesProps {
    items: MenuItems
    byId: Menu
    basePath: string
    location: Location
    pages: PagesState
}
function menuToRoutes(data: MenuToRoutesProps): Array<React.ReactElement<any>> {
    const {byId, items, basePath, location, pages} = data
    const result: Array<React.ReactElement<any>> = []
    items.map((menuItemKey) => {
        const menuItem: MenuEntry = byId[menuItemKey]

        // Path is normally just the normalized name
        let path = nameToPath(menuItem.title)
        // If the page specifies a path, use that
        if(pages.byId && pages.byId[menuItem.page] && pages.byId[menuItem.page].urlPath) {
            path = nameToPath(pages.byId[menuItem.page].urlPath+'')
        }
        path = basePath + path

        // Add this menu item
        result.push(
            <Route
                location={location}
                key={path}
                path={path+'/:one?/:two?/:three?'}
                render={getMenuItemPageFunction(menuItem, basePath)}
            />,
        )

        // Generate and add child items
        if(menuItem.children.length) {
            result.push(...menuToRoutes({
                ...data,
                items: menuItem.children,
                basePath: path + '/',
            }))
        }
    })
    return result
}

interface StateToProps {
    menu: MenuState
    pages: PagesState
}
export const MenuRoutes = connect<StateToProps, {}, MenuRoutesProps>(
    (state: AppState, ownProps: MenuRoutesProps): StateToProps => ({
        menu: state.menus[ownProps.source] || {},
        pages: state.pages,
    }),
)(MenuRoutesDisplay)
