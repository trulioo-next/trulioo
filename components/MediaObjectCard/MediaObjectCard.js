import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './MediaObjectCard.scss';

const MediaCard = props => {
  let cardClasses = classNames(
    'Card',
    '-mediaObject',
    { '-pizza': props.pizza },
    { '-stacked': props.stacked },
  );

  let bodyClasses = classNames(
    'Card__body',
    'text-left',
    {
      'text-md-center': props.stacked,
    },
    props.className,
  );

  return (
    <Card className={cardClasses}>
      <Card.Body className={bodyClasses}>
        <Row>
          <Col className="col" xs="5" md={props.stacked ? 12 : 5}>
            <div className="Card__image -square -contain">
              <img src={props.image} />
            </div>
          </Col>
          <Col className="col" xs="7" md={props.stacked ? 12 : 7}>
            <h2
              className={classNames(props.stacked ? 'h4' : 'h3', 'Card__title')}
            >
              {props.title}
            </h2>
            {props.children}
          </Col>
        </Row>
      </Card.Body>
      {props.product && (
        <Link href={props.product.href}>
          <a className="Card__linkedFooter">
            <Card.Footer className="Card__footer d-flex justify-content-between">
              <span>View product details</span>
              <span>{props.product.calories} cal</span>
            </Card.Footer>
          </a>
        </Link>
      )}
    </Card>
  );
};

export default MediaCard;
