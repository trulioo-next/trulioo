import React from 'react';

import Container from 'react-bootstrap/Container';
import Slider from 'react-slick';

import './SectionTextSlider.scss';

const SectionTextSlider = ({
  corner_image,
  heading,
  slides,
  slider_settings,
}) => {
  const sliderSettings = {
    className: 'TextSlider',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: slider_settings.autoplaySpeed * 1000 || 10000,
  };

  return (
    <section className="Section -TextSlider">
      {heading && (
        <h2 className="Section__title">
          {heading.type === 'image' && heading.image ? (
            <img src={heading.image.url} alt={heading.image.alt} />
          ) : (
            heading.text
          )}
        </h2>
      )}
      {corner_image && (
        <img
          className="Section__cornerImage"
          src={corner_image.url}
          aria-hidden
        />
      )}
      <Slider {...sliderSettings}>
        {slides.map(({ content, settings }, index) => {
          return (
            <div key={index}>
              <div
                className="TextSlider__slide d-flex h-100 align-items-center justify-content-center"
                style={{
                  ...(settings.background && {
                    ...(settings.background.color && {
                      backgroundColor: settings.background.color,
                    }),
                    ...(settings.background.image && {
                      backgroundImage: `url(${settings.background.image.url})`,
                      backgroundPosition: settings.background.position,
                      backgroundSize: settings.background.size,
                    }),
                    ...(settings.text_color && { color: settings.text_color }),
                  }),
                }}
              >
                <Container
                  className="text-center h2 my-0"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

SectionTextSlider.defaultProps = {};

export default SectionTextSlider;
