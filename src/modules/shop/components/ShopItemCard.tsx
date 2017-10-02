import RaisedButton from 'material-ui/RaisedButton'
import * as React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {NavLink} from 'react-router-dom'
import {AppState} from 'reducer'
import {CardItem} from 'utils/CardItem'
import {Filler} from 'utils/Filler'
import {Icon} from 'utils/Icon'
import {ShopItem} from '../model'

interface ShopItemProps {
    id: number
    basePath: string
}
export class ShopItemCardDisplay extends React.PureComponent<ShopItemProps & StateToProps, {}> {
    public render() {
        const {shopItem, id} = this.props

        return (
            <CardItem style={{
                height: '100%',
                padding: 0,
            }}>
                <div style={{
                    width: '100%',
                    padding: '100% 0 0 0',
                    backgroundImage: shopItem.image ? 'url('+shopItem.image+')' : '',
                    backgroundColor: '#888',
                    backgroundPosition: '50% 50%',
                    backgroundSize: 'cover',
                    position: 'relative',
                }}>
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        left: 0,
                        background: 'rgba(0,0,0,0.5)',
                        color: '#FFF',
                        padding: '1em',
                        display: 'flex',
                    }}>
                        <div style={{
                            fontSize: '1.25em',
                        }}>
                            {shopItem.name}
                        </div>

                        <Filler/>

                        <div style={{
                            fontSize: '1.25em',
                        }}>
                            €{shopItem.price}
                        </div>
                    </div>
                </div>

                <ul style={{
                    margin: '1em 0 0 0',
                    padding: '0 2em',
                    listStyleType: 'circle',
                }}>
                    {shopItem.perks.map((perk, index) => (
                        <li key={index} style={{
                            margin: 0,
                            marginLeft: perk.sub ? '1.5em' : 0,
                            padding: 0,
                        }}>
                            <div style={{flex: 1}}>
                                {perk.text}
                            </div>
                            {perk.servers.length >= 1 && <div style={{
                                fontSize: '80%',
                            }}>
                                Only on {perk.servers.join(', ')}
                            </div>}
                        </li>
                    ))}
                </ul>


                <Filler />

                <div style={{
                    marginTop: '-0.6em', // Reduce the room between tagline and actions
                    padding: '0 1em 1em 1em',
                    minHeight: 42,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <NavLink
                        to={'/shop/'+id}
                        style={{
                            width: '100%',
                        }}
                    >
                        <RaisedButton
                            label="Buy now"
                            labelPosition="before"
                            primary
                            fullWidth
                            icon={<Icon name="shopping-cart" style={{marginTop: '-0.2em'}}/>}
                        />
                    </NavLink>
                </div>
            </CardItem>
        )
    }
}

interface StateToProps {
    shopItem: ShopItem
}
export const ShopItemCard = withRouter<any>(connect<StateToProps, {}, ShopItemProps>(
    (state: AppState, props: ShopItemProps): StateToProps => ({
        shopItem: state.shopLayout.itemsById[props.id],
    }),
)(ShopItemCardDisplay))
