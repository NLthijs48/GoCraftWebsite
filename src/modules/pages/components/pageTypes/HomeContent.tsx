import {PageHeader} from 'components/PageHeader'
import {NewsOverview} from 'modules/news/components/NewsOverview'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {MinecraftCopyButton} from 'modules/servers/components/join/MinecraftCopyButton'
import {ServersListRow} from 'modules/servers/components/ServersListRow'
import * as React from 'react'
import {Filler} from 'utils/Filler'

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
                header={<React.Fragment>
                    <MinecraftCopyButton />
                    <Filler />
                    {false && <div style={{
                        width: '100%',
                        marginTop: '3em',
                        textAlign: 'left',
                    }}>
                        <h2 style={{
                            fontSize: '150%',
                            marginBottom: 0,
                        }}>
                            Servers
                        </h2>
                    </div>}
                    <ServersListRow style={{marginTop: '3em'}} />
                </React.Fragment>}
                contentStyle={{
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <div style={{
                    paddingLeft: '1em',
                    marginBottom: '0.5em',
                }}>
                    <h2 style={{
                        marginBottom: 0,
                    }}>
                        News
                    </h2>
                </div>
                <NewsOverview basePath={this.props.basePath} />
            </PageHeader>
        )
    }
}
