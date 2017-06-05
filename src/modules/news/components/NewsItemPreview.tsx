import {RawContent} from 'components/RawContent'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {nameToPath} from 'utils/utils'
import {NewsItem} from '../model'

// TODO allow different detail and preview content
interface NewsItemPreviewProps {
    newsItem: NewsItem
    path: string
}
export class NewsItemPreview extends React.Component<NewsItemPreviewProps, {}> {
    public render() {
        const {newsItem, path} = this.props
        return (
            <NavLink
                to={path+'/'+nameToPath(newsItem.slug)}
                style={{
                    width: '100%',
                    padding: '0.5em 1em',
                    display: 'block',
                    marginBottom: '2em',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        maxWidth: 1200,
                        margin: '0 auto',
                    }}
                >
                    <div
                        style={{
                            width: '30%',
                            height: 'auto',
                            padding: '16% 0 0 0',
                            backgroundImage: 'url(' + newsItem.image + ')',
                            backgroundPosition: '50% 50%',
                            backgroundSize: 'cover',
                            marginRight: '1em',
                            borderLeft: '1em solid #34B067',
                        }}
                    />

                    <div
                        style={{
                            flex: 1,
                        }}
                    >
                        <h4>{newsItem.title}</h4>
                        <RawContent content={newsItem.content} />
                        <RaisedButton label="Details" primary />
                    </div>
                </div>
            </NavLink>
        )
    }
}
