import {Dispatch} from 'react-redux'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchArkPlayers() {
    return (dispatch: Dispatch<any>) => {
        dispatch({
            type: t.FETCH_ARK,
        })

        return getData('http://api.go-craft.com/ARK/server-info.php')
            .then((data) => dispatch({type: t.FETCH_ARK_SUCCESS, data}))
            .catch(() => dispatch({type: t.FETCH_ARK_FAILURE}))
    }
}
