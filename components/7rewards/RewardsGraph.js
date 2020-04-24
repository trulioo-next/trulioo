import React from 'react'
import './RewardsGraph.scss'

const RewardsGraph = () => {
    return (
        <div id="graphs_wrapper">
            <div id="points">
                <div id="rewards_graph" data-points="10" data-tier-levels="3" data-tier-colors="3"></div>
            </div>
            <div id="punches">
                <div class="punch-card" id="2">
                    <div class="punch-title"><span>title</span></div>
                    <div class="punch-dial" data-punches="2"></div>
                </div>
                <div class="punch-card empty"></div>
            </div>
        </div>
    )
}

export default RewardsGraph