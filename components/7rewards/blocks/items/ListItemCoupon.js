import React, { useState, useEffect } from 'react'
import './ListItemCoupon.scss'

const ListItemCoupon = ({ data }) => {

    // console.log('data  ; ', data )
    return (
        <>
        { data && 
            <div>
                <div className="list-item coupon-item"
                    data-coupon-id="1"
                    data-coupon-name="description"
                    data-coupon-expiry="expires">
                    <div className="item-card">
                        <div className="item-image">

                        </div>
                        <div className="item-content">

                            <span className="item-expiry">Expires 12/31/20</span>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default ListItemCoupon;
