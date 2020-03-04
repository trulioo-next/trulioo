import classNames from 'classnames';
import React from 'react';
import { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

import Button from '@/components/Button';

import './Get7Rewards.scss';

const Form = () => (
  <form id="rewards-opt-in-form" className="RewardsOptIn__form">
    <div class="form-group">
      <label for="rewards-opt-in-mobile-number" class="sr-only">Mobile Number:</label>
      <input
        type="text"
        class="Modal__input"
        id="rewards-opt-in-mobile-number"
        name="rewards-opt-in-mobile-number"
        size="10"
        placeholder="Phone Number (XXX-XXX-XXXX)"
      />
    </div>
    <div className="form-group text-center d-flex justify-content-center">
      <div className="col-10">
        <Button type="submit" className="w-100">
          Get It Started
        </Button>
      </div>
    </div>
  </form>
);

const Get7RewardsSection = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section
      className="Section Get7Rewards__section"
      style={{
        backgroundImage:
          "url('/static/images/placeholders/Get7Rewards_Background.jpg')",
      }}
    >
      <div className="container d-flex align-items-stretch justify-content-center">
        <div className="row align-items-center">
          <div className="col col-8 offset-4 text-center col-lg-5 offset-lg-7 text-lg-left">
            <h2 className="Get7Rewards__heading">Get 7Rewards</h2>
            <h3 className="Get7Rewards__subheading">Lead the pack!</h3>
            <p>
              Sign up for 7Rewards and we’ll hit you up with sweet deals and our
              latest, greatest offerings. Because having the hookups is cool.
              And being cool is hot.
            </p>
            <Button onClick={handleShow}>Learn More</Button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} className="Get7Rewards__modal" centered>
          <Modal.Header closeButton>
            <h2 className="Modal__heading">Sign Up</h2>
            <h3 className="Modal__subheading">Notifications via SMS</h3>
          </Modal.Header>
          <Modal.Body>
            <p>Want to know about sick deals, and hot news before anyone else does? Give us your number so we can keep you in the loop.</p>
            <Form />
          </Modal.Body>
        </Modal>
    </section>
  );
};

export default Get7RewardsSection;
