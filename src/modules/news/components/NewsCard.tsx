import {Player} from 'modules/players/components/Player'
import * as React from 'react'
import {CardItem} from 'utils/CardItem'
import {Image} from 'utils/Image'
import {ImageFooter} from 'utils/ImageFooter'
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

                    <ImageFooter>
                        <h2 className="ellipsis">
                            {newsItem.title}
                        </h2>
                        <LocalDate at={newsItem.date}/>
                    </ImageFooter>
                </Image>
            </Navigate>
        </CardItem>
    )
}
