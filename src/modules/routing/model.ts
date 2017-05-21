// Information about a menu entry
import {RemoteState} from '../../types'
export interface MenuEntry {
    title: string
    order: number
    page: number
    children: MenuItems
}

export type MenuItems = string[]

// MenuData, MenuEntry's mapped by ID
export interface MenuData {
    [s: string]: MenuEntry
}

export interface MenuState extends RemoteState {
    byId: MenuData
    items: MenuItems
}

// All menu information
export interface Menus {
    [s: string]: MenuState
}

// Page
export interface Page {
    title: string
    // TODO detailed information
}

