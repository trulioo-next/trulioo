import React from 'react'

const ListItemOffer = () => {
    return (
        <div class="offer-item"
            data-offer-id="1"
            data-offer-name="title"
            data-offer-expiry="1"
            data-toggle="tab" data-target="#offer_1"
        >
            <div class="item-card">
                <div class="item-image">
                    <img src="#" />
                </div>
                <div class="item-content">
                    <span class="item-value">Value</span>
                    <span class="item-description">Description</span>
                </div>
                <div class="item-divider">
                    <span class="item-expiry">Expiry</span>
                </div>
            </div>
        </div>
    )
}

export default ListItemOffer;
