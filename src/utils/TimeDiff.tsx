import * as React from 'react'
import Timer = NodeJS.Timer

interface TimeDiffProps {
    time: number|string // Milliseconds or Date string
    allowFuture?: boolean
}

export class TimeDiff extends React.PureComponent<TimeDiffProps, {}> {
    private timer: Timer

    public componentWillUnmount() {
        clearTimeout(this.timer)
    }

    public render() {
        const {time, allowFuture} = this.props
        let date: Date
        if(typeof time === 'string') {
            date = new Date(time)
        } else {
            date = new Date()
            date.setTime(time)
        }

        let diff = ((new Date()).getTime() - date.getTime()) * .001
        if (!allowFuture && diff < 0) {
            diff = 0
        }
        let text = 'just now'
        let update = 5
        if (diff > 3600*50) {
            text = Math.round(diff/(3600*24)) + 'd ago'
            update = 12*3600
        } else if (diff > 3600) {
            text = Math.round(diff/3600) + 'h ago'
            update = 20*60
        } else if (diff > 30) {
            text = Math.round(diff/60) + 'm ago'
            update = 20
        }

        // Set timer to automaticlly update the text
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
            this.forceUpdate()
        }, update * 1000)
        return <span>{text}</span>
    }
}
