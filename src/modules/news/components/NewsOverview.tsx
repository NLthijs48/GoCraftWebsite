import GridList, {GridListTile} from 'material-ui/GridList'
import {NewsCard} from 'modules/news/components/NewsCard'
import {Loading} from 'modules/pages/components/Loading'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Responsive} from 'utils/Responsive'
import {NewsItem, NewsItemsState} from '../model'

interface Props {
    basePath: string
}
type AllProps = Props & StateToProps & RouteComponentProps<any>
class NewsDisplay extends React.PureComponent<AllProps, {columns: number}> {

    public constructor(props: AllProps) {
        super(props)
        this.state = {columns: 1}
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {newsItems, basePath} = this.props

        if(newsItems.isFetching && (!newsItems.byId || !newsItems.items)) {
            return <Loading />
        }

        const newsEntries = newsItems.items.map((newsItemId) => newsItems.byId[newsItemId])
        const pairsUntil = Math.max(0, (this.state.columns-2)) * 2 + 1
        const pairs = newsEntries
            .slice(1, pairsUntil)
            .reduce((result: NewsItem[][], value, index) => {
                if(index % 2 === 0) {
                    result.push([value])
                } else {
                    result[result.length-1].push(value)
                }
                return result
            }, [])
        const itemCount = newsEntries.length

        // Render first: 2x2
        // Render pairs in 1x2: to fill first row
        // Render rest as 1x1

        const maxSize = Math.min(this.state.columns, 2)
        return (
            <Responsive onResize={this.onResize} style={{padding: '0 1em'}}>
                {!this.state.columns ? null :
                    <GridList cellHeight="auto" spacing={16} cols={this.state.columns}>
                        {itemCount > 0 && <GridListTile key="first" cols={maxSize} rows={maxSize}>
                            <NewsCard newsItem={newsEntries[0]} basePath={basePath} ratio={16/9-0.04} />
                        </GridListTile>}

                        {itemCount > 1 && pairs.map((pair, index) => <GridListTile key={'pair:'+index} cols={1} rows={maxSize}>
                            <NewsCard key={0} newsItem={pair[0]} basePath={basePath} />
                            {pair.length > 1 && <NewsCard key={1} style={{marginTop: '1em'}} newsItem={pair[1]} basePath={basePath} />}
                        </GridListTile>)}

                        {newsEntries.slice(pairsUntil).map((newsItem) => <GridListTile key={newsItem.slug} cols={1} rows={1}>
                            <NewsCard newsItem={newsItem} basePath={basePath}/>
                        </GridListTile>)}
                    </GridList>
                }
            </Responsive>
        )
    }

    private onResize(contentRect: ContentRect) {
        this.setState({columns: Math.max(1, Math.floor(contentRect.bounds.width/400))})
    }
}

interface StateToProps {
    newsItems: NewsItemsState
}
export const NewsOverview = withRouter<Props & RouteComponentProps<any>>(connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        newsItems: state.newsItems,
    }),
)(NewsDisplay))
