import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxBackground, ParallaxContent } from '../Parallax';
import { convertFullURL } from '../utilities/convertURL';
import { FlipButton } from '../FlipButton';

const SectionBackground = ({ background }) => {
  const mediaMdUp = useMediaQuery({ minWidth: 768 });

  return mediaMdUp ? (
    <ParallaxBackground background={background} />
  ) : (
    <div className="section-image mb-n5">
      <img src={background.url || background} />
    </div>
  );
};

export const BookDemo = ({ component }) => {
  return (
    <section
      className="section circle-container d-flex align-items-center book-demo"
      onMouseEnter={() => {
        const customCursor = document.querySelector('.custom-cursor');

        if (customCursor) customCursor.classList.add('white');
      }}
      onMouseLeave={() => {
        const customCursor = document.querySelector('.custom-cursor');

        if (customCursor) customCursor.classList.remove('white');
      }}
    >
      {component.background_image && (
        <SectionBackground background={component.background_image} />
      )}
      <Container className="py-5">
        <Row className="text-white">
          <Col xs="12" md="7" className="position-relative px-5 px-md-4">
            <div className="circle-bg bg-primary" />
            <ParallaxContent>
              <h2 className="title mb-5" title={component.title}>
                {component.title}
              </h2>
              <div className="lead mt-5 mb-5">
                <p>{component.paragraph}</p>
              </div>
              {component.link && (
                <FlipButton
                  className="mt-5 d-block d-md-inline-block"
                  outline
                  color="light"
                  size="lg"
                  title={component.link.title}
                  href={component.link.url}
                  {...(component.link.target
                    ? {
                        target: component.link.target,
                        rel: 'noopener noreferrer',
                      }
                    : {
                        onClick: () => console.log('CLICKED '),
                      })}
                >
                  {component.link.title}
                </FlipButton>
              )}
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

BookDemo.propTypes = {
  component: PropTypes.object,
};
