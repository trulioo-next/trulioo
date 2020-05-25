import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

export const InvestorList = ({ component }) => (
  <section className="investors-list-section">
    <Container className="pb-5">
      <Row>
        <Col className="px-5 px-md-4">
          <ul className="investors-list">
            { component.list && component.list.map((image, index) =>
              (
                <li key={ index }>
                  <img title={ image.title } alt={ image.alt } src={ image.photo.url }/>
                </li>
              )
            ) }
          </ul>
        </Col>
      </Row>
    </Container>
  </section>
);

InvestorList.propTypes = {
  component: PropTypes.object
};
