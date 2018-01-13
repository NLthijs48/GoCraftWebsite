declare module 'is-retina'
declare module 'is-client'

// Webpack (module.hot), should be included in @types/webpack and @types/webpack-env, but does not work
declare var module: any

// React-measure typings
declare module 'react-measure' {
    import * as React from 'react'

    class Measure extends React.PureComponent<Measure.MeasureProps, {}> {
    }
    namespace Measure {

        interface ContentRect {
            client: {
                clientTop?: number
                clientLeft?: number
                clientWidth?: number
                clientHeight?: number,
            }
            offset: {
                offsetTop?: number
                offsetLeft?: number
                offsetWidth?: number
                offsetHeight?: number,
            }
            scroll: {
                scrollTop?: number
                scrollLeft?: number
                scrollWidth?: number
                scrollHeight?: number,
            }
            bounds: ClientRect
            margin: CSSStyleDeclaration
        }

        type MeasureChildren = React.ReactElement<any> | ((args: {measureRef: ()=>void, measure: ()=>void, contentRect: ContentRect}) => React.ReactElement<any>)

        interface MeasureProps {
            // Calculate certain values and put them in contentRect
            client?: boolean
            offset?: boolean
            scroll?: boolean
            bounds?: boolean
            margin?: boolean
            // No idea
            innerRef?: () => void
            // Called on resize
            onResize?: (contentRect: ContentRect) => void
            children?: MeasureChildren
        }
    }
    export = Measure

}
