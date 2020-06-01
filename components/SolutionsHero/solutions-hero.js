import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { ParallaxContent, ParallaxBackground } from '../Parallax';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FlipButton } from '@/components/FlipButton';

export const SolutionsHero = ({ component }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.section
      className={classnames('hero-body section py-5')}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
    >
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
          loaded={loaded}
          setLoaded={setLoaded}
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
                <Fragment>
                  {component.link.target ? (
                    <FlipButton
                      color="primary"
                      title={component.link.title}
                      href={component.link.url}
                      target={component.link.target}
                      rel="noopener noreferrer"
                    >
                      {component.link.title}
                    </FlipButton>
                  ) : (
                    <Link href={component.link.url} passHref>
                      <FlipButton color="primary" title={component.link.title}>
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

SolutionsHero.propTypes = {
  component: PropTypes.object.isRequired,
};

SolutionsHero.defaultProps = {
  component: [],
};
