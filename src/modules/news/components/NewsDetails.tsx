import {PageHeader} from 'components/PageHeader'
import {RawContent} from 'components/RawContent'
import Button from 'material-ui/Button'
import {NotFound} from 'modules/pages/components/pageTypes/NotFound'
import {Player} from 'modules/players/components/Player'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Icon} from 'utils/Icon'
import {Image} from 'utils/Image'
import {LocalDate} from 'utils/LocalDate'
import {Block, NewsItem} from '../model'

type AllProps = StateToProps & RouteComponentProps<any>
class NewsDetailsDisplay extends React.PureComponent<AllProps, {}> {
    public constructor(props: AllProps) {
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    public render() {
        const {newsItem} = this.props

        if(!newsItem) {
            return (
                <NotFound
                    primary={'News item ' + this.props.match.params.newsId + ' not found'}
                    secondary="Go to the home page for the latest news"
                />
            )
        }

        return (
            <PageHeader
                primary={newsItem.title}
                secondary={<LocalDate at={newsItem.date} full />}
                image={newsItem.image}
                header={<React.Fragment>
                    <Button
                        variant="raised"
                        onClick={this.goBack}
                        style={{marginBottom: '1em', backgroundColor: 'white'}}
                    >
                        <Icon name="chevron-left" style={{marginRight: '1em'}} />
                        Back
                    </Button>
                </React.Fragment>}
            >
                <CardItem style={{maxWidth: 1000, minHeight: 300, alignSelf: 'center'}}>
                    <div style={{
                        color: '#777',
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '1em',
                    }}>
                        <Player player={{name: newsItem.author.name, game: 'minecraft'}}/>
                    </div>
                    <NewsBlocks blocks={newsItem.blocks} />
                </CardItem>
            </PageHeader>
        )
    }

    private goBack() {
        this.props.history.push({pathname: '/'})
    }

}

interface StateToProps {
    newsItem: NewsItem
}
export const NewsDetails = withRouter<RouteComponentProps<any>>(connect<StateToProps, {}, RouteComponentProps<any>, AppState>(
    (state, ownProps) => ({
        newsItem: state.newsItems.byId[state.newsItems.bySlug[ownProps.match.params.newsId]],
    }),
)(NewsDetailsDisplay))

function NewsBlocks({blocks}: {blocks: Block[]}) {
    return (
        <div>
            {!!blocks && blocks.map((block, index) => <NewsBlock key={index} block={block} />)}
        </div>
    )
}

function NewsBlock({block}: {block: Block}) {
    if(!block) {
        return null
    }
    switch(block.type) {
        case 'image_block':
            return (
                <div style={{
                    margin: '0 -1em 1em -1em',
                }}>
                    <Image image={block.image} ratio={16/9} />
                </div>
            )
        case 'text_block':
            return (
                <RawContent
                    content={block.text}
                    style={{
                        marginBottom: '1em',
                        maxWidth: '38em', // Keep line length readable
                    }}
                />
            )
        default:
            return null
    }
}
