import React, { useState, Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import Slider from 'react-slick';

import { TeamMember } from './team-member';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

export const TeamSlider = ({ items }) => {
  // State for if Collapse should be open
  const [ opened, setOpened ] = useState();
  // State for current slide
  const [ expanded, setExpanded ] = useState(0);
  let sliderRef = useRef(null);

  const sliderSettings = {
    className: 'team-members',
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '80px',
    afterChange: current => {
      setExpanded(current);
    },
  };

  function viewSlide(i) {
    if (i === expanded) {
      setOpened(!opened);
    } else {
      sliderRef.slickGoTo(i);
      setExpanded(i);
    }
  };

  return (
    <Fragment>
      <Slider ref={ slider => sliderRef = slider } { ...sliderSettings }>
        { items.map((item, index) => {
          return (
            <TeamMember key={ index } i={ index } expanded={ opened ? expanded : false }>
              <TeamMember.Header info={ item } onClick={ () => viewSlide(index) }/>
            </TeamMember>
          );
        }
        )}
      </Slider>
      <Container className="px-5">
        <AnimatePresence exitBeforeEnter>
          { items.map((item, index) => {
            return (
              <TeamMember.Collapse key={ index } i={ index } expanded={ opened ? expanded : false } info={ item } />
            );
          }) }
        </AnimatePresence>
      </Container>
    </Fragment>
  );
};

TeamSlider.propTypes = {
  items: PropTypes.array,
};
