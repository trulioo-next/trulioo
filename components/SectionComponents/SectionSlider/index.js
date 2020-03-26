import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import ImageSlider from '@/components/ImageSlider';

import './SectionSlider.scss';

const SectionSlider = props => {
  // console.log('SECTION SLIDER  PROPS :: ', props);

  var settings = props.settings;

  return (
    <section className="Section -slider">
      <ImageSlider
        className={classNames({
          '-hasCaption': props.slides.some(slide => {
            return slide.title || slide.content;
          }),
        })}
        {...settings}
      >
        {props.slides.map(({ image, title, content, link }, slideIndex) => (
          <ImageSlider.Item
            key={slideIndex}
            image={image}
            title={title}
            text={content}
            link={link}
          />
        ))}
      </ImageSlider>
    </section>
  );
};

SectionSlider.defaultProps = {};

export default SectionSlider;
