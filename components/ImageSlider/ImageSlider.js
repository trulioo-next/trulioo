import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Slider from 'react-slick';

import './ImageSlider.scss';

const SliderItem = ({ image, title, text, link }) => {
  const slide = (
    <figure className="ImageSlider__item">
      <img
        className="ImageSlider__image"
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
      />
      {(title || text) && (
        <figcaption className="ImageSlider__caption">
          <h2 className="ImageSlider__heading">{title}</h2>
          <div
            className="ImageSlider__text"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </figcaption>
      )}
    </figure>
  );

  if (link) {
    if (link.target) {
      return (
        <a
          className="d-block w-100"
          href={link.url}
          target={link.target}
          rel="noopener noreferrer"
        >
          {slide}
        </a>
      );
    }

    return (
      <Link href={link.url}>
        <a className="d-block w-100">{slide}</a>
      </Link>
    );
  }

  return slide;
};

const ImageSlider = props => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classNames('ImageSlider', props.className),
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
  children: PropTypes.node,
};
ImageSlider.defaultProps = {
  arrows: false,
};

export default ImageSlider;
