import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import ProductSlider from '@/components/ProductSlider';

import RewardsCard from '@/components/RewardsCard';

let rewardData = [
  {
    image_thumb: '/static/images/placeholders/Monster.png',
    description: 'When you buy a Monster® Energy Drink 4 Pack - 473ml',
    bonus_value: '+500 Bonus Points',
    expiration_label: 'Expires 01/06/20',
  },
  {
    image_thumb: '/static/images/placeholders/CocaCola.png',
    description: 'When you buy a Coca-Cola® 1L',
    bonus_value: '+200 Bonus Points',
    expiration_label: 'Expires 01/06/20',
  },
  {
    image_thumb: '/static/images/placeholders/Slurpee.png',
    description: 'When you buy any Slurpee®',
    bonus_value: '+200 Bonus Points',
    expiration_label: 'Expires 01/06/20',
  },
  {
    image_thumb: '/static/images/placeholders/Monster.png',
    description: 'When you buy a Monster® Energy Drink 4 Pack - 473ml',
    bonus_value: '+500 Bonus Points',
    expiration_label: 'Expires 01/06/20',
  },
  {
    image_thumb: '/static/images/placeholders/Slurpee.png',
    description: 'When you buy any Slurpee®',
    bonus_value: '+200 Bonus Points',
    expiration_label: 'Expires 01/06/20',
  },
  {
    image_thumb: '/static/images/placeholders/CocaCola.png',
    description: 'When you buy a Coca-Cola® 1L',
    bonus_value: '+200 Bonus Points',
    expiration_label: 'Expires 01/06/20',
  },
];

const Section7Rewards = props => {
  // console.log('Section7Rewards  PROPS :: ', props);
  let sectionClasses = classNames('Section');

  return (
    <section className={sectionClasses}>
      <div className="container Section__container">
        <div className="row justify-content-center">
          <div className="col col-12 col-lg-8 text-center">
            {props.title && <h2 className="Section__title">{props.title}</h2>}
            {props.subheading && <p>{props.subheading}</p>}
          </div>
        </div>
      </div>
      <div className="container-fluid px-0">
        <ProductSlider>
          {rewardData.map((item, i) => (
            <ProductSlider.Item key={`product-slider-item-${i}`}>
              <RewardsCard item={item} />
            </ProductSlider.Item>
          ))}
        </ProductSlider>
      </div>
      <div className="container Section__container">
        <div className="row justify-content-center">
          <div className="col col-12 col-lg-8 text-center">
            <p>
              <Button href="/login" as="login">
                Sign Up
              </Button>
            </p>
            <br />
            <p>
              Already have an account?
              <br />
              <Link href="login">
                <a className="SevenRewards__link">
                  <strong>Log In &rsaquo;</strong>
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

Section7Rewards.defaultProps = {};

export default Section7Rewards;
