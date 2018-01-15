import {VoteSiteIds, VoteSites, VoteSitesState, VoteStatus} from 'modules/votesites/model'
import {get} from 'utils/utils'
import * as t from './actionTypes'

// Server data reducer
function byId(state: VoteSites = {}, action: t.VoteSitesAction): VoteSites {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const result: VoteSites = {...state}
            for(const rawVoteSite of action.data) {
                result[get(rawVoteSite, 'id')] = {
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
                .map((rawVoteSite) => ''+get(rawVoteSite, 'id'))
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
function voteStatus(state: VoteStatus = {}, voteSitesState: VoteSitesState, action: t.VoteSitesAction): VoteStatus {
    switch(action.type) {
        case t.UPDATE_STATUS:
            return action.status
        default:
            return state
    }
}

// Mix vote information into the sites
function addVoteInfoToSites(state: VoteSitesState, action: t.VoteSitesAction): VoteSites {
    switch(action.type) {
        case t.FETCH_SUCCESS:
        case t.UPDATE_STATUS:
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
                    result[voteSiteId].lastVoted = lastVoted

                    const cooldown = voteSite.cooldown*60*60*1000
                    result[voteSiteId].canVote = lastVoted < (now - cooldown)
                }
                return result
            }
            return state.byId
        default:
            return state.byId
    }
}

export function voteSites(state: VoteSitesState, action: t.VoteSitesAction): VoteSitesState {
    state = state || {}
    const result = {
        isFetching: isFetching(state.isFetching, action),
        byId: byId(state.byId, action),
        items: items(state.items, action),
        voteStatus: voteStatus(state.voteStatus, state, action),
    }
    result.byId = addVoteInfoToSites(result, action)
    return result
}
