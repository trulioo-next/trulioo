import React, { useEffect, useState } from 'react';

import ImageSlider from '@/components/ImageSlider';

import './SectionSlider.scss';

const SectionSlider = props => {
  // console.log('SECTION SLIDER  PROPS :: ', props);

  var settings = props.settings;

  return (
    <section className="Section -slider">
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
