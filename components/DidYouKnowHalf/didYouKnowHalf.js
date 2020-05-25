import React, { useState } from 'react';
import PropTypes from 'prop-types';
 
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { convertURL, convertFullURL } from '../utilities/convertURL';
import { FlipButton } from '../FlipButton';

export const DidYouKnowHalf = ({ component }) => {
  
  const imageColPosition = (component.section_image_position) ? component.section_image_position : 'right';

  const ImageColumn = () => (
    <Col xs="12" md="6" className={ classnames('my-5', { 'order-md-last' : imageColPosition === 'right' }) }>
      <img
        title={ component.section_image.title } alt={ component.section_image.alt }
        className="d-block"
        src={ convertURL(component.section_image.url) }
      />
    </Col>
  );

  return (
    <section
      className={ classnames(
        'solution-two-column solution-two-column-sm-expanded did-you-know',
      ) }
      style={ { backgroundImage: `url(${ component.background_image })` } }
    >
      <Container className='d-flex flex-column align-items-center'>
        <Row>
          <ImageColumn />
          <Col xs='12' md='6' className='align-self-center px-5 px-md-4 my-5'>
            <h2 className='mb-5' dangerouslySetInnerHTML={ { __html: component.title || 'No HTML' } } />
            <div
              className="w-100 h-100 d-block d-md-none"
              style ={ { background: `url(${ convertURL(component.section_image.url) }) no-repeat` } }
            />
            <div dangerouslySetInnerHTML={ { __html: component.paragraph || 'No HTML' } } />
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};

DidYouKnowHalf.propTypes = {
  component: PropTypes.object,
};
