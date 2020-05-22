import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { FlipButton } from '../FlipButton';

export const ContentCenter = ({ component }) => {
  const sectionClassName = 'homepage-one-column py-5 d-flex flex-column justify-content-center';

  return (
    <section
      className={ classnames(
        sectionClassName,
        component.frontend_identifier,
      ) }
      style={ {
        backgroundImage:`url(${ component.desktop_image })`,
        backgroundColor: component.background_color,
      } }
    >
      <Container className='pt-5'>
        <Row className="align-items-center">
          { component.image && (
            <Col className='px-5 px-md-4 d-md-none' xs='12'>
              <img className='img-fluid d-block w-100' src={ component.image.url } alt={ component.image.alt } title={ component.image.title } />
            </Col>
          )}
          <Col xs="12" sm={ { size: 8, offset: 2 } } className="text-center px-5 px-md-4">
            <h2 dangerouslySetInnerHTML={ { __html: component.title || 'No HTML' } } />
            <div className='lead mt-5' dangerouslySetInnerHTML={ { __html: component.paragraph || 'No HTML' } } />
            {
              component.list &&
              <ul className='my-5'>
                { component.list.map((list, index) =>
                    <li key={ index }>{ list.title }</li>
                  )
                }
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
          </Col>
        </Row>
      </Container>
    </section>
  );
};

ContentCenter.propTypes = {
  component: PropTypes.object,
};
