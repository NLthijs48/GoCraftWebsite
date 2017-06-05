import {RawContent} from 'components/RawContent'
import RaisedButton from 'material-ui/RaisedButton'
import React from 'react'
import {RouteComponentProps, withRouter} from 'react-router'
import {Icon} from 'utils/Icon'
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
            <div
                style={{
                    maxWidth: 1200,
                    margin: '0 auto',
                    padding: '1em',
                }}
            >
                <RaisedButton label="Back" icon={<Icon name="chevron-left" />} onTouchTap={this.goBack} />
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

    private goBack() {
        const pathParts = this.props.location.pathname.split('/')
        pathParts.pop()
        this.props.history.push({pathname: pathParts.join('/')})
    }
}

export const NewsItemDetails = withRouter<any>(NewsItemDetailsDisplay)
