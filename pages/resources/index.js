import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Error from 'next/error';
import classnames from 'classnames';

import fetch from 'isomorphic-unfetch';
import { useSelector, useDispatch } from 'react-redux';

import { reqPageDataAction } from '@/stores/page/actions';
import { reqResourcesAction } from '@/stores/resources/actions';
import { pageDataSelector } from '@/stores/page/selectors';
import { resourceDataSelector } from '@/stores/resources/selectors';
import { selectYoastSettings } from '@/stores/app/selectors';

import Layout from '@/containers/Layout';
import SectionMaker from '@/components/SectionMaker';
import { HalfHero } from '@/components/HalfHero';
import { Search as SearchWithFilters } from './SearchWithFilters';
import { FlipButton } from '@/components/FlipButton';
import { ResourceCard } from '@/components/ResourceCard';
import { Container, Row, Col, CardDeck } from 'reactstrap';

const Resources = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const yoastDataSeo = useSelector(state =>  selectYoastSettings(state));
  let yoastSeo = yoastDataSeo && yoastDataSeo[0] && yoastDataSeo[0].yoast_meta ? yoastDataSeo[0].yoast_meta : ''


  const dispatch = useDispatch();
  useEffect(() => {
    // Get page data
    dispatch(reqPageDataAction({ payload: 'resources' }));

    // Dispatch action for resources
    // dispatch(reqResourcesAction({ payload: 1 }));
  }, []);

  const [isSearching, setIsSearching] = useState(false);
  const [ removeFeatured, setRemoveFeatured ] = useState(false);

  const onMore = () => {
    // TODO: Append next page of items.
  };

  const pageData = useSelector(pageDataSelector);
  const resources = props.resourcePosts

  let acfData = pageData && pageData.acf_data ? pageData.acf_data : false;

  let featuredPosts = resources.featured;
  let postsToRender = resources.postList;

  function callBack(value) {
    setRemoveFeatured(value)
  }

  let data =
  pageData && pageData.acf_data && pageData.acf_data.content_block_collection
    ? pageData.acf_data
    : false;

  let seoTitle = data && pageData && pageData.seo && pageData.seo.title !== '' ? pageData.seo.title : 'Trulioo'
  let seoDesc = data && pageData && pageData.seo ? pageData.seo.desc : ''
  let seoImage = data && pageData && pageData.seo ? pageData.seo.facebook_image : ''


  return (
    <Layout>
      <NextSeo
          title={seoTitle}
          description={seoDesc}
          openGraph={{
            url: 'https://trulioo.com/',
            title: seoTitle,
            description: seoDesc,
            images: [
              {
                url: seoImage,
                width: 800,
                height: 600,
                alt: 'Trulioo',
              },

              { url: seoImage },
            ],
            site_name: 'https://trulioo.com',
          }}
          twitter={{
            handle: '@trullio',
            site: '@trullio',
            cardType: 'summary_large_image',
          }}
          additionalMetaTags={yoastSeo}
        />
      {acfData.hero && <HalfHero component={acfData.hero} />}
      <SearchWithFilters callBack={ (value) => callBack(value) } type='resources' />
      { !removeFeatured && (
        <section
          className={classnames(
            'resources-section featured-resources bg-gray,',
            { 'd-none': isSearching },
          )}
        >
          <Container>
            <Row>
              <Col className="px-5 px-md-4">
                <h2 className="text-center text-sm-left mb-5">
                  Featured <span className="text-primary">resources</span>
                </h2>
              </Col>
            </Row>
            <Row>
              <CardDeck className="px-5 px-md-4">
                {featuredPosts.map((item, index) => (
                  <ResourceCard key={index} item={item} />
                ))}
              </CardDeck>
            </Row>
          </Container>
        </section>
      )}
      <section className="resources-section">
        <Container>
          <Row>
            <Col className="px-5 px-md-4">
              <h2 className="text-center text-sm-left mb-5">
                All <span className="text-primary">resources</span>
              </h2>
            </Col>
          </Row>
          <Row>
            <div className="card-grid px-5 px-md-4">
              {postsToRender &&
                postsToRender.map((post, index) => (
                  <ResourceCard item={post} key={index} />
                ))}
            </div>
          </Row>
          <Row className="mt-5 justify-content-center">
            <Col xs="12" md="4" className="col-lmd-3 px-5 px-md-4">
              <FlipButton
                outline
                block
                size="sm"
                color="primary"
                onClick={onMore}
              >
                Load More
              </FlipButton>
            </Col>
          </Row>
        </Container>
      </section>
      {acfData.content_block_collection &&
        acfData.content_block_collection.map((section, sectionKey) => (
          <SectionMaker
            type={section.acf_fc_layout}
            params={section}
            key={sectionKey}
            sectionIndex={sectionKey}
            props={{ ...props }}
          />
        ))}
    </Layout>
  );
};

Resources.getInitialProps = async ({ query, res, store }) => {
  // TODO: GET STATE DATA HERE
  //
  const initalState = store.getState();
  const pageData = initalState.page.data;
  const resourcePosts = initalState.resources;
  return { query, pageData, resourcePosts };
};

export default Resources;
