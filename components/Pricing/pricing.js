import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { Container, Row, Col } from 'reactstrap';
import { useMediaQuery } from 'react-responsive';

import { PricingTable } from './pricing-table';
import { PricingTabs } from './pricing-tabs';

const PricingTiers = ({ data }) => {
  const mediaXsOnly = useMediaQuery({ maxWidth: 479 });

  return mediaXsOnly ? (
    <PricingTabs data={data} />
  ) : (
    <PricingTable data={data} />
  );
};

export const Pricing = ({ component }) => {
  return (
    <section
      className={classnames('pricing-table-section bg-gray pt-4')}
      id={component.anchor}
    >
      <Container className="pt-5 py-md-5">
        <Row>
          <Col>
            <h2
              className="text-center mb-5"
              dangerouslySetInnerHTML={{ __html: component.heading }}
            />
            <div className="d-none d-md-block pt-md-4" />
            {component.prices && <PricingTiers data={component.prices} />}
            <div className="d-none d-md-block pb-5 mb-5 " />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

PricingTiers.propTypes = {
  data: PropTypes.object,
};

Pricing.propTypes = {
  component: PropTypes.object,
};
