import {NewsList} from 'modules/news/components/NewsList'
import * as React from 'react'

interface HomeProps {
    basePath: string
}
export class Home extends React.PureComponent<HomeProps, {}> {
    public render() {
        return (
            <div style={{marginTop: '1em'}}>
                <NewsList basePath={this.props.basePath} />
            </div>
        )
    }
}
