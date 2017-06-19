import {Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchVoteSites() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().voteSites.isFetching) {
            return
        }

        dispatch({
            type: t.FETCH,
        })

        // _embed for author and comment data
        return getData('/wp/v2/vote-sites?per_page=100')
            .then((data) => dispatch({type: t.FETCH_SUCCESS, data}))
            .catch(() => dispatch({type: t.FETCH_FAILURE}))
    }
}
