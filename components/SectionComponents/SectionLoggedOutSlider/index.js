import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ImageSlider from '@/components/ImageSlider';

import { useSelector, useDispatch } from 'react-redux';
import { userDataSelector } from '../../../stores/user/selectors';

import './SectionLoggedOutSlider.scss';

const SectionLoggedOutSlider = props => {
   
  var settings = props.settings;
  let dataLoaded = props.slides ? props.slides : false;


  const USER = useSelector(state => userDataSelector(state));
  console.log('USER DATA  ', USER )
  const isAuth = USER && USER.auth ? true : false;


  return  !isAuth && dataLoaded ? (
    <section className="Section loggedOut -slider">
      <ImageSlider
        className={classNames({
          '-hasCaption': props.slides.some(slide => {
            return slide.title || slide.content;
          }),
        })}
        {...settings}
      >
        {props.slides && props.slides.map(({ image, title, content, link }, slideIndex) => (
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
  ) : (<section></section>);
};

SectionLoggedOutSlider.defaultProps = {};

export default SectionLoggedOutSlider;
