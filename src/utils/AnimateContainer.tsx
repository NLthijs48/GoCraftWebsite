import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'

export class AnimateContainer extends React.Component<any, {}> {
    public render() {
        return (
            <TransitionGroup component="div" {...this.props}>
                {}
                {this.props.children}
            </TransitionGroup>
        )
    }
}
