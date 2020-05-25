import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

export const TwoColumnContent = ({ component }) => (
  <section
    className={ classnames(
      'two-column-content-section align-items-center py-5',
      component.background_color
      ) }
  >
    <Container className="py-md-5 mt-md-4">
      { component.heading &&
        <Row className="mt-3">
          <Col className="px-5 px-md-4 pb-2">
            <h2 dangerouslySetInnerHTML={ { __html: component.heading } } />
          </Col>
        </Row>
      }
      <Row>
        <Col className="px-5 px-md-4" xs="12" md="6" dangerouslySetInnerHTML={ { __html: component.content } } />
        <Col className="lead px-5 px-md-4" xs="12" md="6" dangerouslySetInnerHTML={ { __html: component.second_content } } />
      </Row>
    </Container>
  </section>
);

TwoColumnContent.propTypes = {
  component: PropTypes.object
};
