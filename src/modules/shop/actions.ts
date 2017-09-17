import {Dispatch} from 'react-redux'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchShopInfo() {
    return (dispatch: Dispatch<any>) => {
        return getData('/wp/v2/shop-items?per_page=100')
            .then((data) => dispatch({type: t.FETCH_INFO_SUCCESS, data}))
    }
}
