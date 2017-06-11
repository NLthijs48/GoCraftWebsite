import React from 'react'
import Measure, {ContentRect} from 'react-measure'

interface ResponsiveProps extends React.HTMLProps<HTMLDivElement> {
    children?: React.ReactNode
    onResize?: (contentRect: ContentRect) => void
}
export class Responsive extends React.PureComponent<ResponsiveProps, {}> {
    public render() {
        const {children, onResize, style, ...otherProps} = this.props
        return (
            <Measure bounds onResize={onResize}>
                {({measureRef}) => <div
                    {...otherProps}
                    ref={measureRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        ...style,
                    }}
                >
                    {children}
                </div>}
            </Measure>
        )
    }
}
