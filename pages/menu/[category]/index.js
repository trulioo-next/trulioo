import React, { useState, useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Layout from '@/containers/Layout';
import Header from '@/components/Header';
// import appActions from '@/stores/nutritionals/actions';
import userSelectors from '@/stores/user/selectors';
// import menuSelectors from '@/stores/nutritionals/selectors';
import SectionMaker from '@/components/SectionMaker';
import Hero from '@/components/Hero';
import Container from 'react-bootstrap/Container';
import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';
import SectionPostGrid from '@/components/SectionComponents/SectionPostGrid';


import { reqNutritionalsAction } from '@/stores/nutritionals/actions';
import { taxonomiesSelector } from '@/stores/nutritionals/selectors';
 

import './Category.scss';



const Category = props => {
   
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reqNutritionalsAction({ isAuthenticated: false,  query: false }));
  // }, []);

  const close = false;
  const taxonomyData = useSelector(state => taxonomiesSelector(state));
 
  let category = props.query.category

  let selected = [];
  if(taxonomyData) {
    for(var i = 0; i < taxonomyData.length; i++ ) {
      if(taxonomyData[i].slug === category ) {
        selected = taxonomyData[i]
      }
    }
  }

  let headerTitle = 'Menu | ' + selected.name;
  let pageTitle = selected && selected.name ? selected.name : 'loading...';
  let defaultImage = selected && selected.image && selected.image.url ? selected.image.url : '/static/images/placeholders/Pizza_Hero.jpg';
  let headerImage = selected.banner_image
  ? selected.banner_image.url
  : defaultImage
   
  
  return (
     <Layout>
        <Header title={headerTitle} />
        <section className="Section">
          <Hero src={headerImage}>
            <Hero.Title title={pageTitle} color="#FFF" shadow />
          </Hero>
        </section>
        <div className="Menu__page">
          {selected.components &&
            selected.components.map((section, sectionKey) => (
              <SectionMaker
                type={section.acf_fc_layout}
                params={section}
                category={category}
                key={sectionKey}
                defaultImage={selected.image.url}
                sectionIndex={sectionKey}
              />
            ))}
 
        </div>
      </Layout>
  );
};

Category.getInitialProps = async ({ query, res, children }) => {
  return { query };
};

export default Category;






