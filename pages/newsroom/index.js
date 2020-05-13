import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';

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
   
   let featurePost = [];
   let morePosts = [];
   let taxonomies = [];
   
   // --- Use the 'category' param to pre-select a category:
   const [selectedCategory, setSelectedCategory] = useState(props.query.category ? props.query.category : '');
   console.log("Selected category: " + selectedCategory);


   const filterPosts = (posts, category) => {
      return posts.filter(post => {
         if (category === '')
         {  return true;
         }
         if (category === 'general')
         {  return post.terms.length < 1;
         }
         let inCategory = false;
         post.terms.forEach(term => {
            inCategory |= term.slug == category;
         });
         return inCategory;
      })
   }


   const categoryClicked = evt => {
      setSelectedCategory(evt.currentTarget.dataset.category);
   }


   const dispatch = useDispatch();
   useEffect(() => {
      const slug = props.query.slug || '';
      dispatch(reqNewsroomDataAction({ payload: slug}));
   }, []);

   const newsroomData = useSelector(state => newsroomDataSelector(state));

   if (newsroomData)
   {
      if (newsroomData.taxonomies)
      {
         const defaultTaxonomies = [
            { 'name': 'All', 'slug': '' },
            { 'name': 'General', 'slug': 'general' },
         ]
         taxonomies = [...defaultTaxonomies, ...newsroomData.taxonomies];
      }

      if (newsroomData.allPosts)
      {
         const posts = filterPosts([...newsroomData.allPosts], selectedCategory);
         featurePost = [...posts.slice(0, 1)];
         morePosts = [...posts.slice(1)];
      }
   }


   return ( 
        <Layout>
			<Header title="Newsroom" />
			<section className="Section">
				<Hero src="/static/images/placeholders/Newsroom_Banner.jpg">
					<Hero.Title title="Newsroom" color="#FFF" shadow />
				</Hero>
			</section>
         <div className="Newsroom__page">
			{taxonomies &&
            <div className="Newsroom__Categories ColumnSpread -spread-3">
               { taxonomies.map((term, idx) => (
                  <div><a className="Button" onClick={categoryClicked} data-category={term.slug} key={idx}>{term.name}</a></div>
                  ))
               }
            </div>
         }
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
