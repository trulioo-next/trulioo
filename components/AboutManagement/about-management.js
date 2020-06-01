import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import { TeamSlider } from './team-slider';
import { TeamGrid } from './team-grid';

export const AboutManagement = ({ component }) => {
  const [ width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  });

  const breakpoint = 480;

  return (
    <section className={ classnames('team-members-section', component.background_color) }>
      <Container className="py-5">
        <Row>
          <Col className="px-5 px-md-4 text-center">
            <h2 className="mb-5">{component.heading}</h2>
          </Col>
        </Row>
        { component.list && (
          <Row>
            <Col className="px-0 px-md-4">
              { width < breakpoint ? <TeamSlider items={ component.list } /> : <TeamGrid items={ component.list } /> }
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
};

AboutManagement.propTypes = {
  component: PropTypes.object
};
