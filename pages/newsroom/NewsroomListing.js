import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import Error from "next/error";

import Layout from '@/containers/Layout/Layout'
import Header from '@/components/Header/Header'

import Hero from '@/components/Hero';
import SectionMaker from '@/components/SectionMaker';

import './Newsroom.scss';

import {
    reqNewsroomDataAction
} from "@/stores/newsroom/actions";

import { newsroomDataSelector } from "@/stores/newsroom/selectors";


const NewsroomListing = (props) => {
	if (props.errorCode) {
		return <Error statusCode={props.errorCode} />
   }
   
   let featurePost = [];
   let morePosts = [];
   let taxonomies = [];
   
   // --- Use the 'category' param to pre-select a category:
   let queryCategory = props.query.category ? props.query.category : '';
   const [selectedCategory, setSelectedCategory] = useState(queryCategory);
   if (selectedCategory !== queryCategory)
   {  setSelectedCategory(queryCategory);
   }
   // console.log("Selected category: " + selectedCategory);

   const filterPosts = (posts, category) => {
      return posts.filter(post => {
         if (category === '' || category === 'all')
         {  return true;
         }
         if (category === 'news')
         {  return post.terms.length < 1;
         }
         let inCategory = false;
         post.terms.forEach(term => {
            inCategory |= term.slug == category;
         });
         return inCategory;
      })
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
            { 'name': 'All', 'slug': 'all' },
            { 'name': 'News', 'slug': 'news' },
         ]
         taxonomies = [...defaultTaxonomies, ...newsroomData.taxonomies];

         if (selectedCategory !== '')
         {
            const validCategory = taxonomies.reduce((isValid, term) => {
               return isValid || (term.slug === selectedCategory);
            }, false);
            if (!validCategory)
            {  Router.push('/newsroom');
            }
         }
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
            <div className="Newsroom__Categories">
               { taxonomies.map((term, idx) => {
                     const href = term.slug === '' ? '/newsroom' : '/newsroom/[category]';
                     const url = term.slug === '' ? href : '/newsroom/' + term.slug;
                     const isSelected = (selectedCategory === term.slug) || (selectedCategory === '' && term.slug === 'all');
                     const btnClass = "Button" + (isSelected ? ' selected' : '');
                  return (
                     <Link href={href} as={url} key={idx}><div><a className={btnClass} >{term.name}</a></div></Link>
                  )})
               }
            </div>
         }
			{ featurePost && featurePost.length > 0 &&
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
         { morePosts && morePosts.length > 0 &&
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



NewsroomListing.getInitialProps = async ({ query, res }) => {
  return { query }
};


export default NewsroomListing;
