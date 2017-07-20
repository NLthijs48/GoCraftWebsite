import {AbsoluteScroller} from 'components/AbsoluteScroller'
import {Loading} from 'modules/pages/components/Loading'
import {Embedded} from 'modules/pages/components/pageTypes/Embedded'
import {Home} from 'modules/pages/components/pageTypes/Home'
import {HTML} from 'modules/pages/components/pageTypes/HTML'
import {Maps} from 'modules/pages/components/pageTypes/Maps'
import {NotFound} from 'modules/pages/components/pageTypes/NotFound'
import {Page, PagesState} from 'modules/pages/model'
import {Servers} from 'modules/servers/components/Servers'
import {Shop} from 'modules/shop/components/Shop'
import {VoteSitesList} from 'modules/votesites/components/VoteSitesList'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'

interface MenuItemPageProps {
    page: Page
    basePath: string
}
class MenuItemPageDisplay extends React.PureComponent<MenuItemPageProps & StateToProps, {}> {
    public render() {
        const {page, pages, basePath} = this.props

        // Loading indicator
        if(pages.isFetching && (!page || !pages.byId)) {
            return <Loading />
        }

        if(!page) {
            return <NotFound />
        }

        return (
            <AbsoluteScroller>
                {renderPage(page, basePath+nameToPath(page.urlPath || page.title))}
            </AbsoluteScroller>
        )
    }
}

function renderPage(page: Page, basePath: string): React.ReactElement<any> {
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
        case 'shop':
            return <Shop basePath={basePath} />
        default:
            console.error('unknown page type:', page, 'at basePath:', basePath)
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
