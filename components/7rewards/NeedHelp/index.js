import React, { Fragment } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './NeedHelp.scss';

const NeedHelpAdminText = () => (
  <Fragment>
    If you are having trouble, please{' '}
    <a
      href="http://survey.medallia.com/?711-need-help&feedback-area=1"
      target="_blank"
      rel="noopener noreferrer"
    >
      click here
    </a>{' '}
    and we’d be happy to help.
  </Fragment>
);

const NeedHelpText = () => (
  <Fragment>
    Call <a href="tel:18002550711">1-800-255-0711</a> Monday through Friday from
    7am to 11pm CST and a Customer Relations representative will be available to
    assist you or email us at <a href="mailto:7-11custrel@7-11.com">7-11custrel@7-11.com</a>. You may also provide feedback through our{' '}
    <a
      href="https://survey.medallia.com/?711-gr"
      target="_blank"
      rel="noopener noreferrer"
    >
      online survey
    </a>
    .
  </Fragment>
);

const NeedHelp = () => (
  <div className="Section NeedHelp SevenRewards__section">
    <Container className="Section__container">
      <Row className="justify-content-center">
        <Col xs="12" md="11" lg="9">
          <Row className="py-md-3">
            <Col className="col" xs="12" md="auto">
              <h2 className="NeedHelp__title mb-md-0">Need Help?</h2>
            </Col>
            <Col>
              <p>
                <NeedHelpText />
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </div>
);

NeedHelp.AdminText = NeedHelpAdminText;
NeedHelp.Text = NeedHelpText;

export default NeedHelp;
