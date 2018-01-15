import {OtherAction} from 'types'

export const DRAWER_UPDATE_OPEN = 'drawer/UPDATE_OPEN'
export interface DrawerUpdateOpen {
    type: 'drawer/UPDATE_OPEN'
    to: boolean
    reason?: string
}

// All drawer actions
export type DrawerAction =
    DrawerUpdateOpen |
    OtherAction
