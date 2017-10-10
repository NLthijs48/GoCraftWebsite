import {Loading} from 'modules/pages/components/Loading'
import * as React from 'react'

interface EmbeddedProps {
    src: string|undefined
}
interface EmbeddedState {
    loading: boolean
}
export class WebsiteFrame extends React.PureComponent<EmbeddedProps, EmbeddedState> {

    public constructor(props: EmbeddedProps) {
        super(props)
        this.state = {loading: true}
        this.onLoad = this.onLoad.bind(this, this.onLoad)
    }

    public render() {
        const {src} = this.props
        return (
            <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
                {this.state.loading && <Loading size={80} />}
                {src &&
                <iframe
                    sandbox="allow-scripts allow-forms allow-pointer-lock allow-same-origin allow-presentation"
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        border: '0 none',
                    }}
                    src={src}
                    onLoad={this.onLoad}
                />
                }
            </div>
        )
    }

    private onLoad() {
        this.setState({loading: false})
    }

}
