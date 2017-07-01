import * as React from 'react'
import {connect} from 'react-redux'
import {AppState} from 'reducer'

// TODO use a pretty loading indicator and animation
export function PageBackgroundDisplay({background}: StateToProps) {
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
        }}>
            <div style={{
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
            }}>
                <img
                    src={background}
                    style={{
                        width: '100%',
                        height: 'auto',
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    backgroundImage: 'linear-gradient(to bottom, rgba(238,238,238,0) 0%,rgba(238,238,238,0) 70%,rgba(238,238,238,1) 100%)',
                    backgroundPosition: '50% 0',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                }} />
            </div>
        </div>
    )
}

interface StateToProps {
    background?: string
}
export const PageBackground = connect<StateToProps, {}, {}>(
    (state: AppState): StateToProps => ({
        background: state.options.background,
    }),
)(PageBackgroundDisplay)
