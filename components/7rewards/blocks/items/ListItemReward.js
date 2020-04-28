import React from 'react'
import './ListItemReward.scss'

const ListItemReward = ({ data }) => {
    return (
        <>
            {data &&
                <div className="list-item reward-item" data-points-needed="#" data-reward-name="#">
                    <div className="table-helper">
                        <div className="item-content cell" data-toggle="tab" data-target="#reward_1">
                            <div className="table-helper">
                                <div className="item-image cell">
                                    <img src={data.image_thumb} />
                                </div>
                                <div className="cell v-align">
                                    <div className="item-title" dangerouslySetInnerHTML={{ __html: data.title }} />
                                </div>
                            </div>
                        </div>
                        <div className="item-action cell">
                            <button className="btn btn-redeem" data-redeem-reward="1" disabled>Redeem</button>
                        </div>
                    </div>
                </div>}
        </>

    )
}

export default ListItemReward;
