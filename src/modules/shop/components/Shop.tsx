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
    private static shopOverview() {
        return <ShopOverview/>
    }

    private static shopDetails() {
        return <ShopItemDetails/>
    }

    public render() {
        const {shopLayout, basePath} = this.props

        if(!shopLayout.rootCategories.length) {
            return <Loading />
        }

        return (
            <Switch>
                <Route path={basePath+'/:shopItemId'} render={ShopDisplay.shopDetails}/>
                <Route render={ShopDisplay.shopOverview} />
            </Switch>
        )
    }
}

interface StateToProps {
    shopLayout: ShopLayoutState
}
export const Shop = withRouter<any>(connect<StateToProps, {}, ShopProps>(
    (state: AppState): StateToProps => ({
        shopLayout: state.shopLayout,
    }),
)(ShopDisplay))
