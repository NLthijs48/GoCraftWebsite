import React from 'react'
import {EmbeddedPage} from '../model'
import {Loading} from './Loading'

interface EmbeddedProps {
    page: EmbeddedPage
}
interface EmbeddedState {
    loading: boolean
}
export class Embedded extends React.PureComponent<EmbeddedProps, EmbeddedState> {

    public constructor(props: EmbeddedProps) {
        super(props)
        this.state = {loading: true}
        this.onLoad = this.onLoad.bind(this, this.onLoad)
    }

    public render() {
        const {page} = this.props
        return (
            <div style={{position: 'absolute', top: 0, right: 0, bottom: 0, left: 0}}>
                {this.state.loading && <Loading />}
                <iframe
                    style={{
                        display: 'flex',
                        width: '100%',
                        height: '100%',
                        border: '0 none',
                    }}
                    src={page.url}
                    onLoad={this.onLoad}
                />
            </div>
        )
    }

    private onLoad() {
        this.setState({loading: false})
    }

}
