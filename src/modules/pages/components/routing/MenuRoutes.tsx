import {Location} from 'history'
import {Page, PageItems, Pages, PagesState} from 'modules/pages/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {MenuItemPage} from './MenuItemPage'

interface MenuRoutesProps {
    location: Location
}
class MenuRoutesDisplay extends React.PureComponent<MenuRoutesProps & StateToProps, {}> {
    public render() {
        if(!this.props.pages) {
            return null
        }

        return (
            <div>{pagesToRoutes({
                basePath: '/',
                byId: this.props.pages.byId,
                location: this.props.location,
                pages: this.props.pages.rootItems,
            })}</div>
        )
    }
}

function getPageRenderFunction(page: Page, basePath: string) {
    return () => <MenuItemPage page={page} basePath={basePath} />
}

interface PagesToRoutesProps {
    byId: Pages
    basePath: string
    location: Location
    pages: PageItems
}
function pagesToRoutes(data: PagesToRoutesProps): Array<React.ReactElement<any>> {
    const {byId, basePath, location, pages} = data
    const result: Array<React.ReactElement<any>> = []
    pages.map((pageKey) => {
        const page: Page = byId[pageKey]

        // Path is normally just the normalized name
        const path = basePath + nameToPath(page.urlPath || page.title)

        // Add this menu item
        result.push(
            <Route
                location={location}
                key={path}
                path={path+(page.children.length>0 ? '' : '/:one?/:two?/:three?')}
                render={getPageRenderFunction(page, basePath)}
                exact={true}
            />,
        )

        // Generate and add child items
        if(page.children.length) {
            result.push(...pagesToRoutes({
                ...data,
                pages: page.children,
                basePath: path + '/',
            }))
        }
    })
    return result
}

interface StateToProps {
    pages: PagesState
}
export const MenuRoutes = connect<StateToProps, {}, MenuRoutesProps>(
    (state: AppState, ownProps: MenuRoutesProps): StateToProps => ({
        pages: state.pages,
    }),
)(MenuRoutesDisplay)
