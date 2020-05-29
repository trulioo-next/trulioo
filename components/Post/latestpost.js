import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import moment from 'moment';
import truncate from 'truncate-html';
import { autop } from '@wordpress/autop';

import {
  Media,
} from 'reactstrap';

export const LatestPost = ({ post }) => {
  let excerpt;

  if (post.content.post_excerpt) {
    excerpt = autop(post.content.post_excerpt);
  } else {
    excerpt = autop(truncate(post.content.post_content, 300, { keepWhitespaces: true, stripTags: true })).split('</p>')[0];
  }

  return (
    <a className="post-item-link" href={ `/blog/${ post.content.post_name }` }>
      <article className="latest-post my-md-5">
        <Media className="row align-items-stretch">
          <Media left className={ classnames( 'col col-12 col-md-6', { 'd-none d-md-block': !post.featured_image } ) }>
            { post.featured_image && <Media object src={ post.featured_image } className="post-thumbnail" /> }
          </Media>
          <Media body className={ classnames( 'col col-12 col-md-6 pl-md-5', { 'mt-5 mt-md-0' : post.featured_image } ) }>
            <div className="post-header">
              <time className="d-block mb-4" dateTime={ post.content.post_date }>{ moment(post.content.post_date).format('MMMM D, YYYY') }</time>
              <Media heading tag="h2" className="h3">{post.content.post_title}</Media>
              <div className="post-excerpt" dangerouslySetInnerHTML= { { __html: excerpt } } />
            </div>
            <div className="post-meta">
              { post.reading_time && <span className="d-block">{ post.reading_time } min</span> }
              {post.topics &&
                <span className="d-block">
                  Key Topics:
                  <ul className="d-inline-block px-0 m-0">
                    { post.topics.map((topic, index) => (
                      <li className="d-inline-block px-0 ml-2 m-0" key={ index }>{topic.name}{ (index + 1 !== post.topics.length) && ',' }</li>
                    ))}
                  </ul>
                </span>
              }
            </div>
          </Media>
        </Media>
      </article>
    </a>
  );
};

LatestPost.propTypes = {
  post: PropTypes.object,
};
