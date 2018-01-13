import isClient from 'is-client'
import isRetina from 'is-retina'
import debounce from 'lodash.debounce'
import R from 'ramda'
import React, {Component} from 'react'
import ReactDOM from 'react-dom'

export class Source extends Component<{}, {}> {
    public render() {
        return null
    }
}

interface ImageResponsiveProps {
    src: string
    style?: React.CSSProperties
    transition?: boolean
    width?: string
    height?: string
    children: React.ReactChild[]
    type: 'image'
}
export class ImageResponsive extends Component<ImageResponsiveProps, {loaded: boolean, width: number|false, src: string|false}> {
    private isClient: boolean
    private isRetina: boolean
    private element: any

    constructor(props: ImageResponsiveProps) {
        super(props)
        // TODO apply defaults
        /*
        this.props = {
            src: '',
            style: {},
            type: 'image',
            transition: true,
        }
        */
        this.state = {
            width: false,
            loaded: true,
            src: false,
        }
        this.isClient = isClient()
        this.isRetina = isClient && isRetina()
        this.handleResize = debounce(this.handleResize, 300).bind(this)
        this.imageRef = this.imageRef.bind(this)
    }
    public componentWillMount() {
        this.setState({src: this.props.src})
    }
    public componentDidMount() {
        if (isClient) {
            this.handleResize()
            window.addEventListener('resize', this.handleResize)
            if (this.props.type === 'image' && this.props.transition) {
                ReactDOM.findDOMNode(this.refs.element).addEventListener('load', this.onLoad)
            }
        }
    }
    public componentWillUnmount() {
        this.setState({loaded: false})
        if (isClient) {
            window.removeEventListener('resize', this.handleResize)
        }
    }
    public componentWillReceiveProps(nextProps: ImageResponsiveProps) {
        if (this.props.src && nextProps.src !== this.props.src) {
            this.setState({src: this.pickOptimalSource((ReactDOM.findDOMNode(this.refs.element) as any).offsetWidth, nextProps)}, this.handleResize)
        }
    }

    public render() {
        let style = {} as any
        if (this.props.transition) {
            if (this.props.type === 'image') {
                style.transition = 'opacity .2s ease-in-out'
            }
        }
        if (this.props.type === 'image') {
            style.opacity = this.state.loaded ? 1 : 0
        } else if (this.props.type === 'background-image') {
            style.backgroundSize = '100% 100%'
            if (this.state.src) {
                style.backgroundImage = `url('${this.state.src}')`
            }
            if (this.props.width) {
                style.width = this.props.width
            }
            if (this.props.height) {
                style.height = this.props.height
            }
        }
        style = {...style, ...this.props.style}
        const filteredChildren = (this.props.children as any).filter(this.notSource)
        return <div ref={this.imageRef} {...this.props} style={style}>{filteredChildren}</div>
    }
    private imageRef(element: any) {
        this.element = element
    }
    private onLoad() {
        this.setState({loaded: true})
    }
    private handleResize() {
        this.setState({src: this.pickOptimalSource(ReactDOM.findDOMNode(this.refs.element).offsetWidth, this.props)})
    }
    private pickOptimalSource(width: number, props: ImageResponsiveProps) {
        const data = props.children.filter(this.isSource)

        const bestBiggerSource = R.head(R.sort((a, b) => a.props.maxWidth > b.props.maxWidth)(R.filter((a) => a.props.maxWidth >= width)(data)))
        const bestSmallerSource = R.head(R.sort((a, b) => a.props.maxWidth < b.props.maxWidth)(R.filter((a) => a.props.maxWidth <= width)(data)))

        const source = R.or(bestBiggerSource, bestSmallerSource)
        if (source) {
            return source.props.src
        }

        return this.props.src
    }
    private isSource(item: any) {
        return item.type && item.type.displayName && item.type.displayName === 'Source'
    }
    private notSource(item: any) {
        return !this.isSource(item)
    }
}
