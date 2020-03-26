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
import { nutritionalsDataSelector } from '@/stores/nutritionals/selectors';
  
import ChevronIcon from '@/static/images/caret-down.svg';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './Product.scss';

const Nutritionals = props => {
  const [opened, setOpened] = useState(false);
  let nutritionals = props.data.nutritionals

  // TODO: Add this to the selector  
  let nutritionalInfo = {
    'Serving Size': nutritionals.serving_size,
    'Total Fat': nutritionals.total_fat,
    'Trans Fat': nutritionals.trans_fat,
    Sodium: nutritionals.sodium,
    'Dietary Fibre': nutritionals.dietary_fibre,
    Protein: nutritionals.protein,
    'Vitamin C (DV)': nutritionals.vitamin_c,
    'Iron (DV)': nutritionals.iron,
    'Calories (kcal)': nutritionals.calories,
    'Saturated Fat': 'nan',
    Cholestrol: nutritionals.cholesterol,
    Carbohydrates: nutritionals.carbohydrates,
    Sugars: nutritionals.sugars,
    'Vitamin A (DV)': nutritionals.vitamin_a,
    'Calcium (DV)': nutritionals.calcium,
  };

  let ingredients = [];
  if(props.data.ingredients) {
    let ing = props.data.ingredients;
    for(var i = 0; i < ing.length; i++) {
      ingredients.push(ing[i].ingredient)
    }

  }
   
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
  let productDetails = [ ];

  if(props.data.checkmark_section) {
    let checkmarks = props.data.checkmark_section;
    for(var i = 0; i < checkmarks.length; i++ ) {
       productDetails.push(checkmarks[i].point)
    }
  }

  let image = props.data.photos ? props.data.photos[0].url : "/static/images/placeholders/Product_HeaderImage.jpg"

  return (
    <header className="Section Product__header">
      <div className="Product__image">
        <img src={ image } />
      </div>
      <div className="Product__description text-center">
        <h1 className="Product__title">{ props.data.title }</h1>
        <div className="Product__content">
          <p>
           { props.data.description }
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

  let { category, slug } = props.query
  const categoryData = useSelector(state => nutritionalsDataSelector(state,category, slug));
  let { related } = categoryData;
  let relatedData = [];
  if(related) {
    relatedData = related;
  }

  return (
    <Layout>
      <Header title="" />
      <div className="Product__page">
        <ProductHeader data={categoryData} />
        <Nutritionals data={categoryData} />
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
