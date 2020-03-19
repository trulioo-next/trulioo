import classNames from 'classnames';
import React from 'react';

const DeliveryUnavailable = props => {
  const containerClasses = classNames(
    'container',
    'Section__container',
    'Delivery__section',
  );

  return (
    <div
      className="Section -bg-img"
      style={{
        backgroundColor: props.background_color,
        color: props.text_color,
      }}
    >
      <img
        className="Section__bgImage -desktop"
        src={props.background_image.url}
        style={{
          objectFit: props.background_size,
          objectPosition: props.background_position,
        }}
      />
      <div className={containerClasses}>
        <div className="row align-items-center">
          <div className="col col-6 Section__body">
            <h3 className="Section__title">{props.title}</h3>
            <div
              className="Section__content"
              dangerouslySetInnerHTML={{ __html: props.content }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryUnavailable;
