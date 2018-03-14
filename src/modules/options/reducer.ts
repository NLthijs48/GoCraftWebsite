import {OptionsState} from 'modules/options/model'
import {get} from 'utils/utils'
import * as t from './actionTypes'

// Server data reducer
export function options(state: OptionsState = {}, action: t.OptionsActions): OptionsState {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            return {
                background: get(action.data, 'acf', 'background', 'url'),
            }
        default:
            return state
    }
}
