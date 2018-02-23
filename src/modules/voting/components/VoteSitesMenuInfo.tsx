import {canVoteCount} from 'modules/voting/reducer'
import React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'

export const VoteSitesMenuInfo = connect(
    (state: AppState) => ({
        voting: state.voting,
    }),
)(({voting}) => {
    const canVote = canVoteCount(voting)
    if(canVote > 0) {
        return <span>Vote now on {canVote} site{canVote>1 ? 's' : ''}!</span>
    } else {
        return <span>Voted on all sites</span>
    }
})
