import React, { useState } from 'react';
import classNames from 'classnames';

import Accordion from 'react-bootstrap/Accordion';
import RewardItem from '@/components/7rewards/RewardItem';
import ChevronIcon from '@/static/images/caret-down.svg';

import './Deals.scss';

const Deals = ({ data }) => {
  const [opened, setOpened] = useState('deals-bonus-offers');

  const bonusOffers = data.bonusOffers;
  const coupons = data.coupons;

  const accordionData = [
    {
      id: 'deals-bonus-offers',
      tab: 'Bonus Offers',
      items: bonusOffers,
    },
    {
      id: 'deals-coupons',
      tab: 'Coupons',
      items: coupons,
    },
  ];

  return (
    <div className="Deals">
      <Accordion
        className="Accordion Deals__accordion"
        defaultActiveKey="deals-bonus-offers"
      >
        {accordionData.map(({ id, tab, items }, tabIndex) => (
          <div
            className={classNames('Accordion__item', {
              '-opened': opened === id,
            })}
            key={tabIndex}
          >
            <Accordion.Toggle
              eventKey={id}
              as="h3"
              className="Accordion__header"
              onClick={() => setOpened(opened === id ? false : id)}
            >
              <span className="Accordion__heading">{tab}</span>
              <ChevronIcon className="Accordion__toggle" />
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={id}>
              <div className="Accordion__collapse p-4">
                <ul className="RewardList list-unstyled">
                  {items.map((item, itemIndex) => (
                    <RewardItem
                      key={itemIndex}
                      as="li"
                      data={item}
                      type={item.type}
                    />
                  ))}
                </ul>
              </div>
            </Accordion.Collapse>
          </div>
        ))}
      </Accordion>
    </div>
  );
};

export default Deals;
