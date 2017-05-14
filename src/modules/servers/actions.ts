import * as t from './actionTypes'
import {Dispatch} from 'react-redux'
import {AppState} from '../../reducer'

export function fetchServers() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().servers.isFetching) {
            return
        }

        dispatch({
            type: t.REQUEST,
        })

        return fetch('http://mc.go-craft.com/wordpress/wp-json/wp/v2/servers')
            .then((response) => response.json(), (error) => console.log('fetch failed:', error))
            .then((servers) => dispatch({type: t.REQUEST_SUCCESS, servers}), (error) => {
                console.log('using server fetch result failed:', error)
                dispatch({type: t.REQUEST_FAILURE})
            })
    }
}
