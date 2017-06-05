import {Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchNewsItems() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().newsItems.isFetching) {
            return
        }

        dispatch({
            type: t.FETCH,
        })

        return getData('/wp/v2/news?per_page=10')
            .then((data) => dispatch({type: t.FETCH_SUCCESS, data}))
            .catch(() => dispatch({type: t.FETCH_FAILURE}))
    }
}
