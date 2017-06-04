import {Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchMenu(name: string) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().menus && getState().menus[name] && getState().menus[name].isFetching) {
            return
        }

        dispatch({
            type: t.FETCH,
            name,
        })

        return getData('/wp-api-menus/v2/menu-locations/'+name)
            .then((data) => dispatch({type: t.FETCH_SUCCESS, data, name}))
            .catch(() => dispatch({type: t.FETCH_FAILURE, name}))
    }
}
