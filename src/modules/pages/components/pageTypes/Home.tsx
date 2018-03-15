import {AbsoluteScroller} from 'components/AbsoluteScroller'
import {NewsDetails} from 'modules/news/components/NewsDetails'
import {Loading} from 'modules/pages/components/Loading'
import {HomeContent} from 'modules/pages/components/pageTypes/HomeContent'
import {NotFound} from 'modules/pages/components/pageTypes/NotFound'
import {Page} from 'modules/pages/model'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Fade} from 'utils/Fade'

interface HomeProps {
    basePath: string
    page: Page
}
class HomeDisplay extends React.Component<HomeProps & StateToProps & RouteComponentProps<any>, {}> {

    public render() {
        const {basePath} = this.props

        if(!this.props.page.header) {
            return <Loading />
        }

        return (
            <Fade id={this.props.location.pathname.split('/')[2] || 'base'}>
                <AbsoluteScroller>
                    <Switch location={this.props.location}>
                        <Route path={basePath+'/:newsId'} render={this.newsDetails}/>
                        <Route path={basePath+'/'} exact render={this.home}/>
                        <Route path="/" exact render={this.home}/>
                        <Route component={NotFound}/>
                    </Switch>
                </AbsoluteScroller>
            </Fade>
        )
    }

    private newsDetails = () => {
        return <NewsDetails />
    }

    private home = () => {
        return <HomeContent page={this.props.page} basePath={this.props.basePath} />
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
