import {RemoteState} from 'types'

// Information about a menu entry
export interface MenuEntry {
    title: string
    order: number
    page: number
    children: MenuItems
}

export type MenuItems = string[]

// Menu, MenuEntry's mapped by ID
export interface Menu {
    [s: string]: MenuEntry
}

export interface MenuState extends RemoteState {
    byId: Menu
    items: MenuItems
}

// All menu information
export interface Menus {
    [s: string]: MenuState
}
