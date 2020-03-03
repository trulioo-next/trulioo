
import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import SectionMaker from "../../components/SectionMaker";

import Error from "next/error";

import {
    reqPageDataAction
} from "../../stores/page/actions";

import { pageDataSelector } from "../../stores/page/selectors";


const Page = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }
 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(reqPageDataAction({ payload: props.query.slug }));
    }, []);
  
    const pageData = useSelector(state => pageDataSelector(state));
    console.log('CLIENT SIDE PAGE DATA ', pageData )

  return (<>
    Page Data Here
    </>
  );
};

Page.getInitialProps = async ({ query, res }) => {
  return { query }
};


export default Page;
