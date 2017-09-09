import {SliderFeature} from 'modules/servers/model'
import * as React from 'react'
import {CardItem} from 'utils/CardItem'

interface SliderFeatureProps {
    feature: SliderFeature
}
export class SliderFeatureCard extends React.Component<SliderFeatureProps, {}> {
    public render() {
        const {feature} = this.props
        return (
            <CardItem
                style={{padding: 0}}
            >
                <div style={{
                    width: '100%',
                    padding: '56% 0 0 0',
                    // backgroundImage: 'url(' + feature.slides + ')',
                    backgroundColor: '#888',
                    backgroundPosition: '50% 50%',
                    backgroundSize: 'cover',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        background: 'rgba(0,0,0,0.5)',
                        color: '#FFF',
                        padding: '1em',
                        display: 'flex',
                    }}>
                        <div style={{
                            fontSize: '1.25em',
                        }}>
                            {feature.header}
                        </div>
                    </div>
                </div>
            </CardItem>
        )
    }
}
