import React from 'react'
import {MenuEntry} from '../model'
import {connect} from 'react-redux'
import {AppState} from '../../../reducer'
import {Page, PagesState} from '../../pages/model'
import {Home} from '../../pages/components/Home'
import {HTML} from '../../pages/components/HTML'
import {NotFound} from '../../pages/components/NotFound'
import {Maps} from '../../pages/components/Maps'
import {Embedded} from '../../pages/components/Embedded'
import {Loading} from '../../pages/components/Loading'
import {Servers} from '../../servers/components/Servers'
import {AbsoluteScroller} from '../../../components/AbsoluteScroller'
import {withRouter} from 'react-router'

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
            return <Servers basePath={'/'+item.title.toLowerCase()} />
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
