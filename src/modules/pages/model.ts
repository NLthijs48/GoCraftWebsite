import {RemoteState} from 'types'
import {ImageInfo} from 'utils/Image'

// Information about a page
export type Page =
    HomePage |
    MapsPage |
    HTMLPage |
    EmbeddedPage |
    ServersPage |
    VoteSitesPage |
    ShopPage
interface AbstractPage {
    id: string
    title: string
    status: 'publish'
    urlPath?: string
    menuIcon?: string
    children: string[]
    adminOnly?: boolean
    header: {
        primary?: string
        secondary?: string
        image?: ImageInfo,
    }
}
export interface HomePage extends AbstractPage {
    type: 'home',
}
export interface MapsPage extends AbstractPage {
    type: 'maps',
}
export interface HTMLPage extends AbstractPage {
    type: 'html'
    content: string
}
export interface EmbeddedPage extends AbstractPage {
    type: 'frame'
    url: string
    embedNewTab?: boolean
}
export interface ServersPage extends AbstractPage {
    type: 'servers'
}
export interface VoteSitesPage extends AbstractPage {
    type: 'vote-sites'
}
export interface ShopPage extends AbstractPage {
    type: 'shop'
}

// ID -> Page
export interface Pages {
    [k: string]: Page
}

export type PageItems = string[]

export interface PagesState extends RemoteState {
    byId: Pages
    rootItems: PageItems
}
