import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Media from 'react-bootstrap/Media';

import { reqRedeemAction } from '@/stores/user/actions';
import { userDataSelector } from '@/stores/user/selectors';


import './RewardItem.scss';

const RewardItem = ({ as, type, data, ...props }) => {


  const dispatch = useDispatch();
  const user = useSelector(state => userDataSelector(state));


  const redeemPoints = (code) => {
    dispatch(reqRedeemAction({ token: user.token, id:code, user }));
  } 


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
          <button type="button" className="RewardItem__redeemLink" onClick={ () => redeemPoints(data.id) }>
            Redeem
          </button>
        )}
      </Media.Body>
    </Media>
  );
};

export default RewardItem;
