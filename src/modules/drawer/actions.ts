import * as t from './actionTypes'

export function updateDrawerOpen(to: boolean, reason?: string): t.DrawerUpdateOpen {
    return {
        type: 'drawer/UPDATE_OPEN',
        to,
        reason,
    }
}

export function updateDrawerDocked(to: boolean): t.DrawerUpdateDocked {
    return {
        type: 'drawer/UPDATE_DOCKED',
        to,
    }
}
