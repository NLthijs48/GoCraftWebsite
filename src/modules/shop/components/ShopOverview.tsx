import {PageHeader} from 'components/PageHeader'
import {Loading} from 'modules/pages/components/Loading'
import {Page} from 'modules/pages/model'
import {ShopItemCard} from 'modules/shop/components/ShopItemCard'
import {ShopLayoutState} from 'modules/shop/model'
import * as React from 'react'
import {ContentRect} from 'react-measure'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {Responsive} from 'utils/Responsive'

interface Props {
    page: Page
}
class ShopOverviewDisplay extends React.PureComponent<Props & StateToProps, {columns: number}> {

    public constructor(props: Props & StateToProps) {
        super(props)
        this.state = {columns: 1}
        this.onResize = this.onResize.bind(this)
    }

    public render() {
        const {page, shopLayout} = this.props
        const {columns} = this.state

        if(!page.header) {
            return <Loading/>
        }

        return (
            <PageHeader
                primary={page.header.primary}
                secondary={page.header.secondary}
                image={page.header.image}
                contentStyle={{
                    paddingLeft: 0,
                    paddingRight: 0,
                }}
            >
                <Responsive onResize={this.onResize}>
                    {shopLayout.rootCategories.map((categoryId, categoryIndex) => {
                        const shopCategory = shopLayout.categoriesById[categoryId]
                        const maxWidth = 100 / columns + '%'
                        // [row][column]
                        const renderLayout: number[][] = []

                        // Place items on the grid
                        for(let i = 0; i < shopCategory.items.length; i++) {
                            // Calcuate the position this server should have
                            const rowIndex = Math.floor(i / columns)
                            const columnIndex = i % columns
                            // Get the row
                            const row = renderLayout[rowIndex] || []
                            // Assign the server
                            row[columnIndex] = shopCategory.items[i]
                            // Place row back
                            renderLayout[rowIndex] = row
                        }

                        return (
                            <div key={categoryId} style={{
                                marginBottom: '1.5em',
                            }}>
                                {categoryIndex>0 && <div style={{ // Hide header of first category, rendered on top of hero image
                                    padding: '0 1em',
                                }}>
                                    <h2 style={{
                                        color: '#222',
                                        fontSize: '1.4em',
                                        margin: 0,
                                        textShadow: '0 0 2px rgba(255,255,255,0.3)',
                                    }}>
                                        {shopCategory.name}
                                    </h2>
                                </div>}

                                {renderLayout.map((rowShopItems, rowIndex) => (
                                    <div key={rowIndex} style={{
                                        display: 'flex',
                                        padding: '0 0.5em',
                                        // justifyContent: 'center', // Align in the middle?
                                    }}>
                                        {rowShopItems.map((shopItemId, columnIndex) => (
                                            <div key={columnIndex} style={{
                                                maxWidth,
                                                padding: '0.5em',
                                                flex: 1,
                                            }}>
                                                <ShopItemCard id={shopItemId} />
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        )
                    })}
                </Responsive>
            </PageHeader>
        )
    }

    private onResize(contentRect: ContentRect) {
        this.setState({columns: Math.max(1, Math.floor(contentRect.bounds.width/400))})
    }
}

interface StateToProps {
    shopLayout: ShopLayoutState
}
// TODO get rid of 'as any' (component needs to be stateless...), maybe remove resize stuff and use <GridList>
export const ShopOverview = withRouter<Props & RouteComponentProps<any>>((connect<StateToProps, {}, Props, AppState>(
    (state) => ({
        shopLayout: state.shopLayout,
    }),
) as any)(ShopOverviewDisplay))
