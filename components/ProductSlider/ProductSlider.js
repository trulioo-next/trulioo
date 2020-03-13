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
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return <Slider {...settings}>{props.children}</Slider>;
};

ProductSlider.Item = ProductSliderItem;

export default ProductSlider;
