import {AbsoluteScroller} from 'components/AbsoluteScroller'
import {Embedded} from 'modules/pages/components/Embedded'
import {Home} from 'modules/pages/components/Home'
import {HTML} from 'modules/pages/components/HTML'
import {Loading} from 'modules/pages/components/Loading'
import {Maps} from 'modules/pages/components/Maps'
import {NotFound} from 'modules/pages/components/NotFound'
import {Page, PagesState} from 'modules/pages/model'
import {Servers} from 'modules/servers/components/Servers'
import {VoteSitesList} from 'modules/votesites/components/VoteSitesList'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {MenuEntry} from '../model'

interface MenuItemPageProps {
    item: MenuEntry
    basePath: string
}
class MenuItemPageDisplay extends React.PureComponent<MenuItemPageProps & StateToProps, {}> {
    public render() {
        const {item, pages, basePath} = this.props

        // Loading indicator
        if(pages.isFetching && (!pages.byId || !pages.byId[item.page])) {
            return <Loading />
        }

        const page: Page = pages.byId[item.page]
        if(!page) {
            return <NotFound />
        }

        return (
            <AbsoluteScroller>
                {renderPage(page, item, basePath+nameToPath(page.urlPath || item.title))}
            </AbsoluteScroller>
        )
    }
}

function renderPage(page: Page, item: MenuEntry, basePath: string): React.ReactElement<any> {
    switch(page.type) {
        case 'home':
            return <Home basePath={basePath} />
        case 'html':
            return <HTML page={page}/>
        case 'maps':
            return <Maps basePath={basePath} />
        case 'frame':
            return <Embedded page={page}/>
        case 'servers':
            return <Servers basePath={basePath}/>
        case 'vote-sites':
            return <VoteSitesList basePath={basePath} />
        default:
            console.error('unknown page type:', page, 'menu item:', item)
            return <NotFound />
    }
}

interface StateToProps {
    pages: PagesState
}
export const MenuItemPage = withRouter<any>(connect<StateToProps, {}, MenuItemPageProps>(
    (state: AppState): StateToProps => ({
        pages: state.pages,
    }),
)(MenuItemPageDisplay))
