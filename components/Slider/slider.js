import React, { useState, useEffect, Fragment, useLayoutEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import api from '../../../services/api';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import truncate from 'truncate-html';
import { autop } from '@wordpress/autop';

import { ParallaxBackground, ParallaxContent } from '../Parallax';
import { FlipButton } from '../FlipButton';

export const SliderSection = ({ slides }) => {
  const dispatch = useDispatch();
  const [ loader, setLoader ] = useState(true);
  const [ getSlider, setSlider ] = useState(null);

  useEffect(() => {
    const loadHomepageSliderData = (sliderData) => dispatch(
      { type: 'HOMEPAGE_SLIDER', payload: sliderData }
    );

    const isMounted = loader;

    const fetchData = () => {
      if (slides.selected_tag.slug) {
        api.Content.postsBasedOnTags('post',slides.selected_tag.slug,5)
        .then((data) => {
          if (isMounted) {
            loadHomepageSliderData(data);
            setSlider(data);
          }
        });
      }
    };
    fetchData();
    return () => {
      setLoader(false);
    };
  });

  const sliderSettings = {
    dots: true,
    arrows: true,
    slidesToShow: 1,
    slidestoScroll: 1,
    responsive: [
      {
        breakpoint: 769,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  return (
    <section
      className="homepage-slider section"
    >
      {getSlider &&
        <Slider { ...sliderSettings }>
          { getSlider.map((item, index) => {
            let excerpt = '';

            if (item.content.post_excerpt) {
              excerpt = autop(item.content.post_excerpt);
            } else {
              excerpt = autop(truncate(item.content.post_content, 300, { keepWhitespaces: true, stripTags: true })).split('</p>')[0];
            }

            return(
              <div className="slide-wrapper" key={ index }>
                { item.acf.slider_image && (
                  <ParallaxBackground
                    background={ item.acf.slider_image }
                    { ...(item.acf.slider_circle && { circle: item.acf.slider_circle }) }
                    { ...(item.acf.slider_foreground && { foreground: item.acf.slider_foreground }) }
                  />
                ) }
                <Container className="d-flex align-items-center h-100 px-0">
                  <Row className="mx-n5 mx-md-n4">
                    <Col xs='12' md='7' className="px-5 text-white">
                      <ParallaxContent>
                        <h2 className="h2">{item.content.post_title}</h2>
                        <div className="mt-5" dangerouslySetInnerHTML={ { __html: excerpt } } />
                        <p className='slider-post-read-time-tags mt-5'>{ item.reading_time } min read.
                          { item.topics.length > 0 &&
                            <span>Key Topics:</span>
                          }
                        </p>

                        <ul className='p-0 d-inline-block m-0'>
                          { item.topics && item.topics.map((topic, index) => (index+1 == topic.length ? <li className="px-0 d-inline-block" key={ index }>{`${ topic.name } `}</li> : <li className="px-0 d-inline-block" key={ index }>{`${ topic.name },\u00A0` }</li>)
                          )}
                        </ul>
                      <FlipButton
                        className="d-block d-md-inline-block text-center mt-5"
                        href={ `/blog/${ item.content.post_name }` }
                        color="primary"
                      >Learn More</FlipButton>
                      </ParallaxContent>
                    </Col>
                  </Row>
                </Container>
              </div>
            );
          }) }
        </Slider>
      }
    </section>
  );
};

SliderSection.propTypes = {
  slides: PropTypes.object,
};
