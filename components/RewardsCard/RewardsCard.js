import classNames from 'classnames';
import React from 'react';

import Card from 'react-bootstrap/Card';

import './RewardsCard.scss';

const RewardsCard = ({ item }) => (
  <Card className="Card -rewards">
    <Card.Body className="Card__body text-center">
      <div className="Card__image">
        <img src={item.image_thumb} />
      </div>
      {item.bonus_value && (
        <div>
          <span className="Card__bonus">{item.bonus_value}</span>
        </div>
      )}
      <div className="Card__content">
        <p>{item.description}</p>
      </div>
    </Card.Body>
    <Card.Footer className="Card__footer text-center text-muted">
      <span className="Rewards__expiration">{item.expiration_label}</span>
    </Card.Footer>
  </Card>
);

export default RewardsCard;
