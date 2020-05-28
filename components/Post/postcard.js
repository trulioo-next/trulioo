import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import truncate from 'truncate-html';
import { autop } from '@wordpress/autop';

import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
} from 'reactstrap';

export const PostCard = ({ post }) => {
  return (
    <a className="post-item-link card" href={ `/blog/${ post.content.post_name }` }>
      <Card tag="article" className="post-card m-0">
        { post.featured_image && (
          <div className="card-image">
            <CardImg className="d-block" top width="100%" src={ post.featured_image } />
          </div>
        ) }
        <CardBody>
          <time className="d-block mb-4" dateTime={ post.content.post_date }>{ moment(post.content.post_date).format('MMMM D, YYYY') }</time>
          <CardTitle tag="h3" className="display-4 mb-4">{ post.content.post_title }</CardTitle>
        </CardBody>
      </Card>
    </a>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
};
