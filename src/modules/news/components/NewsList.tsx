import {NewsItemDetails} from 'modules/news/components/NewsItemDetails'
import {NewsItemPreview} from 'modules/news/components/NewsItemPreview'
import {Loading} from 'modules/pages/components/Loading'
import React from 'react'
import {connect} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {nameToPath} from 'utils/utils'
import {NewsItem, NewsItemsState} from '../model'

interface NewsListProps {
    basePath: string
}
type CombinedNewsListProps = NewsListProps & StateToProps & RouteComponentProps<any>
class NewsListDisplay extends React.Component<CombinedNewsListProps, {}> {
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
            <div>
                {newsItems.items.map((newsItemKey) => {
                    const newsItem: NewsItem = newsItems.byId[newsItemKey]
                    return (
                        <NewsItemPreview key={newsItem.slug} newsItem={newsItem} path={basePath}/>
                    )
                })}
            </div>
        )
    }
}

function getNewsItemDetailsFunction(newsItem: NewsItem) {
    return () => <NewsItemDetails newsItem={newsItem}/>
}

interface StateToProps {
    newsItems: NewsItemsState
}
export const NewsList = withRouter<any>(connect<StateToProps, {}, NewsListProps>(
    (state: AppState): StateToProps => ({
        newsItems: state.newsItems,
    }),
)(NewsListDisplay))
