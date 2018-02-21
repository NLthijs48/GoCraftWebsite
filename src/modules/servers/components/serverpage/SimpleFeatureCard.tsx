import {SimpleFeature} from 'modules/servers/model'
import * as React from 'react'
import {THEME} from 'types'
import {CardItem} from 'utils/CardItem'

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
                <div style={{
                    padding: '1em',
                    width: '100%',
                }}>
                    <h2 style={{
                        fontSize: '1.3em',
                        marginBottom: 0,
                    }}>
                        {feature.title}
                    </h2>

                    {!!feature.description &&
                        <div style={{
                            marginTop: '0.5em',
                        }}>
                            {feature.description}
                        </div>
                    }
                </div>

                <img
                    src={feature.image}
                    style={{
                        width: '100%',
                        backgroundColor: '#888',
                        position: 'relative',
                        borderTop: '0.2em solid ' + THEME.palette.primary.main,
                    }}
                />
            </CardItem>
        )
    }
}
