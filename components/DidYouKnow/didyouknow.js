import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
 
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
 
import { ParallaxBackground, ParallaxContent } from '../Parallax';
import { FlipButton } from '../FlipButton';

export const DidYouKnow = ({ component }) => {
  
  return (
    <section
      className={ classnames(
        'section hero-body hero-body did-you-know',
      ) }
    >
      { component.background_image &&
        <ParallaxBackground
          background={ component.background_image }
          { ...(component.mobile_background_image && { mobileBackground: component.mobile_background_image }) }
        />
      }
      <Container className='d-flex flex-column align-items-center mx-auto text-center text-white py-5'>
        <Row className="py-5">
          <Col xs='12' md='12' className='mt-5 px-5 px-md-4'>
            <ParallaxContent>
              <h2 className="title mb-5" title={ component.title }>
                {component.title}
              </h2>
              <div className="lead mb-5">
                {component.paragraph}
              </div>
              { component.link &&
                <FlipButton
                  className="d-block d-md-inline-block"
                  href={ component.link.url }
                  color='primary'
                  title={ component.link.title }
                  { ...( component.link.target &&
                    {
                      target: component.link.target,
                      rel: 'noopener noreferrer'
                    }
                  ) }
                >
                  { component.link.title }
                </FlipButton>
              }
            </ParallaxContent>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

DidYouKnow.propTypes = {
  component: PropTypes.object,
};
