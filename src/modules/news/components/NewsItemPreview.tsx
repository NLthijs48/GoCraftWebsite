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
        const detailsPath = path + '/' + nameToPath(newsItem.slug)
        return (
            <div style={{
                width: '100%',
                padding: '0.5em 1em',
                display: 'block',
                marginBottom: '1rem',
            }}>
                <div style={{
                    display: 'flex',
                    maxWidth: '55rem',
                    minHeight: '11rem',
                    overflow: 'hidden',
                    margin: '0 auto',
                    backgroundColor: '#FFF',
                    borderBottom: '0.5rem solid #34B067',
                    padding: '1rem',
                    position: 'relative', // For fade out alignment
                }}>
                    <div style={{
                        width: '30%',
                        marginRight: '1rem',
                        zIndex: 1, // Put above absolute fade out shadow
                    }}>
                        <NavLink to={detailsPath} style={{
                            display: 'block',
                            width: '100%',
                            height: '0',
                            padding: '56% 0 0 0', // 16:9 aspect ratio
                            backgroundImage: 'url(' + newsItem.image + ')',
                            backgroundPosition: '50% 50%',
                            backgroundSize: 'cover',
                        }} />
                    </div>

                    <div style={{
                        flex: 1,
                        position: 'relative', // For content and button alignment
                    }}>
                        <NavLink to={detailsPath} style={{
                            lineHeight: '100%',
                            marginBottom: '0.5rem',
                            display: 'inline-block',
                        }}>
                            <h2>{newsItem.title}</h2>
                        </NavLink>

                        <RawContent content={newsItem.content} style={{
                            position: 'absolute', // It should not make the container bigger
                        }}/>

                        <NavLink to={detailsPath} style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                        }}>
                            <RaisedButton label="Details" primary />
                        </NavLink>

                        <div style={{
                            position: 'absolute',
                            height: 0,
                            bottom: 0,
                            right: '-3rem',
                            left: '-3rem',
                            boxShadow: '0 0 4rem 2rem white',
                        }} />
                    </div>
                </div>
            </div>
        )
    }
}
