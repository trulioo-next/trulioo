import React from 'react'
import './ListItemReward.scss'

const ListItemReward = () => {
    return (
        <div className="list-item reward-item" data-points-needed="#" data-reward-name="#">
            <div className="table-helper">
                <div className="item-content cell" data-toggle="tab" data-target="#reward_1">
                    <div className="table-helper">
                        <div className="item-image cell">
                            <img src="https://place-hold.it/70x70/#ccc" />
                        </div>
                        <div className="cell v-align">
                            <div className="item-title">Fresh Baked Croissant, Muffin, Apple Fritter or Ring Donut</div>
                        </div>
                    </div>
                </div>
                <div className="item-action cell">
                    <button className="btn btn-redeem" data-redeem-reward="1" disabled>Redeem</button>
                </div>
            </div>
        </div>
    )
}

export default ListItemReward;
