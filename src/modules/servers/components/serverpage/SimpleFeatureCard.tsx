import {SimpleFeature} from 'modules/servers/model'
import * as React from 'react'
import {CardItem} from 'utils/CardItem'
import {Image} from 'utils/Image'
import {ImageFooter} from 'utils/ImageFooter'

interface SimpleFeatureProps {
    feature: SimpleFeature
}
export class SimpleFeatureCard extends React.Component<SimpleFeatureProps, {}> {
    public render() {
        const {feature} = this.props
        return (
            <CardItem style={{
                padding: 0,
                marginBottom: '1em',
            }}>
                <Image image={feature.image} maxWidth={1200}>
                    <ImageFooter>
                        <h2>
                            {feature.title}
                        </h2>
                    </ImageFooter>
                </Image>

                {!!feature.description && <div style={{
                    padding: '1em',
                    width: '100%',
                }}>
                    {feature.description}
                </div>}
            </CardItem>
        )
    }
}
