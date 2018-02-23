import {SELECT_SITE, VoteSitesAction} from 'modules/voting/actionTypes'
import {VotingState} from 'modules/voting/model'
import {Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {getData} from 'utils/utils'
import * as t from './actionTypes'

export function fetchVoteSites() {
    return (dispatch: Dispatch<any>, getState: () => AppState) => {
        // Only fetch if not already fetching
        if(getState().voting.isFetching) {
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

export function selectSite(voteSiteId: string): VoteSitesAction {
    return {
        type: SELECT_SITE,
        site: voteSiteId,
    }
}

export const VOTE_INFO_KEY = '__info'
export function getVoteSiteOrder(voteSites: VotingState, withInfo: boolean = false): string[] {
    const result: string[] = []

    // Selected first
    const selectedIndex = voteSites.items.findIndex((voteSiteId) => voteSiteId===voteSites.selected)
    if(voteSites.selected && (withInfo || voteSites.selected !== VOTE_INFO_KEY)) {
        result.push(voteSites.selected)
    }
    // Can vote after selected
    result.push(...voteSites.items.filter((voteSiteID, index) => index>selectedIndex && voteSites.byId[voteSiteID].canVote))
    // Can vote before selected
    result.push(...voteSites.items.filter((voteSiteID, index) => index<selectedIndex && voteSites.byId[voteSiteID].canVote))
    // Info page
    if(withInfo && voteSites.selected !== VOTE_INFO_KEY) {
        result.push(VOTE_INFO_KEY)
    }
    // Cannot vote sites
    result.push(...voteSites.items.filter((voteSiteID) => !voteSites.byId[voteSiteID].canVote))

    return result
}
