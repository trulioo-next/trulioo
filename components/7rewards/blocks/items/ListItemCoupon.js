import React from 'react'
import './ListItemCoupon.scss'

const ListItemCoupon = () => {
    return (
        <div>
            <div class="list-item coupon-item"
                data-coupon-id="1"
                data-coupon-name="description"
                data-coupon-expiry="expires"	>
                <div class="item-card">
                    <div class="item-image">
                        <img src="https://place-hold.it/120x120/#ccc" />
                    </div>
                    <div class="item-content">
                        <span class="item-description">$2 Combo Add-On DEAL: Buy any Food Item, add a Gulp® or 7-Select™ Glacial Spring Water 500mL WITH a bag of 7-Select™ Chips 60-75g for only $2</span>
                        <span class="item-expiry">Expires 12/31/20</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItemCoupon;
