import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Row,
  Col,
  Collapse,
} from 'reactstrap';

import AccordionPlus from '../../static/assets/accordion-plus.svg';
import AccordionMinus from '../../static/assets/accordion-minus.svg';

const FaqList = ({ list }) => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <Row className="mx-n5 mx-md-n4 py-5">
      <Col>
        <h3 className="h3 mt-md-2 px-5 px-md-0">{list.title}</h3>
        { list.items &&
          <dl className="accordion mb-md-4">
            { list.items.map((faq, index) => (
              <div key={ index } className="px-5 px-md-0 accordion-item">
                <dt
                  className={ classnames(
                    'h5 accordion-header d-flex justify-content-between',
                    { 'opened' : isOpen === index }
                  ) }
                  onClick={ () => setIsOpen((isOpen === index) ? false : index) }>
                  <span className="accordion-heading">{ faq.question }</span>
                  { (isOpen === index) ? <AccordionMinus className="accordion-toggle-icon" /> : <AccordionPlus className="accordion-toggle-icon" /> }
                </dt>
                <Collapse className="m0 accordion-collapse" tag="dd" isOpen={ isOpen === index }>
                  <div className="accordion-content" dangerouslySetInnerHTML={ { __html: faq.answers } } />
                </Collapse>
              </div>
            ))}
          </dl>
          }
      </Col>
    </Row>
  );
};

export const Faq = ({ component }) => {
  return (
    <section className="faq-section">
      <Container className="py-5">
        { component.heading &&
          <Row className="pt-4 pt-md-5">
            <Col className="px-5 px-md-4 pt-md-3">
              <h2 className="h2" dangerouslySetInnerHTML={ { __html: component.heading } }/>
            </Col>
          </Row>
        }
        { component.lists && component.lists.map((list, index) => (
          <FaqList key={ index } list={ list } />
        ))}
      </Container>
    </section>
  );
};

FaqList.propTypes = {
  list: PropTypes.object,
};

Faq.propTypes = {
  component: PropTypes.object
};
