import React from 'react';
import Link from 'next/link';

import './NewsroomArticle.scss';

const NewsroomArticle = props => {
  const { post } = props;

  return (
    <section className="NewsroomArticle">
      <h3 className="h4 Article__title">{post.title}</h3>
      <div className="Article__publishDate">Published {post.publishDate}</div>
      <div className="Article__content inner__copy" dangerouslySetInnerHTML={{ __html: post.body }} />
    </section>
  );
};

export default NewsroomArticle;
