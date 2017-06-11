import {NewsList} from 'modules/news/components/NewsList'
import React from 'react'

interface HomeProps {
    basePath: string
}
export class Home extends React.PureComponent<HomeProps, {}> {
    public render() {
        return (
            <div>
                <NewsList basePath={this.props.basePath} />
            </div>
        )
    }
}
