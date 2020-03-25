import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Error from 'next/error';
import { reqPageDataAction } from '@/stores/page/actions';
import { pageDataSelector } from '@/stores/page/selectors';

import Layout from '@/containers/Layout';
import Header from '@/components/Header';
import Accordion from 'react-bootstrap/Accordion';
import ProductSlider from '@/components/ProductSlider';
import ProductCard from '@/components/ProductCard';
import SectionMaker from '@/components/SectionMaker';

import ChevronIcon from '@/static/images/caret-down.svg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Product.scss';

const Nutritionals = props => {
  const [opened, setOpened] = useState(false);

  let nutritionalInfo = {
    'Serving Size': '120g',
    'Total Fat': '11g',
    'Trans Fat': '0g',
    Sodium: '740mg',
    'Dietary Fibre': '2g',
    Protein: '16g',
    'Vitamin C (DV)': '6%',
    'Iron (DV)': '25%',
    'Calories (kcal)': '370',
    'Saturated Fat': '5g',
    Cholestrol: '20mg',
    Carbohydrates: '48g',
    Sugars: '3g',
    'Vitamin A (DV)': '6%',
    'Calcium (DV)': '20%',
  };

  let ingredients = [...Array(48).keys()];
  console.log(ingredients);

  return (
    <section className="Section">
      <Container className="Section__container">
        <Accordion className="Accordion -product">
          <div className={classNames('Accordion__item', { '-opened': opened })}>
            <Accordion.Toggle
              eventKey="nutritionals"
              className="Accordion__header"
            >
              <span className="Accordion__heading">
                Nutritional Information
              </span>
              <ChevronIcon className="Accordion__toggle" />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="nutritionals"
              className="Accordion__collapse"
              onEntered={() => setOpened(true)}
              onExited={() => setOpened(false)}
            >
              <dl className="Product__nutritionals">
                {Object.entries(nutritionalInfo).map(([key, value], i) => (
                  <div
                    key={`nutritional-item-${i}`}
                    className="Product__nutritionalsItem"
                  >
                    <dt>{key}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="Product__nutritionalsItem -dailyValue">
                  <dt className="sr-only">% DV</dt>
                  <dd>
                    % DV = % Daily Value. Learn how to use % Daily Value at
                    Health Canada
                  </dd>
                </div>
              </dl>
            </Accordion.Collapse>
          </div>
          <div className={classNames('Accordion__item', { '-opened': opened })}>
            <Accordion.Toggle
              eventKey="ingredients"
              className="Accordion__header"
            >
              <span className="Accordion__heading">Ingredients</span>
              <ChevronIcon className="Accordion__toggle" />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="ingredients"
              className="Accordion__collapse"
              onEntered={() => setOpened(true)}
              onExited={() => setOpened(false)}
            >
              <ul className="Product__ingredients">
                {ingredients.map((item, i) => (
                  <li
                    className="Product__ingredientsItem"
                    key={`ingredient-${i}`}
                  >
                    Ingredient {item}
                  </li>
                ))}
              </ul>
            </Accordion.Collapse>
          </div>
        </Accordion>
      </Container>
    </section>
  );
};

const ProductHeader = props => {
  let productDetails = [
    'Locally made in Surrey, BC',
    'Baked to order (whole)',
    'Hand panned and edged',
    'Hot from even (slices)',
    'Canadian Ingredients',
  ];

  return (
    <header className="Section Product__header">
      <div className="Product__image">
        <img src="/static/images/placeholders/Product_HeaderImage.jpg" />
      </div>
      <div className="Product__description text-center">
        <h1 className="Product__title">Pepperoni Pizza</h1>
        <div className="Product__content">
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
            Lorem ipsum dolor
          </p>
        </div>
      </div>
      <div className="Product__details">
        <ul className="Product__detailList">
          {productDetails.map((detail, i) => (
            <li key={`product-detail-${i}`} className="Product__detail">
              {detail}
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

const Product = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }
  //
  // Product Slug
  //
  console.log('Product SLUG :: >> ', props.query.slug);

  let relatedData = [
    {
      title: 'Extreme Meat',
      featured_image: '/static/images/placeholders/Related_ExtremeMeat.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/extreme-meat',
      calories: 20,
    },
    {
      title: 'Triple Cheese Pizza',
      featured_image: '/static/images/placeholders/Related_Cheese.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/triple-cheese',
      calories: 20,
    },
    {
      title: 'Pepperoni',
      featured_image: '/static/images/placeholders/Related_Pepperoni.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/pepperoni',
      calories: 20,
    },
    {
      title: 'Another Pizza',
      featured_image: '/static/images/placeholders/Related_ExtremeMeat.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/another',
      calories: 20,
    },
    {
      title: 'Triple Cheese Pizza',
      featured_image: '/static/images/placeholders/Related_Cheese.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/triple-cheese',
      calories: 20,
    },
    {
      title: 'Extreme Meat',
      featured_image: '/static/images/placeholders/Related_ExtremeMeat.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/extreme-meat',
      calories: 20,
    },
    {
      title: 'Pepperoni',
      featured_image: '/static/images/placeholders/Related_Pepperoni.png',
      excerpt: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed',
      href: '/menu/pizza/pepperoni',
      calories: 20,
    },
  ];

  return (
    <Layout>
      <Header title="" />
      <div className="Product__page">
        <ProductHeader />
        <Nutritionals />
        <section className="Section -related">
          <Container>
            <Row>
              <Col className="text-center">
                <h2 className="Section__heading">Related Products</h2>
              </Col>
            </Row>
          </Container>
          <ProductSlider>
            {relatedData.map((item, i) => (
              <ProductSlider.Item key={`product-slider-item-${i}`}>
                <ProductCard item={item} />
              </ProductSlider.Item>
            ))}
          </ProductSlider>
        </section>
      </div>
    </Layout>
  );
};
//
Product.getInitialProps = async ({ query, res }) => {
  return { query };
};
//
export default Product;
