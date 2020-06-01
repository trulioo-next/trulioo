import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxContent, ParallaxBackground } from '../Parallax';
import { motion } from 'framer-motion';
import { FlipButton } from '../FlipButton';

export const Hero = ({ component }) => {
  const [loaded, setLoaded] = useState(false);

  const [heroImage, setHeroImage] = useState(null);

  useEffect(() => {
    if (!component.hero_images) return;

    setHeroImage(
      component.hero_images[
        Math.floor(Math.random() * component.hero_images.length)
      ],
    );
  });

  return (
    <motion.section
      className={classnames('hero-body section py-5')}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
    >
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
          loaded={loaded}
          setLoaded={setLoaded}
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
                <Fragment>
                  {component.link.target ? (
                    <FlipButton
                      href={component.link.url}
                      color="primary"
                      size="lg"
                      title={component.link.title}
                      target={component.link.target}
                      rel="noopener noreferrer"
                    >
                      {component.link.title}
                    </FlipButton>
                  ) : (
                    <Link href={component.link.url} passHref>
                      <FlipButton
                        color="primary"
                        size="lg"
                        title={component.link.title}
                      >
                        {component.link.title}
                      </FlipButton>
                    </Link>
                  )}
                </Fragment>
              )}
            </ParallaxContent>
          </Col>
        </Row>
      </Container>
    </motion.section>
  );
};

Hero.propTypes = {
  component: PropTypes.object,
};
