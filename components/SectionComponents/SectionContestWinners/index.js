import classNames from 'classnames';
import React from 'react';

import WinnersSlider from '@/components/WinnersSlider';

import './SectionContestWinners.scss';


const SectionContestWinners = ({settings, contests}) => {
  return  contests ? (
    <section className="Section -slider">
      <WinnersSlider {...settings} >
        {contests && contests.map(({ image, title, winners_list, title_color, text_color }, slideIndex) => (
          <WinnersSlider.Item
            key={slideIndex}
            image={image}
            title={title}
            winners_list={winners_list}
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
