import React from 'react';

import Media from 'react-bootstrap/Media';

import './RewardItem.scss';

const RewardItem = ({ as, type, data, ...props }) => {
  return (
    <Media as={as} className="RewardItem">
      <img className="RewardItem__image" src={data.image_thumb} />
      <Media.Body>
        {data.title && <h4 className="RewardItem__title">{data.title}</h4>}
        {data.description && (
          <div className="RewardItem__description">
            <p>{data.description}</p>
          </div>
        )}
        {data.expiration_label && (
          <p className="text-muted">{data.expiration_label}</p>
        )}
        {type === 'reward' && (
          <button type="button" className="RewardItem__redeemLink">
            Redeem
          </button>
        )}
      </Media.Body>
    </Media>
  );
};

export default RewardItem;
