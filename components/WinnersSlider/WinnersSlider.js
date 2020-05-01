import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import Slider from 'react-slick';

import './WinnersSlider.scss';


const WinnersSliderItem = ({ image, title, winners_list, title_color, text_color }) => {

  let winnersList = [];
  if (winners_list)
  { winnersList = winners_list.split(/\r?\n/);
  }
  const numWinners = winnersList.length;
  const numColumns = Math.max(1, Math.min(3, parseInt(Math.ceil(numWinners / 20))));

  const listClasses = classNames('WinnersSlider__winnersList', 'columns-'+numColumns);

  const slide = (
    <figure className="WinnersSlider__item" >
      {title && (
        <div className="WinnersSlider__header">
          <h2 className="WinnersSlider__title"
              style={{color: title_color || 'auto'}}
              >{title}</h2>
        </div>
      )}
      <img
        className="WinnersSlider__image"
        src={image.url}
        width={image.width}
        height={image.height}
        alt={image.alt}
      />
      {winnersList &&
        <div  className={listClasses}
              style={{color: text_color || 'auto'}}
              >
          {winnersList.map((winnerName, idx) => (
            <React.Fragment key={idx}>{winnerName} from Somewhere Far Away, ON<br/></React.Fragment>
          ))}
        </div>
      }
    </figure>
  );
  
  return slide;
};


const WinnersSlider = props => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: classNames('WinnersSlider', props.className),
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

  return <Slider {...settings} >{props.children}</Slider>;
};


WinnersSlider.Item = WinnersSliderItem;
WinnersSlider.propTypes = {
  arrows: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};
WinnersSlider.defaultProps = {
  arrows: false,
};

export default WinnersSlider;