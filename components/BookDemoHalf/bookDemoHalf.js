import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from 'react-responsive';

import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { convertURL, convertFullURL } from '../utilities/convertURL';

import { FlipButton } from '../FlipButton';

const SectionBackground = ({ background }) => {
  const mediaMdUp = useMediaQuery({ minWidth: 768 });

  return mediaMdUp ? (
    <div className="section-bg">
      <div
        className="d-block w-100 h-100 section-bg-img"
        style={{ backgroundImage: `url(${background.url || background})` }}
      />
    </div>
  ) : (
    <div className="section-image mb-n5">
      <img src={background.url || background} />
    </div>
  );
};

export const BookDemoHalf = ({ component }) => {
  const mediaMdUp = useMediaQuery({ minWidth: 768 });

  return (
    <section
      className="circle-container d-flex align-items-center"
      id="bookDemoHalf"
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
        <Row className="text-white my-md-5">
          <Col xs="12" md="7" className="position-relative px-5 px-md-4">
            <div
              className={classnames(
                { 'circle-bg bg-primary': !mediaMdUp },
                { 'inverted-circle-bg': mediaMdUp },
              )}
            />
            <div className="section-content">
              <h2 className="mb-5" title={component.title}>
                {component.title}
              </h2>
              <p className="lead mt-5">{component.paragraph}</p>
              {component.link && (
                <FlipButton
                  className="mt-3 d-block d-md-inline-block"
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
                        onClick: () => console.log('BOOK DEMO HALF LINK'),
                      })}
                >
                  {component.link.title}
                </FlipButton>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

SectionBackground.propTypes = {
  background: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

BookDemoHalf.propTypes = {
  component: PropTypes.object,
};
