import * as React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'

function PageBackgroundDisplay({background}: StateToProps) {
    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            backgroundColor: '#EEE',
            backgroundImage: 'url('+background+')',
            backgroundPosition: '50% 50%',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.5,
        }}/>
    )
}

interface StateToProps {
    background?: string
}
export const PageBackground = connect<StateToProps, {}, {}, AppState>(
    (state) => ({
        background: state.options.background,
    }),
)(PageBackgroundDisplay)
