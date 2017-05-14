// Deep get a value from an object
import {AppState} from './reducer'
import {Dispatch} from 'react-redux'
import {RemoteState} from './types'
export function get(data: any, ...paths: string[]): any {
    let path = paths.shift()
    while(path) {
        if(typeof data !== 'object') {
            return undefined
        }
        data = data[path]
        path = paths.shift()
    }
    return data
}

/*
const wordPressAPI = 'http://mc.go-craft.com/wordpress/wp-json/wp/v2/'
interface GetData {
    path: string
    subState: (state: AppState) => RemoteState
}
export function getData({path, subState}: GetData) {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(subState(getState()).isFetching) {
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
*/
