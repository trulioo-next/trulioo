import React, { useState, useRef, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxContent, ParallaxBackground } from '../Parallax';
import { motion } from 'framer-motion';
import { convertFullURL } from '@/utils/convertURL';
import { FlipButton } from '@/components/FlipButton';

export const SolutionsHero = ({ component }) => {
  const history = useHistory();

  return (
    <section className={classnames('hero-body section py-5')}>
      {component && (
        <ParallaxBackground
          background={component.background_image}
          {...(component.mobile_background_image && {
            mobileBackground: component.mobile_background_image,
          })}
          {...(component.circle_color && { circle: component.circle_color })}
          {...(component.foreground_image && {
            foreground: component.foreground_image,
          })}
          {...(component.mobile_foreground_image && {
            mobileForeground: component.mobile_foreground_image,
          })}
        />
      )}
      <Container>
        <Row className="py-5">
          <Col xs="12" md="7" className="hero-content text-white px-5 px-md-4">
            <ParallaxContent>
              {component.sub_header}
              <h1
                title={component.title}
                dangerouslySetInnerHTML={{
                  __html: component.title || 'No HTML',
                }}
              />
              <div
                className="lead hero-paragraph"
                dangerouslySetInnerHTML={{
                  __html: component.paragraph || 'No HTML',
                }}
              />
              {component.link && (
                <FlipButton
                  color="primary"
                  title={component.link.title}
                  href={component.link.url}
                  {...(component.link.target
                    ? {
                        target: component.link.target,
                        rel: 'noopener noreferrer',
                      }
                    : {
                        onClick: () =>
                          history.push(convertFullURL(component.link.url)),
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

SolutionsHero.propTypes = {
  component: PropTypes.object.isRequired,
};

SolutionsHero.defaultProps = {
  component: [],
};
