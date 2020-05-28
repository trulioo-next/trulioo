import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { HalfHero }  from '../../components/HalfHero';
import { PopularArticles } from '../../components/PopularArticles';


import { useHistory } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Media,
  CardDeck,
} from 'reactstrap';
import moment from 'moment';
import { autop } from '@wordpress/autop';

import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';

import {
  MarketoBlog,
} from '../../components/Marketo';

import HeartIcon from '../../static/assets/heart.svg';

import { PostCard } from './postcard';


import classnames from 'classnames';

const PostArticle = ({ post, liked, setLiked }) => {
  const shareUrl = window.location.href;
  const content = post.content;
  const history = useHistory();
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
                  <time className="post-meta-item" dateTime={ content.post_date }>{ moment(content.post_date).format('MMMM D, YYYY') }</time>
                  { post.acf.show_author && (
                    <span className="post-meta-item author-info">
                      { post.author.username }, { post.author.description }
                    </span>
                  )}
                </div>
                <h1 className="h2 mb-4">{content.post_title}</h1>
              </Col>
            </Row>
          </header>
          <Row>
            <Col xs="12" md="10" lg="9">
              <div className="post-content" dangerouslySetInnerHTML={ { __html: autop(content.post_content) } } />
            </Col>
          </Row>
          <footer className="post-footer">
            <Row>
              <Col>
                {
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
                }
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
                  <FacebookShareButton url={ shareUrl }>
                    <FacebookIcon bgStyle={ { fill: 'none' } } iconFillColor="currentColor" size={ 50 } />
                  </FacebookShareButton>
                  <LinkedinShareButton url={ shareUrl }>
                    <LinkedinIcon bgStyle={ { fill: 'none' } } iconFillColor="currentColor" size={ 50 } />
                  </LinkedinShareButton>
                  <TwitterShareButton url={ shareUrl }>
                    <TwitterIcon bgStyle={ { fill: 'none' } } iconFillColor="currentColor" size={ 50 } />
                  </TwitterShareButton>
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

export const SinglePost = ({ post, slug }) => {
  const dispatch = useDispatch();
  const [ popularArticles, setPopularArticles ] = useState(null);
  const [ getHeroBlog, setHeroBlog ] = useState(null);
  const [ getPostArticles, setPostArticles ] = useState(null);

  const [ loader, setLoader ] = useState(true);
  const [ getBlogMarketoData, setBlogMarketoData ] = useState(null);

  const [ value, setValue ] = useState(
    localStorage.getItem(post.id) || ''
  );

  useEffect(() => {
    const isMounted = loader;
    const fetchData = () => {
      api.Content.dataBySlug('pages', 'blog')
      .then((data) => {
        setHeroBlog(data[0].acf.hero);
        if (isMounted) {
          setBlogMarketoData(data[0].acf);
        }
      });
    };
    acf.Content.getOptions('popular-articles-settings')
    .then((data) => {
      setPopularArticles(data.acf.popular_articles);
    });
    const loadMarketoBlog = (data) => dispatch(
      { type: 'LOAD_MARKETO_BLOG', payload: data }
    );
    acf.Content.getOptions('marketo-on-blog-pages')
    .then((data) => {
        loadMarketoBlog(data.acf.marketo_on_blog_page);
    });
    api.Articles.postDataById(slug)
      .then((data) => {
        setPostArticles(data);
    });
    if (value === undefined) {
      localStorage.removeItem(post.id);
    } else {
      localStorage.setItem(post.id, value);
    }
    fetchData();
    return () => {
      setLoader(false);
    };
  }, [ dispatch, post.id, value, slug, loader ]);

  const onClickLike = () => setValue(value === undefined ? 'like': undefined);

  return (
    <Fragment>
      { getHeroBlog && <HalfHero component={ getHeroBlog }/> }
      { getPostArticles && (
        <Fragment>
          <PostArticle post={ getPostArticles } liked={ value } setLiked={ onClickLike } />
          {getPostArticles.related_post.length > 0 && <RelatedPosts posts={ getPostArticles.related_post } />}
        </Fragment>
      )}
      <section className="popular-articles-section py-5">
        <Container className="px-5 px-md-4 py-md-5">
          <PopularArticles getPopularArticles={ popularArticles }/>
        </Container>
      </section>
      <MarketoBlog />
    </Fragment>
  );
};

PostArticle.propTypes = {
  post: PropTypes.object.isRequired,
  liked: PropTypes.any,
  setLiked: PropTypes.func,
};

RelatedPosts.propTypes = {
  posts: PropTypes.array,
};

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  slug: PropTypes.any
};
