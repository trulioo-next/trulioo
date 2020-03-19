import classNames from 'classnames';
import React, { useState } from 'react';

import Accordion from 'react-bootstrap/Accordion';

import ChevronIcon from '@/static/images/caret-down.svg';

import './FAQ.scss';

const AccordionItem = ({ title, content, i }) => {
  const [opened, setOpened] = useState(false);

  return (
    <li className={classNames('Accordion__item', { '-opened': opened })}>
      <div className="container">
        <Accordion.Toggle
          eventKey={`accordion-item-${i}`}
          className="Accordion__header"
          as="h3"
        >
          <span className="Accordion__heading">{title}</span>
          <ChevronIcon className="Accordion__toggle" />
        </Accordion.Toggle>
      </div>
      <Accordion.Collapse
        eventKey={`accordion-item-${i}`}
        className="Accordion__collapse"
        onEntered={() => setOpened(true)}
        onExited={() => setOpened(false)}
      >
        <div
          className="container"
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </Accordion.Collapse>
    </li>
  );
};

const FAQ = ({ items }) => {
  return (
    <Accordion as="ol" className="Accordion FAQ__accordion">
      {items.map((item, i) => (
        <AccordionItem
          i={i}
          key={`accordion-item-${i}`}
          title={item.title}
          content={item.content}
        />
      ))}
    </Accordion>
  );
};

export default FAQ;
