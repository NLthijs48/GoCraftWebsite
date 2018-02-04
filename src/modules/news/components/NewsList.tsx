import {NewsItemBlock} from 'modules/news/components/NewsItemBlock'
import {Loading} from 'modules/pages/components/Loading'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {CardList} from 'utils/CardList'
import {nameToPath} from 'utils/utils'
import {NewsItem, NewsItemsState} from '../model'

interface NewsListProps {
    basePath: string
}
type CombinedNewsListProps = NewsListProps & StateToProps & RouteComponentProps<any>
class NewsListDisplay extends React.PureComponent<CombinedNewsListProps, {}> {
    public render() {
        const {newsItems, basePath} = this.props

        if(newsItems.isFetching && (!newsItems.byId || !newsItems.items)) {
            return <Loading />
        }

        return (
            <Switch>
                {newsItems.items.map((newsItemKey) => {
                    const newsItem: NewsItem = newsItems.byId[newsItemKey]
                    const path = basePath+'/'+nameToPath(newsItem.slug)
                    return <Route key={path} path={path} render={getNewsItemDetailsFunction(newsItem)}/>
                })}
                <Route render={getServerOverviewFunction(this.props)}/>
            </Switch>
        )
    }
}

// Get a render function for the news overview
function getServerOverviewFunction({newsItems, basePath}: CombinedNewsListProps) {
    return () => {
        return (
            <CardList>
                <h2 style={{
                    color: '#222',
                    fontSize: '1.4em',
                    margin: '1em 0 0.5em 0',
                    textShadow: '0 0 2px rgba(255,255,255,0.3)',
                }}>
                    Latest news
                </h2>
                {newsItems.items.map((newsItemKey) => {
                    const newsItem: NewsItem = newsItems.byId[newsItemKey]
                    return (
                        <NewsItemBlock preview key={newsItem.slug} newsItem={newsItem} path={basePath}/>
                    )
                })}
            </CardList>
        )
    }
}

function getNewsItemDetailsFunction(newsItem: NewsItem) {
    return () => (
        <CardList>
            <NewsItemBlock newsItem={newsItem}/>
        </CardList>
    )
}

interface StateToProps {
    newsItems: NewsItemsState
}
export const NewsList = withRouter<NewsListProps & RouteComponentProps<any>>(connect<StateToProps, {}, NewsListProps, AppState>(
    (state) => ({
        newsItems: state.newsItems,
    }),
)(NewsListDisplay))
