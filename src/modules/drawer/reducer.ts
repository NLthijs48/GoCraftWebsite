import {DrawerState} from 'modules/drawer/model'
import * as t from './actionTypes'

export function drawer(state: DrawerState = {open: false, docked: false}, action: t.DrawerAction): DrawerState {
    switch(action.type) {
        case t.DRAWER_UPDATE_OPEN:
            return {
                ...state,
                open: action.to,
            }
        default:
            return state
    }
}
