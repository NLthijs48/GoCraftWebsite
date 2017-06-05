import {RawContent} from 'components/RawContent'
import React from 'react'
import {NewsItem} from '../model'

interface NewsItemDetailsProps {
    newsItem: NewsItem
}
export class NewsItemDetails extends React.Component<NewsItemDetailsProps, {}> {
    public render() {
        const newsItem = this.props.newsItem
        return (
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '1em',
                }}
            >
                <h1>{newsItem.title}</h1>
                <div style={{display: 'flex'}}>
                    <div
                        style={{
                            width: '30%',
                            height: '30%',
                            padding: '16% 0 0 0',
                            backgroundImage: 'url(' + newsItem.image + ')',
                            backgroundPosition: '50% 50%',
                            backgroundSize: 'cover',
                            marginRight: '1em',
                            borderLeft: '1em solid #34B067',
                            flexShrink: 0,
                        }}
                    />

                    <div
                        style={{
                            flex: 1,
                        }}
                    >
                        <RawContent content={newsItem.content} />
                    </div>
                </div>
            </div>
        )
    }
}
