import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { autop } from '@wordpress/autop';

import {
  Collapse,
} from 'reactstrap';
import { FlipButton } from '../FlipButton';

export const PricingTabs = ({ data }) => {
  const [ open, setOpen ] = useState(false);

  return (
    <dl className="pricing-tabs mx-n4 mb-0">
      {data.map((tier, index) => (
        <Fragment key={ index }>
          <dt className="d-flex mx-4 my-3 p-4 bg-white" onClick={ () => setOpen((index === open) ? false : index) }>
            <h3 className="h5 m-0 d-flex align-items-center justify-content-between w-100">
              <span className="text-uppercase">{ tier.heading }</span>
              <span className="text-primary">
                {tier.price}{ tier.price_terms && ('/' + tier.price_terms)}
              </span>
            </h3>
            <span className="ml-2 pricing-tab-indicator">{ (index === open) ? '-' : '+' }</span>
          </dt>
          <Collapse className="m-0 text-center" tag="dd" isOpen={ index === open }>
            <div className="pt-5 "/>
            <div className="bg-white">
              <div className="p-5">
                <span className="h5 text-uppercase">{ tier.heading }</span>
                <span className="d-flex text-primary align-items-center justify-content-center">
                  <strong className="h2">{ tier.price }</strong>
                  { tier.price_terms && <span className="h4">/{ tier.price_terms }</span> }
                </span>
                { tier.price_button &&
                  <FlipButton
                    className="d-block d-md-inline-block"
                    size="sm"
                    color="primary"
                    href={ tier.price_button.url }
                  >{tier.price_button.title}</FlipButton> }
              </div>
              {tier.price_lists &&
                <ul className="pricing-details mb-0">
                  {tier.price_lists.map(({ list }, index) => (
                    <li className="px-5 py-4 m-0" key={ index } dangerouslySetInnerHTML={ { __html: autop(list) } } />
                  ))}
                </ul>
              }
            </div>
          </Collapse>
        </Fragment>
      ))}
    </dl>
  );
};

PricingTabs.propTypes = {
  data: PropTypes.object,
};
