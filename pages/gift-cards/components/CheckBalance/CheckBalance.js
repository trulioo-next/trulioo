import React, { useState } from 'react';

import Modal from 'react-bootstrap/Modal';

import Button from '@/components/Button';

const Form = () => (
  <form id="check-balance-form" className="CheckBalance__form">
    <div className="form-group">
      <label htmlFor="check-balance-card-number" className="sr-only">
        Gift Card Number:
      </label>
      <input
        type="text"
        className="Modal__input"
        id="check-balance-card-number"
        name="check-balance-card-number"
        placeholder="Gift Card Number"
      />
    </div>
    <div className="form-group">
      <div id="check-balance-captcha"></div>
    </div>
    <div className="form-group text-center d-flex justify-content-center">
      <div className="col-10">
        <Button type="submit" className="bg-primary text-white w-100">
          Check Your Balance
        </Button>
      </div>
    </div>
    <div id="check-balance-result" className="form-group">
      <p>
        Your balance is <strong>$</strong>
      </p>
    </div>
  </form>
);

const CheckBalanceSection = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <section className="Section CheckBalance__section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col col-7 d-none d-lg-block">
            <img src="/static/images/placeholders/GiftCards.png" />
          </div>
          <div className="col col-lg-5">
            <h2>The gift that keeps on giving!</h2>
            <p>
              Stuck on gift ideas for your fussy friend? Let them call the shots
              on fresh coffee, sandwiches, Slurpees, or Meatza pizza for two…
              they owe you, right?
            </p>
            <p>Have your own 7-Eleven Gift Cards?</p>
            <Button type="button" onClick={handleShow}>
              Check Your Balance
            </Button>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className="CheckBalance__modal"
          centered
        >
          <Modal.Header closeButton>
            <h2 className="Modal__heading">Check Your Balance</h2>
            <h3 className="Modal__subheading">
              How many Slurpees can you buy?
            </h3>
          </Modal.Header>
          <Modal.Body>
            <Form />
            <p>Have a question about your balance?</p>
            <p>
              Check out the Gift Card FAQ or give us a call at 1-866-520-4842.
            </p>
            <div className="row justify-content-center">
              <div className="col-10">
                <Button
                  href="/store-locator"
                  as="/store-locator"
                  className="w-100"
                >
                  Find A Store
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </section>
  );
};

export default CheckBalanceSection;
