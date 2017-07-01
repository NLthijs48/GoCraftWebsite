import * as React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'

export class AnimateContainer extends React.PureComponent<any, {}> {
    public render() {
        return (
            <TransitionGroup component="div" {...this.props}>
                {}
                {this.props.children}
            </TransitionGroup>
        )
    }
}
