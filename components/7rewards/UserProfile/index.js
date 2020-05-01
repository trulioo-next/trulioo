import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

export class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.data,
      showModal: false,
    };
  }

  render() {
    let provinces = [
      { name: '', value: '' },
      { name: 'Alberta', value: 'AB' },
      { name: 'British Columbia', value: 'BC' },
      { name: 'Manitoba', value: 'MB' },
      { name: 'New Brunswick', value: 'NB' },
      { name: 'Newfoundland & Labrador', value: 'NL' },
      { name: 'Northwest Territories', value: 'NT' },
      { name: 'Nova Scotia', value: 'NS' },
      { name: 'Nunavut', value: 'NU' },
      { name: 'Ontario', value: 'ON' },
      { name: 'Prince Edward Island', value: 'PE' },
      { name: 'Québec', value: 'QC' },
      { name: 'Saskatchewan', value: 'SK' },
      { name: 'Yukon', value: 'YT' },
    ];

    let genders = [
      { name: 'Prefer not to say', value: '' },
      { name: 'Male', value: 'Male' },
      { name: 'Female', value: 'Female' },
    ];

    return (
      <div className="p-5">
        <div className="d-flex w-100 align-items-end justify-content-between">
          <h2 className="h6 m-0">Profile</h2>
          <Button
            type="button"
            variant="dark"
            onClick={() => this.setState({ showModal: true })}
          >
            Edit
          </Button>
          <Modal
            show={this.state.showModal}
            onHide={() => this.setState({ showModal: false })}
          >
            <Modal.Header closeButton />
            <Modal.Body>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="edit-first-name">
                      <Form.Label className="small">First Name</Form.Label>
                      <Form.Control
                        size="lg"
                        value={this.state.user.first_name}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="edit-last-name">
                      <Form.Label className="small">Last Name</Form.Label>
                      <Form.Control
                        size="lg"
                        value={this.state.user.last_name}
                      />
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Group controlId="edit-email">
                  <Form.Label className="small">Email Address</Form.Label>
                  <Form.Control
                    size="lg"
                    as="input"
                    type="email"
                    value={this.state.user.email}
                  />
                </Form.Group>
                <Form.Group controlId="edit-mobile-number">
                  <Form.Label className="small">Mobile Number</Form.Label>
                  <Form.Control
                    size="lg"
                    as="input"
                    type="tel"
                    value={this.state.user.mobile_number}
                  />
                </Form.Group>
                <Form.Group>
                  <span className="d-block small mb-2">Password</span>
                  <Button variant="dark" type="button">
                    Change Password
                  </Button>
                </Form.Group>
                <Form.Group controlId="edit-address-line-1">
                  <Form.Label className="small">Address Line 1</Form.Label>
                  <Form.Control
                    size="lg"
                    value={this.state.user.address_line_1}
                  />
                </Form.Group>
                <Form.Group controlId="edit-address-line-2">
                  <Form.Label className="small">Address Line 2</Form.Label>
                  <Form.Control
                    size="lg"
                    value={this.state.user.address_line_2}
                  />
                </Form.Group>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="edit-city">
                      <Form.Label className="small">City</Form.Label>
                      <Form.Control size="lg" value={this.state.user.city} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="edit-province">
                      <Form.Label className="small">Province</Form.Label>
                      <Form.Control
                        size="lg"
                        as="select"
                        value={this.state.user.state_or_province}
                      >
                        {provinces.map((province, index) => (
                          <option key={index} value={province.value}>
                            {province.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Form.Row>
                <Form.Group controlId="edit-postal-code">
                  <Form.Label className="small">Postal Code</Form.Label>
                  <Form.Control size="lg" value={this.state.user.postal_code} />
                </Form.Group>
                <Form.Group controlId="edit-gender">
                  <Form.Label className="small">Gender</Form.Label>
                  <Form.Control
                    size="lg"
                    as="select"
                    value={this.state.user.gender}
                  >
                    {genders.map((gender, index) => (
                      <option key={index} value={gender.value}>
                        {gender.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <button type="submit" className="Button mt-4">
                  Submit
                </button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
        <hr />
        <div className="mb-4">
          <span className="d-block py-2 small">Name</span>
          <span className="d-block">
            {this.state.user.first_name} {this.state.user.last_name}
          </span>
        </div>
        <div className="mb-4">
          <span className="d-block py-2 small">Account ID</span>
          <span className="d-block">{this.state.user.username}</span>
        </div>
        <div className="mb-4">
          <span className="d-block py-2 small">Email Address</span>
          <span className="d-block">{this.state.user.email}</span>
        </div>
        <div className="mb-4">
          <span className="d-block py-2 small">Birthdate</span>
          <span className="d-block">{this.state.user.birthdate}</span>
        </div>
      </div>
    );
  }
}

export default UserProfile;
