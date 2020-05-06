import classNames from 'classnames';
import React from 'react';
import Slider from 'react-slick';

import './ProductSlider.scss';

const ProductSliderItem = props => {
  return <div className="ProductSlider__item">{props.children}</div>;
};

const ProductSlider = props => {
  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: classNames('ProductSlider', props.className),
    cssEase: 'ease',
    arrows: true,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 577,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return <Slider {...settings}>{props.children}</Slider>;
};

ProductSlider.Item = ProductSliderItem;

export default ProductSlider;
