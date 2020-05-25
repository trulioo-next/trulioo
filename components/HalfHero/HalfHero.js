import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

 
export const HalfHero = ({ component }) => {
  const [ windowWidth, setWindowWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  });



  const backgroundImage = windowWidth < 768 && component.mobile_background_image ? component.mobile_background_image : component.background_image;

  return (
    <Fragment>
      {component ?
      <section
        className='resources-hero'
      >
        <img className="hero-bg-img w-100" src={ backgroundImage } />
        <div className="hero-content d-flex h-100 align-items-center">
          <Container className="py-5">
            <Row className='text-white'>
              <Col xs='12' md='7' className="px-5 px-md-4">
                <h1 className='h2'>{ component.title }</h1>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
        : <div>loading...</div>
      }
    </Fragment>
  );
};

HalfHero.propTypes = {
  component: PropTypes.object
};

HalfHero.defaultProps = {
  component: {
    background_image: '../../static/images/placeholders/ResourcesBanner.jpg',
    title: 'Get the latest resources on Identity Verification. '
  }
};
