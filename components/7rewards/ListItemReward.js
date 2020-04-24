import React from 'react'

const ListItemReward = () => {
    return (
        <div class="list-item reward-item" data-points-needed="#" data-reward-name="#">
            <div class="table-helper">
                <div class="item-content cell" data-toggle="tab" data-target="#reward_1">
                    <div class="table-helper">
                        <div class="item-image cell">
                            <img src="#" />
                        </div>
                        <div class="cell v-align">
                            <div class="item-title">Title</div>
                        </div>
                    </div>
                </div>
                <div class="item-action cell">
                    <button class="btn btn-redeem" data-redeem-reward="1">Reward</button>
                </div>
            </div>
        </div>
    )
}

export default ListItemReward;
