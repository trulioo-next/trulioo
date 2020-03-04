import classNames from 'classnames';
import React, { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import ChevronIcon from '@/static/images/caret-down.svg';

import './FAQ.scss';

const AccordionItem = props => {
  const [opened, setOpened] = useState(false);

  return (
    <li className={classNames('Accordion__item', { '-opened': opened })}>
      <div className="container">
        <Accordion.Toggle
          eventKey={`accordion-item-${props.i}`}
          className="Accordion__header"
          as="h3"
        >
          <span className="Accordion__heading">
            What is a 7-Eleven Gift Card?
          </span>
          <ChevronIcon className="Accordion__toggle" />
        </Accordion.Toggle>
      </div>
      <Accordion.Collapse
        eventKey={`accordion-item-${props.i}`}
        className="Accordion__collapse"
        onEntered={() => setOpened(true)}
        onExited={() => setOpened(false)}
      >
        <div className="container">{props.children}</div>
      </Accordion.Collapse>
    </li>
  );
};

const FAQSection = () => {
  let accordionIds = [0, 1];
  return (
    <section className="Section FAQ__section">
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>
              FAQs
              <br />
              <small>Frequently Asked Questions</small>
            </h2>
          </div>
        </div>
      </div>
      <Accordion as="ol" className="Accordion FAQ__accordion">
        {accordionIds.map(i => (
          <AccordionItem i={i} key={`accordion-item-${i}`}>
            <p>
              A 7-Eleven gift card is a gift card specifically for 7-Eleven
              Canada stores. You can use it to buy almost anything you want at
              7-Eleven. Want a Big Bite hot dog and a pop? You got it. Chips and
              a Slurpee drink? All yours. Beef jerky and a cappuccino? A little
              strange, but sure, why not?
            </p>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
