import React, { Component } from 'react';

import { motion } from 'framer-motion';

import './RewardsGraph.scss';

class PointsProgress extends Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;

    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, tiers, points } = this.props;

    const maxTier = tiers[tiers.length - 1].tier;

    // Used for outputting paths in a certain order later.
    let reversedTiers = tiers.reduceRight((a, c) => (a.push(c), a), []);

    const computedProgress =
      points > 0
        ? this.circumference - (points / maxTier) * this.circumference
        : this.circumference;

    // In seconds
    const animationDuration = 1;

    return (
      <motion.svg
        className="RewardsGraph"
        viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      >
        <circle
          className="RewardsGraph__track"
          stroke="#CCC"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={this.circumference + ' ' + this.circumference}
          r={this.normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <mask id="progress-mask">
          <motion.circle
            stroke="white"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={this.circumference + ' ' + this.circumference}
            strokeLinecap="round"
            initial={{ strokeDashoffset: this.circumference }}
            animate={{ strokeDashoffset: computedProgress }}
            transition={{
              duration: animationDuration,
              ease: 'easeInOut',
            }}
            r={this.normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </mask>
        <g className="RewardsGraph__paths" mask="url(#progress-mask)">
          {reversedTiers.map((tier, index) => {
            const tierStrokeDashOffset =
              this.circumference - (tier.tier / maxTier) * this.circumference;

            return (
              <circle
                key={index}
                stroke={tier.color}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={this.circumference + ' ' + this.circumference}
                strokeLinecap="round"
                strokeDashoffset={tierStrokeDashOffset}
                r={this.normalizedRadius}
                cx={radius}
                cy={radius}
              />
            );
          })}
        </g>
        <g className="RewardsGraph__markers">
          {/* {tiers.map((tier, index) => {
            // TODO: Fix points around circle.
            console.log(
              radius +
                this.normalizedRadius *
                  Math.sin((tier.tier / maxTier) * this.circumference),
            );
            return (
              <circle
                key={index}
                className="RewardsGraph__marker"
                cx={
                  radius +
                  this.normalizedRadius * Math.sin((tier.tier / maxTier) * 360)
                }
                cy={
                  radius +
                  this.normalizedRadius * Math.cos((tier.tier / maxTier) * 360)
                }
                r="2.5"
                fill="#fff"
                stroke="#757575"
                strokeWidth="1.25"
              />
            );
          })} */}
        </g>
        <text x="50%" y="50%" textAnchor="middle">
          <tspan x="50%" dy="0" className="RewardsGraph__pointsValue">
            {points}
          </tspan>
          <tspan className="RewardsGraph__pointsMeasure" x="50%" dy="1.5em">
            Points
          </tspan>
        </text>
      </motion.svg>
    );
  }
}

const RewardsGraph = ({ points, tiers }) => {
  return (
    <PointsProgress radius={95} stroke={9} tiers={tiers} points={points} />
  );
};

export default RewardsGraph;
