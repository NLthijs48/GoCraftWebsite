import {AbsoluteScroller} from 'components/AbsoluteScroller'
import {Embedded} from 'modules/pages/components/Embedded'
import {Home} from 'modules/pages/components/Home'
import {HTML} from 'modules/pages/components/HTML'
import {Loading} from 'modules/pages/components/Loading'
import {Maps} from 'modules/pages/components/Maps'
import {NotFound} from 'modules/pages/components/NotFound'
import {Page, PagesState} from 'modules/pages/model'
import {Servers} from 'modules/servers/components/Servers'
import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {MenuEntry} from '../model'

interface MenuItemPageProps {
    item: MenuEntry
}
class MenuItemPageDisplay extends React.Component<MenuItemPageProps & StateToProps, {}> {
    public render() {
        const {item, pages} = this.props

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
                {renderPage(page, item)}
            </AbsoluteScroller>
        )
    }
}

function renderPage(page: Page, item: MenuEntry): React.ReactElement<any> {
    switch(page.type) {
        case 'home':
            return <Home />
        case 'html':
            return <HTML page={page}/>
        case 'maps':
            return <Maps />
        case 'frame':
            return <Embedded page={page}/>
        case 'servers':
            return <Servers basePath={'/' + nameToPath(item.title)}/>
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
