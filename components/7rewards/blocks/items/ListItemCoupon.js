import React, { useState, useEffect } from 'react'
import './ListItemCoupon.scss'

const ListItemCoupon = ({ data }) => {

    //console.log('data  ; ', data)
    return (
        <>
            {data &&
                <div>
                    <div className="list-item coupon-item"
                        data-coupon-id="1"
                        data-coupon-name="description"
                        data-coupon-expiry="expires">
                        <div className="item-card">
                            <div className="item-image">
                                <img src={data.image_thumb} />
                            </div>
                            <div className="item-content">
                                <span className="item-description" dangerouslySetInnerHTML={{ __html: data.description }} />
                                <span className="item-expiry" dangerouslySetInnerHTML={{ __html: data.expiration_label }} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default ListItemCoupon;
