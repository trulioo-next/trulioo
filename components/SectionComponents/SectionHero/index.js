import React, { useEffect, useState } from 'react';

import Hero from '@/components/Hero';

const SectionHero = props => {
  // console.log('SectionHero  PROPS :: ', props);

  return (
    <Hero src={props.image.url} bgColor={props.background_color}>
      <Hero.Title
        title={props.title}
        color={props.title_color}
        as={props.sectionIndex === 0 ? 'h1' : 'h2'}
        shadow={props.title_shadow}
      />
      <Hero.Caption color={props.text_color}>{props.content}</Hero.Caption>
    </Hero>
  );
};

SectionHero.defaultProps = {};

export default SectionHero;
