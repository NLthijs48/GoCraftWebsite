import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {AppState} from 'reducer'
import {isLocalhost} from 'utils/utils'
import {WebsocketMessage} from 'websocket/model'

const USE_LOCAL_WEBSOCKET = false
let socketInstance: WebsocketInternal|undefined

interface Message {
    type: string
    [key: string]: any
}
export function sendMessage(message: Message) {
    if(!socketInstance) {
        console.log('[Websocket] sendMessage has no socketInstance!')
        return
    }
    socketInstance.send(message)
}

class WebsocketInternal extends React.PureComponent<DispatchToProps, {}> {

    private socket?: WebSocket
    // Scheduled reconnect timer
    private reconnectScheduled?: number
    // Time before attempting reconnect in seconds
    private reconnectTime: number
    // Indicate if connecting should be tried, same as mounted
    private shouldBeOpen?: boolean

    public constructor(props: DispatchToProps) {
        super(props)

        this.reconnectTime = 1
        this.connect = this.connect.bind(this)
        this.onOpen = this.onOpen.bind(this)
        this.onClose = this.onClose.bind(this)
        this.onError = this.onError.bind(this)
        this.onMessage = this.onMessage.bind(this)

        socketInstance = this
    }

    public componentDidMount() {
        console.log('[Websocket] mount -> start')
        this.shouldBeOpen = true
        this.connect()

        socketInstance = this
    }

    public componentWillUnmount() {
        console.log('[Websocket] unmount -> stop')
        if(socketInstance === this) {
            socketInstance = undefined
        }
        this.shouldBeOpen = false
        if(this.socket && this.socket.readyState === 1) {
            this.socket.close(1000, 'unmount')
        }
        if(this.reconnectScheduled) {
            clearTimeout(this.reconnectScheduled)
        }
    }

    public render() {
        return null
    }

    public send(message: Message) {
        if(!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            console.error('[Websocket] cannot send message, socket not open:', message)
            return
        }
        console.log('[Websocket] sending message:', message)
        this.socket.send(JSON.stringify(message))
    }

    private connect() {
        console.log('[Websocket] trying to connect')
        if(this.socket != null) {
            console.error('[Websocket] connect() called while there is still a socket!')
            return
        }
        this.socket = new WebSocket((USE_LOCAL_WEBSOCKET&&isLocalhost()) ? 'wss://localhost:9192' : 'wss://mc.go-craft.com:9192')
        this.socket.onopen = this.onOpen
        this.socket.onclose = this.onClose
        this.socket.onerror = this.onError
        this.socket.onmessage = this.onMessage
    }

    private onOpen() {
        console.log('[Websocket] opened')
        // Reset reconnect time
        this.reconnectTime = 1

        if(!this.socket) {
            console.error('[Websocket] onOpen called without this.socket!')
            return
        }
    }

    private onClose() {
        console.log('[Websocket] closed')
        this.socket = undefined
        if(this.shouldBeOpen) {
            // Schedule reconnect
            if(this.reconnectScheduled) {
                clearTimeout(this.reconnectScheduled)
            }
            this.reconnectScheduled = window.setTimeout(this.connect, this.reconnectTime*1000)
            this.reconnectTime = Math.min(isLocalhost() ? 10 : 60, this.reconnectTime * (1.5+Math.random()))
        }
    }

    private onError(error: any) {
        console.log('[Websocket] error', error, 'socket:', this.socket)
    }

    private onMessage(message: MessageEvent) {
        const response: WebsocketMessage = JSON.parse(message.data)
        if(!response) {
            console.error('received empty message or invalid json:', message)
            return
        }
        const responseType: string = response.type

        if(!responseType) {
            console.error('[Websocket] message has no type', response)
            return
        }

        // Handle message
        console.log('[Websocket] message', response)
        this.props.dispatch(response)
    }
}

interface DispatchToProps {
    dispatch: Dispatch<any>
}
export const Websocket = connect<{}, DispatchToProps, {}, AppState>(
    () => ({}),
    (dispatch) => ({
        dispatch,
    }),
)(WebsocketInternal)
