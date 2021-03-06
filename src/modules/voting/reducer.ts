import {getVoteSiteOrder, VOTE_INFO_KEY} from 'modules/voting/actions'
import {VoteRankings, VoteSiteIds, VoteSites, VoteStatus, VotingState} from 'modules/voting/model'
import {get} from 'utils/utils'
import * as t from './actionTypes'

// Server data reducer
function byId(state: VoteSites = {}, action: t.VoteSitesAction): VoteSites {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const result: VoteSites = {}
            for(const rawVoteSite of action.data) {
                const id = get(rawVoteSite, 'id') + ''
                result[id] = {
                    id,
                    name: get(rawVoteSite, 'title', 'rendered'),
                    vote_url: get(rawVoteSite, 'acf', 'vote_url'),
                    identifiers: get(rawVoteSite, 'acf', 'identifier').split(/, ?/),
                    cooldown: (+get(rawVoteSite, 'acf', 'cooldown')) || 0,
                }
            }
            return result
        default:
            return state
    }
}

// Build array of vote sites
function items(state: VoteSiteIds = [], action: t.VoteSitesAction): VoteSiteIds {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            return action.data
                .sort((a, b) => get(a, 'menu_order')-get(b, 'menu_order'))
                .map((rawVoteSite) => ''+get(rawVoteSite, 'id') + '')
        default:
            return state
    }
}

// Fetching state reducer
function isFetching(state: boolean = false, action: t.VoteSitesAction): boolean {
    switch(action.type) {
        case t.FETCH:
            return true
        case t.FETCH_SUCCESS:
        case t.FETCH_FAILURE:
            return false
        default:
            return state
    }
}

// Vote status of the user
function voteStatus(state: VoteStatus = {}, action: t.VoteSitesAction): VoteStatus {
    switch(action.type) {
        case t.STATUS_UPDATE:
            return action.status
        default:
            return state
    }
}

// Mix vote information into the sites
function addVoteInfoToSites(state: VotingState, action: t.VoteSitesAction): VoteSites {
    switch(action.type) {
        case t.FETCH_SUCCESS:
        case t.STATUS_UPDATE:
            if(state.byId && state.voteStatus) {
                const result = {...state.byId}
                const now = (new Date()).getTime()
                for(const voteSiteId of state.items) {
                    const voteSite = state.byId[voteSiteId]
                    let lastVoted = 0
                    for(const identifier of voteSite.identifiers) {
                        const siteStatus = state.voteStatus[identifier]
                        if(siteStatus) {
                            lastVoted = Math.max(lastVoted, siteStatus.lastVoted)
                        }
                    }
                    const cooldown = voteSite.cooldown*60*60*1000
                    const canVote = lastVoted < (now - cooldown)
                    result[voteSiteId] = {
                        ...result[voteSiteId],
                        lastVoted,
                        canVote,
                    }
                }
                return result
            }
            return state.byId
        default:
            return state.byId
    }
}

// Selected voting tab
export function canVoteCount(state: VotingState) {
    return state.items.filter((voteSiteId) => state.byId[voteSiteId].canVote).length
}
function selected(prev: VotingState, state: VotingState, action: t.VoteSitesAction): string {
    switch(action.type) {
        case t.SELECT_SITE:
            return action.site
        case t.STATUS_UPDATE:
            // If a site has been marked as voted, switch to next tab
            const order = getVoteSiteOrder(state, true)
            const canVoteCurrent = canVoteCount(prev)
            const canVoteNew = canVoteCount(state)
            if(canVoteNew < canVoteCurrent) {
                return order[1]
            } else {
                return order[0]
            }
        default:
            return state.selected || VOTE_INFO_KEY
    }
}

// Handle vote rankings
export function rankingKey(year: number, month: number): string {
    return year + '-' + (month < 10 ? '0' : '') + month
}
function rankings(state: VoteRankings = {}, action: t.VoteSitesAction) {
    switch(action.type) {
        case t.TOP_UPDATE:
            const ranking = action.ranking
            const key = rankingKey(ranking.year, ranking.month)
            // TODO merge entries? (need map, and range?)
            return {
                ...state,
                [key]: ranking,
            }
        case t.FETCH_TOP:
            const k = rankingKey(action.year, action.month)
            return {
                ...state,
                [k]: {...state[k], isFetching: true},
            }
        default:
            return state
    }
}

export function voting(currentState: VotingState|void, action: t.VoteSitesAction): VotingState {
    const state: VotingState = (currentState || {}) as VotingState
    const result = {
        isFetching: isFetching(state.isFetching, action),
        byId: byId(state.byId, action),
        items: items(state.items, action),
        voteStatus: voteStatus(state.voteStatus, action),
        selected: state.selected,
        rankings: rankings(state.rankings, action),
    }
    result.byId = addVoteInfoToSites(result, action)
    result.selected = selected(state, result, action)
    // Detect changes
    for(const k in result) {
        if((state as any)[k] !== (result as any)[k]) {
            return result
        }
    }
    return state
}
