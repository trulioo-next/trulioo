import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import ProductSlider from '@/components/ProductSlider';
import {useSelector, useDispatch} from 'react-redux';
import { userDataSelector } from "../../../stores/user/selectors";

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
  console.log('Section7Rewards  PROPS :: ', props);
  let sectionClasses = classNames('Section');


  const USER = useSelector( state =>  userDataSelector(state) );
  console.log('USER ', USER )
  let comTitle = props.title_logged_out;
  let subHeading = props.subheading_logged_out
  if(USER.auth) {
      comTitle = props.title_logged_in
      subHeading = props.subheading_logged_in
  }

  return (

    <section className={sectionClasses}>
      <div className="container Section__container">
        <div className="row justify-content-center">
          <div className="col col-12 col-lg-8 text-center">
            {comTitle && <h2 className="Section__title">{comTitle}</h2>}
            {subHeading && <p>{subHeading}</p>}
          </div>
        </div>
      </div>
      { USER.auth && 
        <div className="container-fluid px-0">
          <ProductSlider>
            {rewardData.map((item, i) => (
              <ProductSlider.Item key={`product-slider-item-${i}`}>
                <RewardsCard item={item} />
              </ProductSlider.Item>
            ))}
          </ProductSlider>
        </div>
      }
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

// Section7Rewards.defaultProps = {};
Section7Rewards.getInitialProps = async ({ req,query }) => {
    const details = await fetchPageDetails("product");
    return { details, query }
};

export default Section7Rewards;
