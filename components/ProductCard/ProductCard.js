import classNames from 'classnames';
import React from 'react';
import Link from 'next/link';

import Card from 'react-bootstrap/Card';

import './ProductCard.scss';

const ProductCard = ({ item }) => {
  let props = item;
  // console.log(props);

  let cardClasses = classNames('Card', '-product');

  let bodyClasses = classNames('Card__body', 'text-center');

  return (
    <Card className={cardClasses}>
      <Card.Body className={bodyClasses}>
        <div className="Card__image -contain -square">
          <img src={props.featured_image} />
        </div>
        <h3 className={classNames('h4', 'Card__title')}>{props.title}</h3>
        <div className="Card__content">
          <p>{props.excerpt}</p>
        </div>
      </Card.Body>
      <Link href={props.href}>
        <a className="Card__linkedFooter">
          <Card.Footer className="Card__footer d-flex justify-content-between">
            <span>View product details</span>
            <span>{props.calories} cal</span>
          </Card.Footer>
        </a>
      </Link>
    </Card>
  );
};

export default ProductCard;
