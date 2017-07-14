import Card from 'material-ui/Card/Card'
import * as React from 'react'
import {THEME} from 'types'

interface CardItemProps {
    children?: React.ReactNode
    style?: React.CSSProperties
    containerStyle?: React.CSSProperties
}
export class CardItem extends React.Component<CardItemProps, {}> {
    public constructor(props: CardItemProps) {
        super(props)
    }

    public render() {
        const {children, style, containerStyle} = this.props
        return (
            <Card
                style={{
                    backgroundColor: '#FFF',
                    borderBottom: '0.5em solid ' + THEME.palette.primary1Color,
                    padding: '1em',
                    marginBottom: '1em',
                    position: 'relative', // For fade out alignment
                    ...style,
                }}
                containerStyle={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    ...containerStyle,
                }}
            >
                {children}
            </Card>
        )
    }
}