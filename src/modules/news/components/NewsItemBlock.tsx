import {RawContent} from 'components/RawContent'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import {ContentRect} from 'react-measure'
import {RouteComponentProps, withRouter} from 'react-router'
import {THEME} from 'types'
import {CardItem} from 'utils/CardItem'
import {Icon} from 'utils/Icon'
import {LocalDate} from 'utils/LocalDate'
import {Navigator} from 'utils/Navigator'
import {Responsive} from 'utils/Responsive'
import {nameToPath} from 'utils/utils'
import {NewsItem} from '../model'

interface NewsItemBlockProps {
    newsItem: NewsItem
    preview: boolean
    path?: string
}
type CombinedNewsItemBlockProps = NewsItemBlockProps & RouteComponentProps<any>
export class NewsItemBlockDisplay extends React.PureComponent<CombinedNewsItemBlockProps, {vertical: boolean}> {
    public constructor(props: CombinedNewsItemBlockProps) {
        super(props)
        this.state = {vertical: false}
        this.goBack = this.goBack.bind(this)
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {newsItem, path, preview} = this.props
        const {vertical} = this.state
        const details = preview ? path + '/' + nameToPath(newsItem.slug) : undefined
        return (
            <div>
                {!preview &&
                    <RaisedButton
                        label="Back"
                        icon={<Icon name="chevron-left"/>}
                        onTouchTap={this.goBack}
                        style={{marginBottom: '1em'}}
                    />
                }

                <CardItem style={{
                    minHeight: '11em',
                }}>
                    <Responsive
                        onResize={this.onResize}
                        style={{
                            display: 'flex',
                            flexDirection: vertical ? 'column' : 'row',
                        }}
                    >
                        <div style={{
                            flex: 1,
                            maxWidth: '28em',
                            minWidth: 0,
                            marginRight: vertical ? 0 : '1em',
                            zIndex: 1, // Put above absolute fade out shadow
                        }}>
                            {vertical && <NewsTitle title={newsItem.title} to={details} />}

                            <Navigator to={details} style={{
                                display: 'block',
                                width: '100%',
                                height: '0',
                                padding: '56% 0 0 0', // 16:9 aspect ratio
                                backgroundImage: 'url(' + newsItem.image + ')',
                                backgroundPosition: '50% 50%',
                                backgroundSize: 'cover',
                            }}/>

                            <div style={{
                                color: '#777',
                                marginBottom: vertical ? '1em' : 0,
                            }}>
                                <NewsInfo>
                                    {newsItem.author.avatar &&
                                    <div style={{
                                        background: 'url(' + newsItem.author.avatar + ')',
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
                                </NewsInfo>

                                <NewsInfo>
                                    <Icon name="calendar-o" size="1.5em" style={{
                                        marginRight: '0.5rem',
                                        width: '1.5rem',
                                    }}/>
                                    <LocalDate className="ellipsis" at={newsItem.date}/>
                                </NewsInfo>
                            </div>
                        </div>

                        <div style={{
                            flex: 2,
                            maxWidth: '45em',
                            minWidth: 0,
                            position: 'relative', // For content and button alignment
                        }}>
                            {!vertical && <NewsTitle title={newsItem.title} to={details} />}

                            <div style={{minHeight: '7em'}}>
                                <RawContent
                                    content={newsItem.content}
                                    style={{
                                        position: preview ? 'absolute' : 'static', // As preview we don't want it to expand the parent container
                                    }}
                                />
                            </div>

                            {preview && // Details button
                                <Navigator to={details} style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                }}>
                                    <RaisedButton label="Details" primary/>
                                </Navigator>
                            }

                            {preview && // Shadow to fade out content
                                <div style={{
                                    position: 'absolute',
                                    height: 0,
                                    bottom: 0,
                                    right: '-4em',
                                    left: '-4em',
                                    boxShadow: '0 0 4em 4em white',
                                }}/>
                            }
                        </div>
                    </Responsive>
                </CardItem>
            </div>
        )
    }

    private onResize(contentRect: ContentRect) {
        this.setState({vertical: contentRect.bounds.width < 500})
    }

    private goBack() {
        const pathParts = this.props.location.pathname.split('/')
        pathParts.pop()
        this.props.history.push({pathname: pathParts.join('/')})
    }

}

export const NewsItemBlock = withRouter<any>(NewsItemBlockDisplay)

function NewsTitle({title, to}: {title: string, to?: string}) {
    return (
        <Navigator to={to} style={{
            marginTop: '-0.25em',
            marginBottom: '0.25em',
            lineHeight: '125%',
            display: 'inline-block',
            color: THEME.palette.primary1Color,
        }}>
            <h2 style={{
                lineHeight: '125%',
            }}>
                {title}
            </h2>
        </Navigator>
    )
}

function NewsInfo({children}: { children: React.ReactNode }) {
    return (
        <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginTop: '0.5em',
            marginRight: '1.5em',
            verticalAlign: 'top',
        }}>
            {children}
        </div>
    )
}