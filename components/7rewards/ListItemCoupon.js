import React from 'react'

const ListItemCoupon = () => {
    return (
        <div>
            <div class="coupon-item"
                data-coupon-id="1"
                data-coupon-name="description"
                data-coupon-expiry="expires"	>
                <div class="item-card">
                    <div class="item-image">
                        <img src="#" />
                    </div>
                    <div class="item-content">
                        <span class="item-description">Description</span>
                    </div>
                    <div class="item-divider">
                        <span class="item-expiry">Expiry</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListItemCoupon;
