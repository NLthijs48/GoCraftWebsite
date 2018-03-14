import {PageHeader} from 'components/PageHeader'
import {NewsList} from 'modules/news/components/NewsList'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {MinecraftCopyButton} from 'modules/servers/components/join/MinecraftCopyButton'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'

interface HomeProps {
    basePath: string
    page: Page
}
class HomeDisplay extends React.Component<HomeProps & StateToProps & RouteComponentProps<any>, {}> {

    public render() {
        if(!this.props.page.header) {
            return <Loading />
        }

        return (
            <PageHeader
                contentOnly={this.props.location.pathname !== '/'}
                primary={this.props.page.header.primary}
                secondary={this.props.page.header.secondary}
                image={this.props.page.header.image}
                header={<MinecraftCopyButton />}
            >
                <NewsList basePath={this.props.basePath} />
            </PageHeader>
        )
    }
}

interface StateToProps {
    background?: string
}
export const Home = withRouter<HomeProps & RouteComponentProps<any>>(connect<StateToProps, {}, {}, AppState>(
    (state) => ({
        background: state.options.background,
    }),
)(HomeDisplay))
