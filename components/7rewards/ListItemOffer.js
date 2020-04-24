import React from 'react'
import './ListItemOffer.scss'

const ListItemOffer = () => {
    return (
        <div class="list-item offer-item"
            data-offer-id="1"
            data-offer-name="title"
            data-offer-expiry="1"
            data-toggle="tab" data-target="#offer_1"
        >
            <div class="item-card">
                <div class="item-image">
                    <img src="https://place-hold.it/130x130/#ccc" />
                </div>
                <div class="item-content">
                    <span class="item-value">+600 Points</span>
                    <span class="item-description">When you buy any 2 Old Dutch® XXL/ Kettle Potato Chips 180-255g, Ridgies & Dutch Crunch 180-255g</span>
                    <span class="item-expiry">Expires 07/01/20</span>
                </div>

            </div>
        </div>
    )
}

export default ListItemOffer;
