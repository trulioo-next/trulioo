import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
 
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import classnames from 'classnames';
import { convertURL } from '../utilities/convertURL';
import { convertFullURL } from '../utilities/convertURL';
import { FlipButton } from '../FlipButton';

const SectionBackground = ({ background, windowWidth, breakpoint }) => {
  return windowWidth < breakpoint ? (
    <div className="section-image mb-n5">
      <img src={ background.url || background } />
    </div>
  ) : (
    <div className="section-bg">
      <div className="d-block w-100 h-100 section-bg-img" style={ { backgroundImage: `url(${ background.url || background })` } } />
    </div>
  );
};

export const BookDemoHalf = ({ component }) => {
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);
  const breakpoint = 768;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  });

 

  return (
    <section
      className="circle-container d-flex align-items-center"
      id="bookDemoHalf"
      onMouseEnter={ () => {
        const customCursor = document.querySelector('.custom-cursor');

        if (customCursor)
          customCursor.classList.add('white');
      } }
      onMouseLeave={ () => {
        const customCursor = document.querySelector('.custom-cursor');

        if (customCursor)
          customCursor.classList.remove('white');
      } }
    >
      {component.background_image &&
        <SectionBackground background={ component.background_image } windowWidth={ windowWidth } breakpoint={ breakpoint }/>
      }
      <Container className="py-5">
        <Row className='text-white my-md-5'>
          <Col xs='12' md='7' className="position-relative px-5 px-md-4">
            <div className={ classnames({ 'circle-bg bg-primary': windowWidth < breakpoint }, { 'inverted-circle-bg' : windowWidth > breakpoint }) } />
            <div className="section-content">
              <h2 className="mb-5" title={ component.title }>
                {component.title}
              </h2>
              <p className="lead mt-5">
                {component.paragraph}
              </p>
              { component.link &&
                <FlipButton
                  className="mt-3 d-block d-md-inline-block"
                  outline color="light"
                  size="lg"
                  title={ component.link.title }
                  href={ component.link.url }
                  { ...( component.link.target ?
                    {
                      target: component.link.target,
                      rel: 'noopener noreferrer'
                    } :
                    {
                      onClick: () => console.log('BOOK DEMO HALF LINK')
                    }
                  ) }
                >
                  { component.link.title }
                </FlipButton>
              }
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

SectionBackground.propTypes = {
  background: PropTypes.oneOfType([ PropTypes.object, PropTypes.string ]),
  windowWidth: PropTypes.number,
  breakpoint: PropTypes.number,
};

BookDemoHalf.propTypes = {
  component: PropTypes.object,
};
