import * as t from './actionTypes'
import {Dispatch} from 'react-redux'
import {AppState} from '../../reducer'
import {getData} from '../../utils'

export function fetchServers() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().servers.isFetching) {
            return
        }

        dispatch({
            type: t.FETCH,
        })

        return getData('/servers')
            .then((data) => dispatch({type: t.FETCH_SUCCESS, data}))
            .catch(() => dispatch({type: t.FETCH_FAILURE}))
    }
}
