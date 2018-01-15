import React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'

export const ServersMenuItemInfo = connect(
    (state: AppState) => ({
        players: state.players,
    }),
)(({players}) => {
    if(players) {
        const playerCount = Object.keys(players.minecraft) // ['survival', 'kitpvp']
            .map((serverKey) => players.minecraft[serverKey].length) // [5, 2]
            .reduce((prev, current) => prev + current, 0) // 7
            + Object.keys(players.ark) // [key]
            .map((serverKey) => players.ark[serverKey].length) // [5, 2]
            .reduce((prev, current) => prev + current, 0) // 7
        if(playerCount > 0) {
            return <span>{playerCount} player{playerCount>1 ? 's' : ''} online</span>
        }
    }
    return null
})
