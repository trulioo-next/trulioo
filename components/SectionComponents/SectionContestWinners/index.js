import classNames from 'classnames';
import React from 'react';

import WinnersSlider from '@/components/WinnersSlider';

import './SectionContestWinners.scss';


const SectionContestWinners = ({settings, contests}) => {
  return  contests ? (
    <section className="Section -slider">
      <WinnersSlider {...settings} >
        {contests && contests.map(({ image, title, subtitle, winners_list, background_color, title_color, text_color }, slideIndex) => (
          <WinnersSlider.Item
            key={slideIndex}
            image={image}
            title={title}
            subtitle={subtitle}
            winners_list={winners_list}
            background_color={background_color}
            title_color={title_color}
            text_color={text_color}
          />
        ))}
      </WinnersSlider>
    </section>
  ) : (<section></section>);
};

SectionContestWinners.defaultProps = {};

export default SectionContestWinners;
