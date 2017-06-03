import {DrawerState} from 'modules/drawer/model'
import * as t from './actionTypes'

export function drawer(state: DrawerState = {open: false, docked: false}, action: t.DrawerAction) {
    switch(action.type) {
        case t.DRAWER_UPDATE_OPEN:
            return {
                ...state,
                open: action.to,
            }
        case t.DRAWER_UPDATE_DOCKED:
            return {
                ...state,
                docked: action.to,
            }
        default:
            return state
    }
}
