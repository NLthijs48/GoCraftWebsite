import {WebsiteFrame} from 'components/WebsiteFrame'
import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect, RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {ShopItem} from '../model'

export class ShopItemDetailsDisplay extends React.PureComponent<StateToProps & RouteComponentProps<any>, {}> {
    public render() {
        const {shopItem} = this.props

        if(!shopItem) {
            const pathParts = this.props.location.pathname.split('/')
            pathParts.pop()
            return <Redirect to={pathParts.join('/')} />
        }

        return <WebsiteFrame src={shopItem.buyUrl} />
    }
}

interface StateToProps {
    shopItem: ShopItem
}
export const ShopItemDetails = withRouter<any>(connect<StateToProps, {}, {}>(
    (state: AppState, props: RouteComponentProps<any>): StateToProps => ({
        shopItem: state.shopLayout.itemsById[props.match.params.shopItemId],
    }),
)(ShopItemDetailsDisplay))
