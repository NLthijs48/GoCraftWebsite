import Card from 'material-ui/Card/Card'
import React from 'react'
import {THEME} from 'types'

interface CardItemProps {
    children?: React.ReactNode
    style?: React.CSSProperties
}
export class CardItem extends React.Component<CardItemProps, {}> {
    public constructor(props: CardItemProps) {
        super(props)
    }

    public render() {
        const {children, style} = this.props
        return (
            <Card
                style={{
                    minHeight: '11em',
                    overflow: 'hidden',
                    backgroundColor: '#FFF',
                    borderBottom: '0.5em solid ' + THEME.palette.primary1Color,
                    padding: '1em',
                    marginBottom: '1em',
                    position: 'relative', // For fade out alignment
                    ...style,
                }}
                containerStyle={{
                    display: 'flex',
                    width: '100%',
                }}
            >
                {children}
            </Card>
        )
    }
}
