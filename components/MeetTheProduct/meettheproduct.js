import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardFooter,
} from 'reactstrap';
import Slider from 'react-slick';
import { FlipButton } from '../FlipButton';

import { convertFullURL } from '../utilities/convertURL';

export const MeetTheProduct = ({ component }) => {
  const [active, setActive] = useState(0);

  const sliderSettings = {
    arrows: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    beforeChange: (current, next) => setActive(next),
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          centerPadding: '34px',
          dots: true,
        },
      },
    ],
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });

  const visibleSlides = width >= 1024 ? 3 : width >= 768 ? 2 : 1;

  return (
    <section
      className={classnames('section meet-the-products')}
      id={component.anchor}
    >
      <Container fluid className="position-relative px-0 px-md-4">
        <h2 className="title text-center d-flex align-items-center justify-content-center">
          {component.icon && (
            <span className="icon mr-3">
              <img
                className="d-inline-block"
                src={component.icon.url}
                alt={component.icon.alt}
                width={component.icon.width}
                height={component.icon.height}
              />
            </span>
          )}
          <span
            className="d-inline-block"
            dangerouslySetInnerHTML={{ __html: component.title }}
          />
        </h2>
        {component.products && (
          <Container>
            <Slider {...sliderSettings}>
              {component.products.map((product, index) => (
                <Card
                  key={index}
                  className={classnames(
                    'd-flex border-0',
                    {
                      'opacity-100':
                        index >= active &&
                        index <= active + (visibleSlides - 1),
                    },
                    {
                      'opacity-0':
                        index < active - 1 || index > active + visibleSlides,
                    },
                  )}
                >
                  <CardImg
                    className="d-block"
                    top
                    width="100%"
                    src={product.image.url}
                    alt={product.image.alt}
                  />
                  <CardBody>
                    <CardTitle tag="h3" className="mb-4">
                      {product.title}
                    </CardTitle>
                    <ul className="d-block px-0">
                      {product.icons &&
                        product.icons.map((icon, index) => (
                          <li
                            key={index}
                            className={`d-inline-block ${
                              product.icons.length === index + 1
                                ? 'mr-0'
                                : 'mr-3 mr-md-4'
                            } pl-0`}
                          >
                            <div className="icon product-icon">
                              <img
                                className="d-inline-block"
                                src={icon.image.url}
                                alt={icon.image.alt}
                                title={icon.image.title}
                              />
                            </div>
                          </li>
                        ))}
                    </ul>
                    <CardText
                      tag="div"
                      className="mt-4 content-block"
                      dangerouslySetInnerHTML={{
                        __html: product.paragraph || 'No HTML',
                      }}
                    />
                  </CardBody>
                  {product.link && (
                    <CardFooter className="bg-transparent border-0">
                      <FlipButton
                        color="primary"
                        size="sm"
                        block
                        title={product.link.title}
                        href={product.link.url}
                        {...(product.link.target && {
                          target: product.link.target,
                          rel: 'noopener noreferrer',
                        })}
                      >
                        {product.link.title}
                      </FlipButton>
                    </CardFooter>
                  )}
                </Card>
              ))}
            </Slider>
          </Container>
        )}
      </Container>
    </section>
  );
};

MeetTheProduct.propTypes = {
  component: PropTypes.object,
};
