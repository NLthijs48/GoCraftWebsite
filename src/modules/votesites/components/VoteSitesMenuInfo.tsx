import React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'

export const VoteSitesMenuInfo = connect(
    (state: AppState) => ({
        voteSites: state.voteSites,
    }),
)(({voteSites}) => {
    const canVote = voteSites.items.filter((voteSiteID) => voteSites.byId[voteSiteID].canVote).length
    if(canVote > 0) {
        return <span>Vote now on {canVote} sites!</span>
    } else {
        return <span>Already voted on all sites</span>
    }
})
