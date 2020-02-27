
import React, { useEffect } from "react";
import { useDispatch } from 'react-redux';

import Error from "next/error";
 


const Page = (props) => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />
  }

   

  return (<>
    Page Data Here
    </>
  );
};

Page.getInitialProps = async ({ query, res }) => {

  // const postData = await getBlogPost(query.slug);

  // const posts = await getBlogPosts();

  // if ( (!postData || !posts) && res) {
  //   res.statusCode = 404;
  //   return { errorCode: 404 }
  // }

  // const { post, nextPost, previousPost } = postData;
  console.log('QUERY : ', query )

  return {}

};


export default Page;
