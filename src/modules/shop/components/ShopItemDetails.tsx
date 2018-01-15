import {WebsiteFrame} from 'components/WebsiteFrame'
import * as React from 'react'
import {connect} from 'react-redux'
import {Redirect, RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {ShopItem} from '../model'

class ShopItemDetailsDisplay extends React.PureComponent<StateToProps & RouteComponentProps<any>, {}> {
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
export const ShopItemDetails = withRouter<any>(connect<StateToProps, {}, RouteComponentProps<any>, AppState>(
    (state, ownProps) => ({
        shopItem: state.shopLayout.itemsById[ownProps.match.params.shopItemId],
    }),
)(ShopItemDetailsDisplay))
