import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const FullWidthImage = ({ component }) => (
  <section>
    <img className="w-100" title={ component.image.title } alt={ component.image.alt } src={ component.image.url }/>
  </section>
);

FullWidthImage.propTypes = {
  component: PropTypes.object
};
