import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { autop } from '@wordpress/autop';
import truncate from 'truncate-html';

import {
  Media
} from 'reactstrap';

export const GroupPost = ({ isSearching, post }) => {
  let excerpt;

  if (post.content.post_excerpt) {
    excerpt = autop(post.content.post_excerpt);
  } else {
    const text = post.content.post_content || post.content.rendered;
    excerpt = autop(truncate(text, 100, { keepWhitespaces: true, stripTags: true })).split('</p>')[0];
  }

  return (
    <Fragment>
    { isSearching ?
        (<article className="blog-post-item px-5 px-md-0">
          <a className="post-item-link" href={ `/blog/${ post.slug }` }>
            <Media>
              <Media left className={ classnames({ 'd-none d-md-block': !post.featured_image }) }>
                { post.featured_image && <Media object src={ post.featured_image } className="post-thumbnail" /> }
              </Media>
              <Media body className={ classnames( { 'mt-5 mt-md-0' : post.featured_image } ) }>
                <Media heading tag="h2" className="h5">
                  <span dangerouslySetInnerHTML={ { __html: post.title.rendered || 'No HTML' } } />
                </Media>
                <div className="post-excerpt" dangerouslySetInnerHTML={ { __html: excerpt } } />
              </Media>
            </Media>
          </a>
        </article>) :
        (<article className="blog-post-item px-5 px-md-0">
          <a className="post-item-link" href={ `/blog/${ post.content.post_name }` }>
            <Media>
              <Media left className={ classnames({ 'd-none d-md-block': !post.featured_image }) }>
                { post.featured_image && <Media object src={ post.featured_image } className="post-thumbnail" /> }
              </Media>
              <Media body className={ classnames( { 'mt-5 mt-md-0' : post.featured_image } ) }>
                <Media heading tag="h2" className="h5">{ post.content.post_title }</Media>
                <div className="post-excerpt" dangerouslySetInnerHTML={ { __html: excerpt } } />
              </Media>
            </Media>
          </a>
        </article>)
      }
    </Fragment>
  );
};

GroupPost.propTypes = {
  post: PropTypes.object,
  isSearching: PropTypes.any,
};

GroupPost.defaultProps = {
  post: {},
  isSearching: false,
};
