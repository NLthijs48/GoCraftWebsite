import {PageHeader} from 'components/PageHeader'
import {NewsOverview} from 'modules/news/components/NewsOverview'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {MinecraftCopyButton} from 'modules/servers/components/join/MinecraftCopyButton'
import * as React from 'react'

interface Props {
    basePath: string
    page: Page
}
export class HomeContent extends React.PureComponent<Props, {}> {
    public render() {
        if(!this.props.page.header) {
            return <Loading />
        }

        return (
            <PageHeader
                primary={this.props.page.header.primary}
                secondary={this.props.page.header.secondary}
                image={this.props.page.header.image}
                header={<MinecraftCopyButton />}
                contentStyle={{
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <NewsOverview basePath={this.props.basePath} />
            </PageHeader>
        )
    }
}
