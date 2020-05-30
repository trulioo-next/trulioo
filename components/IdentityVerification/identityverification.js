import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxContent, ParallaxBackground } from '../Parallax';
import { useMediaQuery } from 'react-responsive';

const SectionBackground = ({ background }) => {
  const mediaMdUp = useMediaQuery({ minWidth: 768 });

  return mediaMdUp ? (
    <ParallaxBackground background={background} />
  ) : (
    <div className="section-image">
      <img src={background.url || background} />
    </div>
  );
};

export const IdentityVerification = ({ component }) => {
  return (
    <section
      className={classnames(
        'section hero-body hero-body-expanded circle-container align-items-center',
      )}
    >
      {component.background_image && (
        <SectionBackground background={component.background_image} />
      )}
      <Container className="py-md-5">
        <Row className="text-white">
          <Col xs="12" md="6" className="position-relative px-5 px-md-4">
            <div className="circle-bg bg-orange" />
            <ParallaxContent>
              <h2 className="title mt-5" title={component.title}>
                {component.title}
              </h2>
              {component.verifications.map(verification => (
                <div key={verification.title}>
                  <h3 className="subtitle mb-4 mt-5">{verification.title}</h3>
                  <ul>
                    {verification['description_list'].map(
                      (description, index) => (
                        <li key={index} className="text-white mt-4">
                          {description.description}
                        </li>
                      ),
                    )}
                  </ul>
                  <div className="mt-4 mb-5">
                    <a
                      href={verification.link.url}
                      title={verification.link.title}
                    >
                      {verification.link.title}
                    </a>
                  </div>
                </div>
              ))}
            </ParallaxContent>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

SectionBackground.propTypes = {
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

IdentityVerification.propTypes = {
  component: PropTypes.object,
};
