import {Location} from 'history'
import {Loading} from 'modules/pages/components/Loading'
import {NotFound} from 'modules/pages/components/pageTypes/NotFound'
import {Page, PageItems, Pages, PagesState} from 'modules/pages/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {MenuItemPage} from './MenuItemPage'

interface MenuRoutesProps {
    location: Location
}
class MenuRoutesDisplay extends React.PureComponent<MenuRoutesProps & StateToProps, {}> {
    public render() {
        if(this.props.pages.rootItems.length === 0 && this.props.pages.isFetching) {
            return <Loading />
        }

        return (
            <Switch location={this.props.location}>
                {pagesToRoutes({
                    basePath: '/',
                    byId: this.props.pages.byId,
                    location: this.props.location,
                    pages: this.props.pages.rootItems,
                })}
                <Route component={NotFound}/>
            </Switch>
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
                path={path}
                render={getPageRenderFunction(page, basePath)}
            />,
        )

        // Add extra item for home at root
        if(page.type === 'home') {
            result.push(
                <Route
                    location={location}
                    key="/"
                    path="/"
                    render={getPageRenderFunction(page, '/')}
                    exact={true}
                />,
            )
        }

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
export const MenuRoutes = connect<StateToProps, {}, MenuRoutesProps, AppState>(
    (state) => ({
        pages: state.pages,
    }),
)(MenuRoutesDisplay)
