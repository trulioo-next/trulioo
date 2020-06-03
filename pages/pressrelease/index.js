import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Error from 'next/error';
import classnames from 'classnames';

import fetch from 'isomorphic-unfetch';
import { useSelector, useDispatch } from 'react-redux';

import { reqPageDataAction } from '@/stores/page/actions';
import { reqPressReleaseAction } from '@/stores/pressRelease/actions';
import { pageDataSelector } from '@/stores/page/selectors';
import { pressDataSelector } from '@/stores/pressRelease/selectors';
import { selectYoastSettings } from '@/stores/app/selectors';

import Layout from '@/containers/Layout';
import SectionMaker from '@/components/SectionMaker';
import { HalfHero } from '@/components/HalfHero';
import { Search as SearchWithFilters } from '@/components/SearchWithFilters';
import { FlipButton } from '@/components/FlipButton';
import { ResourceCard } from '@/components/ResourceCard';
import { Container, Row, Col, CardDeck } from 'reactstrap';

const PressReleases = props => {
  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }


  const yoastDataSeo = useSelector(state =>  selectYoastSettings(state));
  let yoastSeo = yoastDataSeo && yoastDataSeo[0] && yoastDataSeo[0].yoast_meta ? yoastDataSeo[0].yoast_meta : ''

  const dispatch = useDispatch();

  useEffect(() => {

      // Dispatch Articles
      // dispatch(reqPressReleaseAction({ post_id: 1, offset:0, posts_per_page: 5 }));
      dispatch(reqPageDataAction({ payload:'pressrelease' }));

    if (window.location.hash) {
      scrollToAnchor(window.location.hash.replace('#', ''));
    }
  }, []);

  const [isSearching, setIsSearching] = useState(false);

  const onMore = () => {
    // TODO: Append next page of items.
  };

  const pageData = useSelector(state => pageDataSelector(state));
  const pressReleases = props.pressData;

  let acfData = pageData && pageData.acf_data ? pageData.acf_data : false;
  let featuredPosts = pressReleases && pressReleases.featured || false;
  let postsToRender = pressReleases && pressReleases.postList || false;

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
      {/* <SearchWithFilters /> */}
      {featuredPosts && (
        <section
          className={classnames(
            'resources-section featured-press bg-gray,',
            { 'd-none': isSearching },
          )}
        >
          <Container>
            <Row>
              <Col className="px-5 px-md-4">
                <h2 className="text-center text-sm-left mb-5">
                  Featured <span className="text-primary">news</span>
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
      <section className="press-section">
        <Container>
          <Row>
            <Col className="px-5 px-md-4">
              <h2 className="text-center text-sm-left mb-5">
                All <span className="text-primary">news</span>
              </h2>
            </Col>
          </Row>
          <Row>
            <div className="card-grid px-5 px-md-4">
          { postsToRender &&
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

PressReleases.getInitialProps = async ({ query, res, store }) => {
  // TODO: GET STATE DATA HERE
  //
  const initalState = store.getState();
  const pressData = initalState.pressRelease;
  return { query, pressData };
};

export default PressReleases;
