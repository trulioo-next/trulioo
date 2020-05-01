import React, { Fragment, useState } from 'react';
import classNames from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import Media from 'react-bootstrap/Media';

import RewardItem from '@/components/7rewards/RewardItem';

import ChevronIcon from '@/static/images/caret-down.svg';

import './RewardMenu.scss';

const RewardMenu = ({ data }) => {
  const [opened, setOpened] = useState(1000);

  const rewards = data.rewards;
  const tiers = [1000, 1500, 2000, 2750, 4000, 6000];
  let sortedRewards = [];

  for (let i = 0; i < tiers.length; i++) {
    let tierItem = {
      key: tiers[i],
      rewards: rewards.rewards_catalog.filter(function(item) {
        return item.tier_id == `${tiers[i]}_CA`;
      }),
    };
    sortedRewards.push(tierItem);
  }

  return (
    <div className="RewardMenu">
      {sortedRewards && (
        <Accordion
          className="Accordion RewardMenu__accordion"
          defaultActiveKey="tier-1000"
        >
          {sortedRewards.map(({ key, rewards }, tierIndex) => {
            return (
              <div
                className={classNames('Accordion__item', {
                  '-opened': opened === key,
                })}
                key={tierIndex}
              >
                <Accordion.Toggle
                  eventKey={`tier-${key}`}
                  as="h3"
                  className={classNames('Accordion__header', `-tier-${key}`)}
                  onClick={() => setOpened(opened === key ? false : key)}
                >
                  <span className="Accordion__heading">{key} Points</span>
                  <ChevronIcon className="Accordion__toggle" />
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={`tier-${key}`}>
                  <div className="Accordion__collapse">
                    <ul className="RewardList list-unstyled">
                      {rewards.map((reward, rewardIndex) => (
                        <RewardItem
                          key={rewardIndex}
                          as="li"
                          data={reward}
                          type="reward"
                        />
                      ))}
                    </ul>
                  </div>
                </Accordion.Collapse>
              </div>
            );
          })}
        </Accordion>
      )}
    </div>
  );
};

export default RewardMenu;
