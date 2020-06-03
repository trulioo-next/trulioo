import React from 'react';
import PropTypes from 'prop-types';

export const PopularArticles = ({ getPopularArticles }) => (
  <aside className='popular-articles'>
    <h2 className="popular-articles-title mb-4">
      <span className="text-primary">Popular</span> articles
    </h2>
    <ol>
      { getPopularArticles && getPopularArticles.map((article,index) => (
        <li key={ index }>
          <a href={ `/blog/${ article.popular_article.post_name }` }>
            { article.popular_article.post_title }
          </a>
        </li>
      )
      )}
    </ol>
  </aside>
);

PopularArticles.propTypes = {
  getPopularArticles: PropTypes.array
};
