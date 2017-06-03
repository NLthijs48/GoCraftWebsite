import {Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {getData} from 'utils'
import * as t from './actionTypes'

export function fetchServers() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().servers.isFetching) {
            return
        }

        dispatch({
            type: t.FETCH,
        })

        return getData('/wp/v2/servers?per_page=100')
            .then((data) => dispatch({type: t.FETCH_SUCCESS, data}))
            .catch(() => dispatch({type: t.FETCH_FAILURE}))
    }
}
