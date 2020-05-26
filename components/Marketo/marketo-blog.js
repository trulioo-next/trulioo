import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { SectionBackground } from '../SectionBackground';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

const mapStateToProps = state => {
  return { component: state.api.marketo };
};

export const MarketoBlogList = ({ component }) => {

  useEffect(() => {
    if (MktoForms2) {
      MktoForms2.loadForm('//app-ab31.marketo.com', '392-YOD-077', component.form_id);
    }
  });

  const componentSections = (component) => {
    return (
      <section className="marketo-form-section section d-flex align-items-center" style={ { backgroundColor: component.background_color } }>
        { component.background_image &&
          <SectionBackground background={ component.background_image } />
        }
        <Container className="py-md-5">
          <Row
            className={ classnames('mx-n5', {
              'justify-content-start' : component.position === 'left',
              'justify-content-end' : component.position === 'right',
            }) }
          >
            { component.mobile_image &&
              <Col className='my-5 d-md-none' xs='12'>
                <img className='img-fluid d-block w-100' src={ component.mobile_image.url } alt={ component.mobile_image.alt } title={ component.mobile_image.title } />
              </Col>
            }
            <Col xs="12" md="6" lg="6" className="col">
              <Container fluid className="p-5 px-md-4">
                <span
                  dangerouslySetInnerHTML={ { __html: component.sub_header } }
                />
                <h2 title={ component.title }
                  className="title mb-5"
                  dangerouslySetInnerHTML={ { __html: component.title } }
                />
                { component.paragraph && <div dangerouslySetInnerHTML={ { __html: component.paragraph } } /> }
                <form id={ `mktoForm_${ component.form_id }` } className="marketo-form"></form>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
    );
  };

  return (
    <Fragment>
      {component && componentSections(component)}
    </Fragment>
  );
};

MarketoBlogList.propTypes = {
  component: PropTypes.any.isRequired,
};

MarketoBlogList.defaultProps = {
  component: null
};

export const MarketoBlog = connect(mapStateToProps)(MarketoBlogList);