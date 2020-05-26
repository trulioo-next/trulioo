import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { ParallaxVideo, ParallaxContent } from '../Parallax';
import { FlipButton } from '../FlipButton';

export const ContentRight = ({ component }) => {
	return (
		<section
      className={ classnames(
        'section homepage-two-column',
        component.frontend_identifier,
      ) }
    >
      { component.video &&
        <ParallaxVideo className="video-left" video={ component.video } />
      }
      <Container fluid className='py-5 container-md'>
        <Row className="justify-content-end">
          { component.image &&
            <Col className='px-0 d-md-none' xs='12'>
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

ContentRight.propTypes = {
  component: PropTypes.object,
};
