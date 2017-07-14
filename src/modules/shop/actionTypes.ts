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

// All server actions
export type ShopLayoutAction =
    FetchSuccess |
    OtherAction
