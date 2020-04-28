import React from 'react'
import './ListItemOffer.scss'

const ListItemOffer = ({ data }) => {
    return (
        <>
            {data && <div className="list-item offer-item"
                data-offer-id="1"
                data-offer-name="title"
                data-offer-expiry="1"
                data-toggle="tab" data-target="#offer_1"
            >
                <div className="item-card">
                    <div className="item-image">
                        <img src={data.image_thumb} />
                    </div>
                    <div className="item-content">
                        <span className="item-value" dangerouslySetInnerHTML={{ __html: data.title }} />
                        <span className="item-description" dangerouslySetInnerHTML={{ __html: data.description }} />
                        <span className="item-expiry" dangerouslySetInnerHTML={{ __html: data.expiration_label }} />
                    </div>

                </div>
            </div>}

        </>

    )
}

export default ListItemOffer;
