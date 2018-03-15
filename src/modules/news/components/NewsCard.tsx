import {Player} from 'modules/players/components/Player'
import * as React from 'react'
import {CardItem} from 'utils/CardItem'
import {Image} from 'utils/Image'
import {LocalDate} from 'utils/LocalDate'
import {Navigate} from 'utils/Navigate'
import {nameToPath} from 'utils/utils'
import {NewsItem} from '../model'

interface Props {
    newsItem: NewsItem
    basePath: string
    style?: React.CSSProperties
    ratio?: number
}
export function NewsCard({newsItem, basePath, style, ratio}: Props) {
    return (
        <CardItem style={{
            padding: 0,
            margin: 0,
            height: 'auto',
            ...style,
        }}>
            <Navigate
                to={basePath+'/'+nameToPath(newsItem.slug)}
                style={{
                    width: '100%',
                    height: '100%',
                    color: 'inherit',
                    flex: 1,
                    textDecoration: 'none',
                }}
            >
                <Image image={newsItem.image} ratio={ratio || 16/9} maxWidth={800}>
                    {false && <Player player={{name: newsItem.author.name}} />}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        background: 'rgba(0,0,0,0.5)',
                        color: '#FFF',
                        padding: '1em',
                    }}>
                        <h2 style={{marginBottom: 0}} className="ellipsis">
                            {newsItem.title}
                        </h2>
                        <LocalDate at={newsItem.date}/>
                    </div>
                </Image>
            </Navigate>
        </CardItem>
    )
}
