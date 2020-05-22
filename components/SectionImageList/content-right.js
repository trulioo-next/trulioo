import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { ParallaxBackground, ParallaxContent } from '../Parallax';
import { FlipButton } from '../FlipButton';

const SectionBackground = ({ className, background, backgroundColor, parallax }) => {
  if (parallax) {
    return <ParallaxBackground className={ className } background={ background } />;
  }
  return (
    <div className={ classnames( 'section-bg', className ) }>
      { background &&
        <div className="d-block w-100 h-100 section-bg-img" style={ { backgroundImage: `url(${ background.url || background })`, backgroundColor: backgroundColor } } />
      }
    </div>
  );
};

export const ContentRight = ({ component, parallax }) => {
	return (
		<section
      className={ classnames(
        'section homepage-two-column section-image-list-right',
        component.frontend_identifier,
      ) }
    >
      { component.desktop_image && component.image_option === 'background' &&
        <SectionBackground
          className="d-none d-md-block"
          background={ component.desktop_image }
          { ...( component.background_color && { backgroundColor: component.background_color }) }
          parallax={ parallax }
        />
      }
      <Container fluid className='py-md-5 container-md'>
        <Row className="align-items-center justify-content-end">
          { component.image &&
            <Col className='px-0 d-md-none' xs='12'>
              <img className='img-fluid d-block w-100' src={ component.image.url } alt={ component.image.alt } title={ component.image.title } />
            </Col>
          }
          { component.desktop_image && component.image_option === 'image' &&
            <Col className='image-column image-left px-0 d-none d-md-block' xs='12' md="5">
              <img className='img-fluid d-block w-100' src={ component.image.url } alt={ component.image.alt } title={ component.image.title } />
            </Col>
          }
          <Col className='content-column py-5 px-0 px-md-4' xs='12' md='7'>
            <Container className="px-5 px-md-0">
              <ParallaxContent>
                <h2 dangerouslySetInnerHTML={ { __html: component.title || 'No HTML' } } />
                <div className='lead mt-5' dangerouslySetInnerHTML={ { __html: component.paragraph || 'No HTML' } } />
                { component.list &&
                  <ul className='my-5'>
                    { component.list.map((list, index) =>
                      (
                        <li key={ index }>{ list.title }</li>
                      )
                    )}
                  </ul>
                }
                { component.link &&
                  <FlipButton
                    className="d-block d-md-inline-block"
                    color="primary"
                    href={ component.link.url }
                    { ...( component.link.target &&
                      {
                        target: component.link.target,
                        rel: 'noopener noreferrer'
                      }
                    ) }
                  >{ component.link.title }</FlipButton>
                }
              </ParallaxContent>
            </Container>
          </Col>
        </Row>
      </Container>
		</section>
	);
};

SectionBackground.propTypes = {
  className: PropTypes.string,
  background: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
  backgroundColor: PropTypes.string,
  parallax: PropTypes.bool,
};

ContentRight.propTypes = {
  component: PropTypes.object,
  parallax: PropTypes.bool,
};
