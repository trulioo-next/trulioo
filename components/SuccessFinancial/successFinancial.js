import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Container,Row,Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxBackground, ParallaxContent } from '../Parallax';
import { FlipButton } from '../FlipButton';

import QuoteMarker from '@/static/images/quote-marker.svg';

export const SuccessFinancial = ({ component }) => {
  return (
    <section
      className={ classnames(
        'section homepage-two-column-solution text-white d-flex',
      ) }
    >
      { component.background_image &&
        <ParallaxBackground
          background={ component.background_image }
          { ...(component.mobile_background_image && { mobileBackground: component.mobile_background_image }) }
        />
      }
      <Container className='py-5'>
        <ParallaxContent>
          <Row className='pb-5 py-md-5'>
            <Col xs={ 12 } md={ 6 } className="px-5 px-md-4">
              <h2 title={ component.title } className="mb-0">
                {component.title}
              </h2>
            </Col>
          </Row>
          <Row className='py-md-5'>
            <Col xs={ 12 } md={ 6 } className="px-5 px-md-4">
              <Row>
                <Col xs='12' md='auto' className="pr-3 pr-lmd-5 mb-5">
                  <QuoteMarker className="quote-marker mt-2" />
                </Col>
                <Col className="w-100 mb-2">
                  <blockquote>
                    <p className='lead'>{component.review}</p>
                    <cite className="mt-md-5">{component.review_by}</cite>
                  </blockquote>
                </Col>
              </Row>
            </Col>
            <Col xs={ 12 } md={ 6 } className='mt-5 mt-md-0 px-5 px-md-4'>
              <div className="lead">
                <p>{component.case_study}</p>
              </div>
              <FlipButton
                outline
                color="light"
                size="lg"
                className="mt-5 d-block d-md-inline-block"
                href={ component.case_study_link.url }
              >
                Read Case Study
              </FlipButton>
              <div className="my-5 text-center text-md-right">
                <a
                  href={ component.more_case_studies_link.url }
                  title={ component.more_case_studies_link.title }
                >
                  {component.more_case_studies_link.title }
                </a>
              </div>
            </Col>
          </Row>
        </ParallaxContent>
      </Container>
    </section>
  );
};

SuccessFinancial.propTypes = {
  component: PropTypes.object,
};
