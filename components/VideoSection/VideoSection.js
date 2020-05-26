import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ReactPlayer from 'react-player';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import PlayIcon from '@/static/assets/play.svg';

const ReactPlayerWrapper = ({ children }) => (
  <div className="react-player-wrapper">{ children }</div>
);

export const VideoSection = ({ component }) => (
  <section className="video-player-section">
    <Container className="py-5">
      { component.heading &&
        <Row className="mb-4 mb-md-5">
          <Col>
          { component.heading && <h2 className="text-center mb-5" dangerouslySetInnerHTML={ { __html: component.heading } } /> }
          </Col>
        </Row>
      }
      <Row className={ classnames( { 'mt-md-n3' : component.heading ? true : false } ) }>
        <Col className="px-0 px-md-4">
          <div className="embed-responsive embed-responsive-16by9">
            <ReactPlayer
              playing={ true }
              url={ component.video_url.url }
              controls
              width='100%'
              height='100%'
              light={ true }
              wrapper={ ReactPlayerWrapper }
              playIcon={ <PlayIcon className="react-player-play-icon" /> }
            />
          </div>
        </Col>
      </Row>
    </Container>
  </section>
);

ReactPlayerWrapper.propTypes = {
  children: PropTypes.node,
};

VideoSection.propTypes = {
  component: PropTypes.object,
};

