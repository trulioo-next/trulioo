import React, { useEffect, useState } from 'react';

import ImageSlider from './ImageSlider';

const SectionSlider = props => {
  // console.log('SECTION SLIDER  PROPS :: ', props);

  var settings = props.settings;

  return (
    <section>
      <ImageSlider {...settings}>
        {props.slides.map(({ image, title, content }, slideIndex) => (
          <ImageSlider.Item
            key={slideIndex}
            image={image}
            title={title}
            text={content}
          />
        ))}
      </ImageSlider>
    </section>
  );
};

SectionSlider.defaultProps = {};

export default SectionSlider;
