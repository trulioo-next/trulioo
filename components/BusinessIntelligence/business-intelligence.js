import React from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

export const BusinessIntelligence = ({ component }) => (
  <section className="py-5">
    <Container className="py-md-5">
      {
        (component.heading || component.paragraph) &&
        <Row className="mb-4 mb-md-5">
          <Col className="px-5 px-md-4">
            { component.heading && <h2 dangerouslySetInnerHTML={ { __html: component.heading } } /> }
            { component.paragraph && <div dangerouslySetInnerHTML={ { __html: component.paragraph } } /> }
          </Col>
        </Row>
      }
      { component.lists &&
        <Row>
            { component.lists.map((content, index) =>
              (
                <Col xs="12" md="6" lg="4" className="px-5 px-md-4 mb-4 text-center text-md-left" key={ index }>
                  { content.icon &&
                    <div className="d-inline-flex icon icon-lg bg-yellow pb-2 mb-4">
                      <img title={ content.icon.title } alt={ content.icon.alt } src={ content.icon.url }/>
                    </div>
                  }
                  { content.heading && <h3 className="h4">{ content.heading }</h3> }
                  { content.paragraph && <div dangerouslySetInnerHTML={ { __html: content.paragraph } } /> }
                </Col>
              )
            )}
        </Row>
      }
    </Container>
  </section>
);

BusinessIntelligence.propTypes = {
  component: PropTypes.object
};
