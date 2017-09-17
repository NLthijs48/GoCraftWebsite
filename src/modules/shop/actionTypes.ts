import {OtherAction} from 'types'

// Got shop layout information
export const FETCH_SUCCESS = 'shopLayout/UPDATE'
interface FetchSuccess {
    type: 'shopLayout/UPDATE',
    shopLayout: {
        status: string,
        categories: object[],
        result: object[],
    },
}

export const FETCH_INFO_SUCCESS = 'shopLayout/INFO_UPDATE'
interface FetchInfoSuccess {
    type: 'shopLayout/INFO_UPDATE',
    data: object[],
}

// All server actions
export type ShopLayoutAction =
    FetchSuccess |
    FetchInfoSuccess |
    OtherAction
