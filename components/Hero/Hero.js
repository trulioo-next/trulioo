import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxContent, ParallaxBackground } from '../Parallax';
import { motion } from 'framer-motion';
import { FlipButton } from '../FlipButton';

import { convertFullURL } from '../utilities/convertURL';

// import './_hero.scss';

export const Hero = ({ component }) => {
  const heroImage =
    component.hero_images[
      Math.floor(Math.random() * component.hero_images.length)
    ];

  return (
    <section className={classnames('hero-body section py-5')}>
      {heroImage && (
        <ParallaxBackground
          background={heroImage.background_image}
          {...(heroImage.circle_color && { circle: heroImage.circle_color })}
          {...(heroImage.foreground_image && {
            foreground: heroImage.foreground_image,
          })}
          {...(heroImage.mobile_background_image && {
            mobileBackground: heroImage.mobile_background_image,
          })}
          {...(heroImage.mobile_foreground_image && {
            mobileForeground: heroImage.mobile_foreground_image,
          })}
        />
      )}
      <Container>
        <Row className="py-5">
          <Col xs="12" md="7" className="hero-content text-white px-5 px-md-4">
            <ParallaxContent>
              <span
                className="d-block w-50"
                dangerouslySetInnerHTML={{ __html: component.sub_header }}
              />
              <h1
                className="hero-title"
                dangerouslySetInnerHTML={{ __html: component.title }}
              />
              <div className="lead hero-paragraph">
                <p dangerouslySetInnerHTML={{ __html: component.paragraph }} />
              </div>
              {component.link && (
                <FlipButton
                  href={component.link.url}
                  color="primary"
                  size="lg"
                  title={component.link.title}
                  {...(component.link.target
                    ? {
                        target: component.link.target,
                        rel: 'noopener noreferrer',
                      }
                    : {
                        onClick: () => console.log('CLICKED BUTTON '),
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

Hero.propTypes = {
  component: PropTypes.object,
};
