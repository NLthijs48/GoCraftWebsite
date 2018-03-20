import Raven from 'raven-js'
import * as React from 'react'

interface Props {
    primary?: string
    secondary?: string
}
export class NotFound extends React.PureComponent<Props, {}> {

    public componentDidMount() {
        Raven.captureMessage('Page not found', {extra: {primary: this.props.primary, secondary: this.props.secondary}})
    }

    public render() {
        return (
            <div style={{textAlign: 'center', padding: '1em'}}>
                <h1 style={{
                    color: '#555',
                    marginTop: '30px',
                }}>
                    {this.props.primary || 'Page not found'}
                </h1>

                <h2 style={{
                    marginTop: '15px',
                    color: '#999',
                }}>
                    {this.props.secondary || 'Try going to another page using the menu'}
                </h2>
            </div>
        )
    }
}
