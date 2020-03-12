import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import SectionMaker from "../../../components/SectionMaker";
import Layout from '../../../containers/Layout/Layout'
import Header from '../../../components/Header/Header'
import Hero from '@/components/Hero';
import Error from "next/error";
import {
    reqPageDataAction
} from "../../../stores/page/actions";
import { lastFourSelector } from "../../../stores/nutritionals/selectors";
import './Category.scss';
//
const Category = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }
  // Category Slug 
  // 
    
  const pageData = useSelector(state => lastFourSelector(props.query.slug));

  console.log('CATEGORY pageData :: >> ', pageData  ) 
 
   return ( 
    <Layout>
      <Header title="" />
      <Hero src="/static/images/placeholders/category.png" /> 
    </Layout>
  );
};
//
Category.getInitialProps = async ({ query, res, store }) => {
  return { query }
};
//
export default Category;
