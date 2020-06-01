import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { FlipButton } from '../FlipButton';
const Instafeed = require('../../static/assets/instafeed.js');

export const InstagramSection = ({ component }) => {

  const feed = new Instafeed({
    accessToken: component.accessToken,
    template: '<div class="col-4 instagram-image"><a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" /></a></div>',
    limit: 6,
  });
  
  if (document.getElementById('instafeed')) {
    feed.run();
  } 

  return (
    <Container className='py-0 pb-5 align-items-center'>
      <h3 className="subtitle mb-4 mt-5 text-center">
        {component.instagram_title}
      </h3>
      <Row className='py-md-5' id='instafeed'></Row>
      <Row>
        <Col xs='12' lg='12' className='text-center'>
          <FlipButton
            className="d-block d-md-inline-block"
            href={ component.instagram_link }
            target="_blank"
            rel="noopener noreferrer"
          >
            { component.instagram_button }
          </FlipButton>
        </Col>
      </Row>
    </Container>
  );
};

InstagramSection.propTypes = {
  component: PropTypes.any,
};
