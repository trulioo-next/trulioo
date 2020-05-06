import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const FinePrint = () => (
  <section className="Section">
    <Container className="Section__container">
      <Row className="justify-content-center">
        <Col xs="12" md="10" lg="9" className="col">
          <Row className="text-center my-md-1 fineprint">
            <Col>
			        Program available only to members of the 7Rewards® Program and available only at participating 7-Eleven® stores,
              excluding Hawaii. Go to the 7-Eleven Mobile App for additional terms and conditions of 7Rewards. Points exclude
              services, fuel, and age-restricted items including tobacco, lottery, and alcohol.
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </section>
);

export default FinePrint;
