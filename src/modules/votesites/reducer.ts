import {VoteSiteIds, VoteSites, VoteSitesState} from 'modules/votesites/model'
import {combineReducers} from 'redux'
import {get} from 'utils/utils'
import * as t from './actionTypes'

// Server data reducer
function byId(state: VoteSites = {}, action: t.VoteSitesAction): VoteSites {
    switch(action.type) {
        case t.FETCH_SUCCESS:
            // Get the properties we need from the WordPress byId
            const voteSites: VoteSites = {...state}
            for(const rawVoteSite of action.data) {
                voteSites[get(rawVoteSite, 'id')] = {
                    name: get(rawVoteSite, 'title', 'rendered'),
                    vote_url: get(rawVoteSite, 'acf', 'vote_url'),
                    identifier: get(rawVoteSite, 'acf', 'identifier'),
                }
            }
            return voteSites
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
                .map((rawVoteSite) => get(rawVoteSite, 'id'))
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

export const voteSites = combineReducers<VoteSitesState>({byId, items, isFetching})
