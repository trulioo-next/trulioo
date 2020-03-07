import React, { useEffect, useState } from 'react';

import ImageSlider from './ImageSlider';

const SectionSlider = props => {
  // console.log('SECTION SLIDER  PROPS :: ', props);

  var settings = props.settings;

  return (
    <section className="Section">
      <ImageSlider {...settings}>
        {props.slides.map(({ image, title, text }, slideIndex) => (
          <ImageSlider.Item
            key={slideIndex}
            image={image}
            title={title}
            text={text}
          />
        ))}
      </ImageSlider>
    </section>
  );
};

SectionSlider.defaultProps = {};

export default SectionSlider;
