import {OtherAction} from 'types'

export const DRAWER_UPDATE_OPEN = 'drawer/UPDATE_OPEN'
export interface DrawerUpdateOpen {
    type: 'drawer/UPDATE_OPEN'
    to: boolean
    reason?: string
}

export const DRAWER_UPDATE_DOCKED = 'drawer/UPDATE_DOCKED'
export interface DrawerUpdateDocked {
    type: 'drawer/UPDATE_DOCKED'
    to: boolean
}

// All drawer actions
export type DrawerAction =
    DrawerUpdateOpen |
    DrawerUpdateDocked |
    OtherAction
