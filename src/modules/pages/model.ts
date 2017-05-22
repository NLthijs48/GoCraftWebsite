import {RemoteState} from '../../types'

// Information about a page
export type Page =
    HomePage |
    MapsPage |
    HTMLPage |
    EmbeddedPage
export interface HomePage {
    type: 'home',
}
export interface MapsPage {
    type: 'maps',
}
export interface HTMLPage {
    type: 'html'
    content: string
}
export interface EmbeddedPage {
    type: 'frame'
    url: string
}

// ID -> Page
export interface Pages {
    [k: string]: Page
}

export interface PagesState extends RemoteState {
    byId: Pages
}
