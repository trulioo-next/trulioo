import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import './Slider.scss';

const SliderItem = ({ image, title, text }) => (
  <figure className="Slider__item">
    <img
      className="Slider__image"
      src={image.url}
      width={image.width}
      height={image.height}
      alt={image.alt}
    />
    {(title || text) && (
      <figcaption className="Slider__caption">
        <h2 className="Slider__heading">{title}</h2>
        <div
          className="Slider__text"
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </figcaption>
    )}
  </figure>
);

const ImageSlider = props => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classNames('Slider', '-banner', props.className),
    cssEase: 'ease',
    arrows: props.arrows,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return <Slider {...settings}>{props.children}</Slider>;
};

ImageSlider.Item = SliderItem;
ImageSlider.propTypes = {
  arrows: PropTypes.bool,
  className: PropTypes.string,
};
ImageSlider.defaultProps = {
  arrows: false,
};

export default ImageSlider;
