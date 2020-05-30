import React, { useEffect, useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isNil } from 'lodash';
import SectionMaker from '../../../components/SectionMaker';
import Layout from '../../../containers/Layout';
 
import { pageDataSelector } from '../../../stores/page/selectors';
import { reqPageDataAction } from '../../../stores/page/actions';
import { reqArticlesAction } from '../../../stores/articles/actions';
import { articlesDataSelector } from '../../../stores/articles/selectors';
import moment from 'moment';
import { HalfHero }  from '../../../components/HalfHero';
import { PopularArticles } from '../../../components/PopularArticles';
import {
  MarketoBlog,
} from '../../../components/Marketo';

import { selectGeneralSettings } from '@/stores/app/selectors';
import classnames from 'classnames';

import {
  GroupPost
} from '../../../components/Post';

import HeartIcon from '../../../static/assets/heart.svg';

import {
  Container,
  Row,
  Col
} from 'reactstrap';

import { autop } from '@wordpress/autop';

const PostArticle = ({ post, liked, setLiked }) => {
  console.log(post);
  const content = post;
  return (
    <section className="blog-post-section">
    <Container className="px-5 px-md-4 py-5">
      <div className="mt-3 mb-4">
        <a href="/blog/">Back</a>
      </div>
      <article className="blog-post">
        <header className="post-header pb-md-4 mb-5">
          <Row>
            <Col xs="12" md="10" lg="9">
              <div className="post-meta h5 mb-3 mb-md-4">
                <time className="post-meta-item" dateTime={ post.content.post_date }>{ moment(post.content.post_date).format('MMMM D, YYYY') }</time>
                {/* { post.acf.show_author && (
                  <span className="post-meta-item author-info">
                    { post.author.username }, { post.author.description }
                  </span>
                )} */}
              </div>
              <h1 className="h2 mb-4">{post.content.post_title}</h1>
            </Col>
          </Row>
        </header>
        <Row>
          <Col xs="12" md="10" lg="9">
            <div className="post-content" dangerouslySetInnerHTML={ { __html: autop(post.content.post_content) } } />
          </Col>
        </Row>
        <footer className="post-footer">
          <Row>
            <Col>
              {/* {
                post.acf.show_author && (
                  <Media className="author-info mb-5 align-items-center">
                    <Media left>
                      <Media object src={ post.author[0].avatar } />
                    </Media>
                    <Media body>
                      <Media heading tag="span" className="d-block">{ post.author[0].username }</Media>
                      { post.author[0].description && <span className="d-block">{ post.author[0].description }</span> }
                    </Media>
                  </Media>
                )
              } */}
              <ul className="taxonomy-list px-0">
                { post.topics && post.topics.map((type,index) => {
                  return (
                    <li key={ index } >
                      <a href={ `/blog/?types=&topics=${ type.term_id }&page=1` }>
                         {type.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Col>
          </Row>
          <Row className="post-footer-social pt-5 px-5 mx-n5 mx-md-0 px-md-0 align-items-center justify-content-between">
            <Col xs="auto" className="pl-0">
              <button className={ classnames('like-button', 'd-inline-flex align-items-center', { 'liked': liked }) } type="button" onClick={ setLiked }>
                <HeartIcon className="like-icon mr-3" />
                <span className="like-label">{ liked ? 'Liked this article' : 'Like this article' }</span>
              </button>
            </Col>
            <Col xs="auto" className="pr-0">
                {/* <FacebookShareButton url={ shareUrl }>
                  <FacebookIcon bgStyle={ { fill: 'none' } } iconFillColor="currentColor" size={ 50 } />
                </FacebookShareButton>
                <LinkedinShareButton url={ shareUrl }>
                  <LinkedinIcon bgStyle={ { fill: 'none' } } iconFillColor="currentColor" size={ 50 } />
                </LinkedinShareButton>
                <TwitterShareButton url={ shareUrl }>
                  <TwitterIcon bgStyle={ { fill: 'none' } } iconFillColor="currentColor" size={ 50 } />
                </TwitterShareButton> */}
            </Col>
          </Row>
        </footer>
      </article>
    </Container>
  </section>
  );
};

const RelatedPosts = ({ posts }) => {
  return(
    <section className="post-cards-section bg-gray py-5">
      <Container className="px-5 px-md-4 py-md-5">
        <h2 className="h3">More <span className="text-primary">Related Articles</span></h2>
        <CardDeck className="py-3 my-5">
          { posts.map((post,index) => {
            return (
              <PostCard key={ index } post={ post } />
            );
          })}
        </CardDeck>
      </Container>
    </section>
  );
};


const SingleBlog = props => {
  const isSearching = false;
  const dispatch = useDispatch();

  if (props.errorCode) {
    return <Error statusCode={props.errorCode} />;
  }

  const pageData = useSelector(state => pageDataSelector(state));
  const articles = useSelector(articlesDataSelector);
  const getSlug = props.query.slug;
  const [ value, setValue ] = useState(null);


  let getPostId = articles.postDataById && articles.postDataById.content ? articles.postDataById.content.ID
  : false;
  
  // if (process.browser) {
  //   setValue(localStorage.getItem(getPostId) || '');
  //   if (value === undefined) {
  //     localStorage.removeItem(getPostId);
  //   } else {
  //     localStorage.setItem(getPostId, value);
  //   }
  // }

  useEffect(() => {
    dispatch(reqArticlesAction({ post_id: getSlug, offset:0, posts_per_page: 1 }));
    dispatch(reqPageDataAction({ payload:'blog' }));

    if (process.browser) {
      if (window.location.hash) {
        scrollToAnchor(window.location.hash.replace('#', ''));
      }
    }
  
  }, []);

  let scrollAttempts = 0;

  function scrollToAnchor(anchor) {
    if (scrollAttempts > 100) {
      console.log('Anchor #' + anchor + ' not found in page.');
      return false;
    }

    const attempt = (function(a) {
      return function() {
        attemptScrollToAnchor(a);
      };
    })(anchor);
    setTimeout(attempt, 100);
  }

  function attemptScrollToAnchor(anchor) {
    scrollAttempts++;
    const a = document.querySelector("a[name='" + anchor + "']");
    if (a) {
      a.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
    scrollToAnchor(anchor);
  }


  let getPostArticles = articles.postDataById;
  let relatedPosts = articles.postDataById &&  articles.postDataById.related_post ? articles.postDataById.related_post
  : false;
  let acfData = pageData && pageData.acf_data ? pageData.acf_data : false;
  let popularArticles = articles && articles.popularArticles ? articles.popularArticles.acf : false;

  const onClickLike = () => setValue(value === undefined ? 'like': undefined);

  return (
    <Layout>
      { acfData && <HalfHero component={ acfData.hero }/> }
      { getPostArticles && (
        <Fragment>
          <PostArticle post={ getPostArticles } liked={ value } setLiked={ onClickLike } />
          {relatedPosts.length > 0 && <RelatedPosts posts={ relatedPosts } />}
        </Fragment>
      )}
      <section className="popular-articles-section py-5">
        <Container className="px-5 px-md-4 py-md-5">
          {popularArticles && <PopularArticles getPopularArticles={ popularArticles.popular_articles }/>}
        </Container>
      </section>
      <MarketoBlog />
    </Layout>
  );
};

SingleBlog.getInitialProps = async ({ query, res, req, store }) => {
  const initalState = store.getState();
  const pageData = initalState.page.data;
  return { query, pageData };
};

export default SingleBlog;
