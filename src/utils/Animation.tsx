import {TweenLite} from 'gsap'
import React from 'react'

export interface AnimateTo extends React.CSSProperties {
    onComplete?: () => void
}
export interface AnimateFromTo {
    from: React.CSSProperties
    to: AnimateTo
    time?: number
}
type CalculateAnimateFromTo = (element: HTMLDivElement | null) => AnimateFromTo
export interface AnimateProps {
    enter?: AnimateFromTo | CalculateAnimateFromTo
    leave?: AnimateFromTo | CalculateAnimateFromTo
    appear?: AnimateFromTo | CalculateAnimateFromTo

    style?: React.CSSProperties
    className?: string
}

export class Animate extends React.PureComponent<AnimateProps, {}> {
    private containerE: HTMLDivElement|null

    // Animation at initial render of AnimateContainer
    public componentWillAppear(done: () => void) {
        this.doAnimation(this.props.appear, done)
    }

    // Animation when Animate item gets added later
    public componentWillEnter(done: () => void) {
        this.doAnimation(this.props.enter, done)
    }

    // Animation when Animate items gets removed (but AnimateContainer stays)
    public componentWillLeave(done: () => void) {
        this.doAnimation(this.props.leave, done)
    }

    public render() {
        return (
            <div style={this.props.style} className={this.props.className} ref={(c) => this.containerE = c}>
                {this.props.children}
            </div>
        )
    }

    private doAnimation(rawFromTo: AnimateFromTo | CalculateAnimateFromTo | undefined, done: () => void): void {
        const fromTo: AnimateFromTo | undefined = (
            typeof rawFromTo === 'function' ? rawFromTo(this.containerE) : rawFromTo
        )

        if(!fromTo) {
            done()
            return
        }
        fromTo.to = fromTo.to || {}
        fromTo.from = fromTo.from || {}

        // Add onComplete
        if(fromTo.to.onComplete) {
            const onCompleteRef = fromTo.to.onComplete
            fromTo.to.onComplete = () => {
                onCompleteRef()
                done()
            }
        } else {
            fromTo.to.onComplete = done
        }

        TweenLite.fromTo(this.containerE, fromTo.time || 0.2, fromTo.from, fromTo.to)
    }
}
