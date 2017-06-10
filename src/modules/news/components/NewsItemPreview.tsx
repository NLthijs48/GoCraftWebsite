import {RawContent} from 'components/RawContent'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import {NavLink} from 'react-router-dom'
import {goCraftTheme, ThemeProps} from 'types'
import {Icon} from 'utils/Icon'
import {LocalDate} from 'utils/LocalDate'
import {nameToPath} from 'utils/utils'
import {NewsItem} from '../model'

// TODO allow different detail and preview content
interface NewsItemPreviewProps {
    newsItem: NewsItem
    path: string
}
export class NewsItemPreview extends React.Component<NewsItemPreviewProps & ThemeProps, {}> {
    public render() {
        const {newsItem, path} = this.props
        const detailsPath = path + '/' + nameToPath(newsItem.slug)
        return (
            <div style={{
                width: '100%',
                padding: '1em 1em 0 1em',
                display: 'block',
            }}>
                <Paper zDepth={1} style={{
                    display: 'flex',
                    minHeight: '11em',
                    maxWidth: '75em',
                    overflow: 'hidden',
                    margin: '0 auto',
                    backgroundColor: '#FFF',
                    borderBottom: '0.5em solid '+goCraftTheme.palette.primary1Color,
                    padding: '1em',
                    position: 'relative', // For fade out alignment
                }}>
                    <div style={{
                        flex: 1,
                        maxWidth: '28em',
                        minWidth: 0,
                        marginRight: '1em',
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

                        <div style={{
                            color: '#777',
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.5em',
                            }}>
                                {newsItem.author.avatar &&
                                    <div style={{
                                        background: 'url('+newsItem.author.avatar+')',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        width: '1.5em',
                                        height: '1.5em',
                                        marginRight: '0.5em',
                                    }}/>
                                }

                                <div className="ellipsis" style={{
                                    flex: 1,
                                }}>
                                    {newsItem.author.name}
                                </div>
                            </div>

                            <div style={{
                                display: 'flex',
                                marginTop: '0.5em',
                                alignItems: 'center',
                            }}>
                                <Icon name="calendar-o" size="1.5em" style={{
                                    marginRight: '0.5rem',
                                    width: '1.5rem',
                                }}/>
                                <LocalDate className="ellipsis" at={newsItem.date} />
                            </div>
                        </div>
                    </div>

                    <div style={{
                        flex: 2,
                        maxWidth: '45em',
                        minWidth: 0,
                        position: 'relative', // For content and button alignment
                    }}>
                        <NavLink to={detailsPath} style={{
                            marginTop: '-0.25em',
                            marginBottom: '-0.25em',
                            lineHeight: '125%',
                            display: 'inline-block',
                        }}>
                            <h2 style={{
                                lineHeight: '125%',
                            }}>
                                {newsItem.title}
                            </h2>
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
                            right: '-3em',
                            left: '-3em',
                            boxShadow: '0 0 4em 2em white',
                        }} />
                    </div>
                </Paper>
            </div>
        )
    }
}
