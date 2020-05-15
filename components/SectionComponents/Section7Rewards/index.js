import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';
import ProductSlider from '@/components/ProductSlider';
import { useSelector, useDispatch } from 'react-redux';
import { userDataSelector } from '../../../stores/user/selectors';
import RewardsCard from '@/components/RewardsCard';

let rewardData = [];

const Section7Rewards = props => {
  // console.log('Section7Rewards  PROPS :: ', props);
  let sectionClasses = classNames('Section');

  const USER = useSelector(state => userDataSelector(state));
  // console.log('USER DATA  ', USER )

  const isAuth = USER && USER.auth ? true : false;

  //
  let comTitle = props.title_logged_out;
  let subHeading = props.subheading_logged_out;
  if (USER && USER.auth) {
    comTitle = props.title_logged_in;
    subHeading = props.subheading_logged_in;
  }

  //
  if (USER && USER.rewards && USER.rewards.rewards_catalog) {
    let rewards = USER.rewards.rewards_catalog;
    rewardData = [];
    for (var i = 0; i < rewards.length; i++) {
      let itemDate = new Date(rewards[i].catalog_end_date);
      rewardData.push({
        image_thumb: rewards[i].image_thumb,
        description: rewards[i].title,
        bonus_value: rewards[i].tier,
        expiration_label: 'Expires ' + itemDate.toLocaleDateString(),
      });
    }
  } else if (props.offers_logged_out) {
    rewardData = props.offers_logged_out;
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

      {rewardData && (
        <div className="container-fluid px-0">
          <ProductSlider>
            {rewardData.map((item, i) => (
              <ProductSlider.Item key={i}>
                {item.link && item.link.target ? (
                  <RewardsCard
                    as="a"
                    href={item.link.url}
                    item={item}
                    target={item.link.target}
                    rel="noopener noreferrer"
                  />
                ) : (
                  <Link href={item.link ? item.link.url : '/7rewards'}>
                    <RewardsCard
                      as="a"
                      href={item.link ? item.link.url : '/7rewards'}
                      item={item}
                    />
                  </Link>
                )}
              </ProductSlider.Item>
            ))}
          </ProductSlider>
        </div>
      )}

      {!isAuth && (
        <div className="container Section__container">
          <div className="row justify-content-center">
            <div className="col col-12 col-lg-8 text-center">
              <p>
                <Button href="/7rewards/signin">Sign Up</Button>
              </p>
              <br />
              <p>
                Already have an account?
                <br />
                <Link href="/7rewards/signin">
                  <a className="SevenRewards__link">
                    <strong>Log In &rsaquo;</strong>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// Section7Rewards.defaultProps = {};
Section7Rewards.getInitialProps = async ({ req, query }) => {
  return { query };
};

export default Section7Rewards;
