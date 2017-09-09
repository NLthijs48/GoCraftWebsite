import {SimpleFeatureCard} from 'modules/servers/components/serverpage/SimpleFeatureCard'
import {SliderFeatureCard} from 'modules/servers/components/serverpage/SliderFeatureCard'
import {Feature} from 'modules/servers/model'
import * as React from 'react'

interface FeatureCardsProps {
    features: Feature[]
}
export class FeatureCardList extends React.Component<FeatureCardsProps, {}> {
    public render() {
        const {features} = this.props
        return (
            <div>
                {features.map((feature, index) => {
                    switch(feature.type) {
                        case 'simple_feature':
                            return <SimpleFeatureCard key={index} feature={feature}/>
                        case 'slider_feature':
                            return <SliderFeatureCard key={index} feature={feature}/>
                    }
                })}
            </div>
        )
    }
}
