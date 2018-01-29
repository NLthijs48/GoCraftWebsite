import {RemoteState} from 'types'

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
    title: string
    status: 'publish'
    urlPath?: string
    menuIcon?: string
    children: number[]
    adminOnly?: boolean
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
    [k: number]: Page
}

export type PageItems = number[]

export interface PagesState extends RemoteState {
    byId: Pages
    rootItems: PageItems
}
