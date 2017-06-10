import {RawContent} from 'components/RawContent'
import Card from 'material-ui/Card/Card'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {goCraftTheme} from 'types'
import {Icon} from 'utils/Icon'
import {LocalDate} from 'utils/LocalDate'
import {NewsItem} from '../model'

interface NewsItemDetailsProps {
    newsItem: NewsItem
}
type CombinedNewsItemDetailsProps = NewsItemDetailsProps & RouteComponentProps<any>
export class NewsItemDetailsDisplay extends React.Component<CombinedNewsItemDetailsProps, {}> {
    public constructor(props: CombinedNewsItemDetailsProps) {
        super(props)
        this.goBack = this.goBack.bind(this)
    }

    public render() {
        const newsItem = this.props.newsItem
        return (
            <div style={{
                width: '100%',
                padding: '1em 1em 0 1em',
                display: 'block',
                maxWidth: '75em',
                margin: '0 auto',
            }}>
                <RaisedButton
                    label="Back"
                    icon={<Icon name="chevron-left"/>}
                    onTouchTap={this.goBack}
                    style={{marginBottom: '1em'}}
                />

                <Card
                    style={{
                        minHeight: '11em',

                        overflow: 'hidden',
                        margin: '0 auto',
                        backgroundColor: '#FFF',
                        borderBottom: '0.5em solid ' + goCraftTheme.palette.primary1Color,
                        padding: '1em',
                        position: 'relative', // For fade out alignment
                    }}
                    containerStyle={{
                        display: 'flex',
                        width: '100%',
                    }}
                >
                    <div style={{
                        flex: 1,
                        maxWidth: '28em',
                        minWidth: 0,
                        marginRight: '1em',
                        zIndex: 1, // Put above absolute fade out shadow
                    }}>
                        <div style={{
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
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '0.5em',
                            }}>
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
                                <LocalDate className="ellipsis" at={newsItem.date}/>
                            </div>
                        </div>
                    </div>

                    <div style={{
                        flex: 2,
                        maxWidth: '45em',
                        minWidth: 0,
                        position: 'relative', // For content and button alignment
                    }}>
                        <h2 style={{
                            marginTop: '-0.25em',
                            marginBottom: '0.25em',
                            lineHeight: '125%',
                            display: 'inline-block',
                            color: goCraftTheme.palette.primary1Color,
                        }}>
                            {newsItem.title}
                        </h2>

                        <RawContent content={newsItem.content} />
                    </div>
                </Card>
            </div>
        )
    }

    private goBack() {
        const pathParts = this.props.location.pathname.split('/')
        pathParts.pop()
        this.props.history.push({pathname: pathParts.join('/')})
    }
}

export const NewsItemDetails = withRouter<any>(NewsItemDetailsDisplay)
