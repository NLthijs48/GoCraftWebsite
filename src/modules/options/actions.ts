import {Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchOptions() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // _embed for author and comment data
        return getData('/acf/v3/options/background')
            .then((data) => dispatch({type: t.FETCH_SUCCESS, data}))
            .catch(() => dispatch({type: t.FETCH_FAILURE}))
    }
}
