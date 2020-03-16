import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import FAQ from './FAQ';

import './FAQ.scss';

const SectionFaq = props => {
  // console.log('FAQ PROPS :: ', props);

  return (
    <section
      className="Section FAQ__section"
      style={{
        backgroundColor: props.background_color,
        color: props.text_color,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>
              {props.title}
              {props.subtitle && <small>{props.subtitle}</small>}
            </h2>
          </div>
        </div>
      </div>
      <div className="container-fluid px-0">
        <FAQ items={props.faqs} />
      </div>
    </section>
  );
};

SectionFaq.defaultProps = {};

export default SectionFaq;
