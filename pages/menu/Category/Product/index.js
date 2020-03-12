import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SectionMaker from "../../../../components/SectionMaker";
import Layout from '../../../../containers/Layout/Layout'
import Header from '../../../../components/Header/Header'
import Hero from '@/components/Hero';
import Error from "next/error";
import {
    reqPageDataAction
} from "../../../../stores/page/actions";
import { pageDataSelector } from "../../../../stores/page/selectors";
import './Product.scss';

const Product = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }
  //
  // Product Slug 
  // 
  console.log('Product SLUG :: >> ', props.query.slug )   
 
   return ( 
    <Layout>
      <Header title="" />
      <Hero src="/static/images/placeholders/product.png" /> 
    </Layout>
  );
};
//
Product.getInitialProps = async ({ query, res }) => {
  return { query }
};
//
export default Product;
