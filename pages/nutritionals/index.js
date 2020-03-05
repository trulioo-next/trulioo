
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'

import Error from "next/error";

import {
    reqNutritionalsAction
} from "../../stores/nutritionals/actions";

import { nutritionalsSelector } from "../../stores/nutritionals/selectors";


const Page = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reqNutritionalsAction({}));
    }, []);
  
  const nutritionals = useSelector(state => nutritionalsSelector(state));
  console.log('MENU ITEMS AS nutritionals:: ', nutritionals )
 
   return ( 
      <Layout>
        <Header title="Nutritionals" />
      </Layout>


  );
};

Page.getInitialProps = async ({ query, res }) => {
  return { query }
};


export default Page;
