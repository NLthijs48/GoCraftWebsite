import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import * as React from 'react'
import {connect} from 'react-redux'
import {RouteComponentProps, withRouter} from 'react-router'
import {AppState} from 'reducer'
import {THEME} from 'types'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {Image} from 'utils/Image'
import {ImageFooter} from 'utils/ImageFooter'
import {Navigate} from 'utils/Navigate'
import {ShopItem} from '../model'

interface ShopItemProps {
    id: string
}
class ShopItemCardDisplay extends React.PureComponent<ShopItemProps & StateToProps & RouteComponentProps<any>, {}> {
    public render() {
        const {shopItem} = this.props

        return (
            <CardItem style={{
                height: '100%',
                padding: 0,
            }}>
                <Image image={shopItem.image} ratio={1}>
                    <ImageFooter style={{display: 'flex'}}>
                        <h2>{shopItem.name}</h2>
                        <Filler/>
                        <h2>€{shopItem.price}</h2>
                    </ImageFooter>
                </Image>

                {!!shopItem.perks &&
                    <List>
                        {shopItem.perks.map((perk, index) => (
                            <ListItem key={index} style={{
                                fontSize: perk.sub ? '90%' : undefined,
                                paddingLeft: perk.sub ? '3.1em' : '1em',
                                paddingTop: perk.sub ? '0.05em' : '0.15em',
                                paddingBottom: perk.sub ? 0 : (shopItem.perks.length>(index+1) && shopItem.perks[index + 1].sub ? 0 : '0.15em'),
                                alignItems: 'flex-start',
                            }}>
                                <Icon name="check" color={THEME.palette.primary.main} style={{marginRight: '0.75em', marginTop: '0.2em'}} />
                                <div style={{display: 'flex', flexDirection: 'column'}}>
                                    <div style={{flex: 1}}>
                                        {perk.text}
                                    </div>
                                    {perk.servers.length >= 1 && <div style={{
                                        fontSize: '80%',
                                        color: '#777',
                                    }}>
                                        Only on {perk.servers.join(', ')}
                                    </div>}
                                </div>
                            </ListItem>
                        ))}
                    </List>
                }

                <Filler />

                <div style={{
                    marginTop: '-0.6em', // Reduce the room between tagline and actions
                    padding: '0 1em 1em 1em',
                    minHeight: 42,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Navigate
                        to={
                            (shopItem.buyUrl||'').replace('http://', 'https://')
                            /* '/shop/'+id Paying in embedded website does not work */
                        }
                        style={{
                            width: '100%',
                        }}
                    >
                        <Button variant="raised" color="primary" style={{width: '100%'}}>
                            Buy now
                            <Icon name="shopping-cart" style={{marginLeft: '1em'}}/>
                        </Button>
                    </Navigate>
                </div>
            </CardItem>
        )
    }
}

interface StateToProps {
    shopItem: ShopItem
}
export const ShopItemCard = withRouter<ShopItemProps & RouteComponentProps<any>>(connect<StateToProps, {}, ShopItemProps, AppState>(
    (state, ownProps) => ({
        shopItem: state.shopLayout.itemsById[ownProps.id],
    }),
)(ShopItemCardDisplay))
