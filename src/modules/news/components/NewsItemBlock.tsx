import {RawContent} from 'components/RawContent'
import Button from 'material-ui/Button'
import {Player} from 'modules/players/components/Player'
import * as React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {THEME} from 'types'
import {CardItem} from 'utils/CardItem'
import {Icon} from 'utils/Icon'
import {Image} from 'utils/Image'
import {LocalDate} from 'utils/LocalDate'
import {Navigate} from 'utils/Navigate'
import {nameToPath} from 'utils/utils'
import {Block, NewsItem} from '../model'

interface NewsItemBlockProps {
    newsItem: NewsItem
    preview?: boolean
    path?: string
}
type CombinedNewsItemBlockProps = NewsItemBlockProps & RouteComponentProps<any>
class NewsItemBlockDisplay extends React.PureComponent<CombinedNewsItemBlockProps, {}> {
    public constructor(props: CombinedNewsItemBlockProps) {
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    public render() {
        const {newsItem, path, preview} = this.props
        const details = preview ? path + '/' + nameToPath(newsItem.slug) : undefined
        return (
            <div>
                {!preview &&
                    <Button
                        variant="raised"
                        onClick={this.goBack}
                        style={{marginBottom: '1em', backgroundColor: 'white'}}
                    >
                        <Icon name="chevron-left" style={{marginRight: '1em'}} />
                        Back
                    </Button>
                }

                <CardItem>
                    <Navigate to={details} style={{
                        marginTop: '-0.25em',
                        marginBottom: 0,
                        lineHeight: '125%',
                        display: 'inline-block',
                        color: THEME.palette.primary.main,
                    }}>
                        <h2 style={{
                            lineHeight: '125%',
                        }}>
                            {newsItem.title}
                        </h2>
                    </Navigate>

                    <div style={{
                        color: '#777',
                        display: 'flex',
                        alignItems: 'center',
                        marginTop: '-0.3em',
                        marginBottom: '0.5em',
                    }}>
                        <LocalDate className="ellipsis" at={newsItem.date}/>
                    </div>

                    <NewsBlocks blocks={newsItem.blocks} details={details} />

                    <div style={{
                        color: '#777',
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Player player={{name: newsItem.author.name, game: 'minecraft'}}/>
                    </div>
                </CardItem>
            </div>
        )
    }

    private goBack() {
        this.props.history.push({pathname: '/'})
    }

}

export const NewsItemBlock = withRouter<NewsItemBlockProps & RouteComponentProps<any>>(NewsItemBlockDisplay)

function NewsBlocks({blocks, details}: {blocks: Block[], details?: string}) {
    return (
        <div>
            {!!blocks && blocks.map((block, index) => <NewsBlock key={index} details={details} block={block} />)}
        </div>
    )
}

function NewsBlock({block, details}: {block: Block, details?: string}) {
    if(!block) {
        return null
    }
    switch(block.type) {
        case 'image_block':
            return (
                <div style={{
                    margin: '0 -1em 1em -1em',
                }}>
                    <Navigate to={details}>
                        <Image image={block.image} ratio={16/9} />
                    </Navigate>
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
