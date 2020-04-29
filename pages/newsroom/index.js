import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';

import Layout from '../../containers/Layout/Layout'
import Header from '../../components/Header/Header'

import Hero from '@/components/Hero';
import SectionMaker from '@/components/SectionMaker';

import Error from "next/error";
import './Newsroom.scss';

import {
    reqNewsroomDataAction
} from "../../stores/newsroom/actions";

import { newsroomDataSelector } from "../../stores/newsroom/selectors";


const Page = (props) => {
	if (props.errorCode) {
		return <Error statusCode={props.errorCode} />
   }
   
   const [featurePost, setFeaturePost] = useState([]);
   const [allPosts, setAllPosts] = useState([]);
   const [morePosts, setMorePosts] = useState([]);
   
   const dispatch = useDispatch();
   useEffect(() => {
      const slug = props.query.slug || '';
      dispatch(reqNewsroomDataAction({ payload: slug}));
   }, []);

   const newsroomData = useSelector(state => newsroomDataSelector(state));

  
   useEffect(() => {
      if (newsroomData && newsroomData.allPosts && featurePost.length === 0)
      {  
         const posts = [...newsroomData.allPosts];
         setAllPosts([...posts]);
         setFeaturePost([...posts.slice(0, 1)]);
         setMorePosts([...posts.slice(1)]);
      }
   }, [newsroomData]);


   return ( 
        <Layout>
			<Header title="Newsroom" />
			<section className="Section">
				<Hero src="/static/images/placeholders/Newsroom_Banner.jpg">
					<Hero.Title title="Newsroom" color="#FFF" shadow />
				</Hero>
			</section>
			<div className="Newsroom__page">
			{ featurePost && featurePost.length &&
               <SectionMaker
                  type="section_newsroom_grid"
						sectionIndex="newsroomFeature"
                  params={ {
                        posts: [...featurePost],
                        isFeature: true,
                        canLoadMore: false,
                      } }
					/>
         }
         { morePosts && morePosts.length &&
					<SectionMaker
						type="section_newsroom_grid"
                  params={ {
                        posts: [...morePosts],
                        numPerPage: 12,
			               canLoadMore: true
                     } }
						sectionIndex="newsroomSection"
					/>
         }
         </div>
		</Layout>
  );
};



Page.getInitialProps = async ({ query, res }) => {
  return { query }
};


export default Page;
