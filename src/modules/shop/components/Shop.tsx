import {Loading} from 'modules/pages/components/Loading'
import {ShopItemDetails} from 'modules/shop/components/ShopItemDetails'
import {ShopOverview} from 'modules/shop/components/ShopOverview'
import * as React from 'react'
import {connect} from 'react-redux'
import {Route, RouteComponentProps, Switch, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {ShopLayoutState} from '../model'

interface ShopProps {
    basePath: string
}
type CombinedServersDisplayProps = ShopProps & StateToProps & RouteComponentProps<any>
class ShopDisplay extends React.PureComponent<CombinedServersDisplayProps, {}> {
    public render() {
        const {shopLayout, basePath} = this.props

        if(!shopLayout.rootCategories.length) {
            return <Loading />
        }

        return (
            <Switch>
                <Route path={basePath+'/:shopItemId'} render={this.shopDetails}/>
                <Route render={this.shopOverview} />
            </Switch>
        )
    }

    private shopOverview() {
        return <ShopOverview/>
    }

    private shopDetails() {
        return <ShopItemDetails/>
    }
}

interface StateToProps {
    shopLayout: ShopLayoutState
}
export const Shop = withRouter<ShopProps & RouteComponentProps<any>>(connect<StateToProps, {}, ShopProps, AppState>(
    (state) => ({
        shopLayout: state.shopLayout,
    }),
)(ShopDisplay))
