import Card from 'material-ui/Card/Card'
import * as React from 'react'
import {THEME} from 'types'

interface CardItemProps {
    children?: React.ReactNode
    style?: React.CSSProperties
}
export class CardItem extends React.Component<CardItemProps, {}> {
    public render() {
        const {children, style} = this.props
        return (
            <Card
                style={{
                    backgroundColor: '#FFF',
                    borderBottom: '0.3em solid ' + THEME.palette.primary.main,
                    padding: '1em',
                    marginBottom: '1em',
                    position: 'relative', // For fade out alignment
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    ...style as any,
                }}
            >
                {children}
            </Card>
        )
    }
}
