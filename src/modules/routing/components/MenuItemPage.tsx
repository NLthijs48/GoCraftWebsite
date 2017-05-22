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
        switch(page.type) {
            case 'home':
                return <Home />
            case 'html':
                return <HTML page={page} />
            case 'maps':
                return <Maps />
            case 'frame':
                return <Embedded page={page} />
            default:
                console.error('unknown page type:', page, 'menu item:', item)
                return <NotFound />
        }
    }
}

interface StateToProps {
    pages: PagesState
}
export const MenuItemPage = connect<StateToProps, {}, MenuItemPageProps>(
    (state: AppState): StateToProps => ({
        pages: state.pages,
    }),
)(MenuItemPageDisplay)
