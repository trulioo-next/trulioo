import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import ColumnSpread from '@/components/ColumnSpread';
import MediaObjectCard from '@/components/MediaObjectCard';

import { nutritionalsDataSelector } from '@/stores/nutritionals/selectors';

const SectionPostGrid = props => {
  let { posts, category, defaultImage } = props;
  let count = posts.length;
  if (count > 4) {
    count = 4;
  }

  let displayTitle = '';

  // console.log('POSTS  props ', props )

  function getDisplayTitle(category, slug, title) {
    const displayTitle = useSelector(state =>
      nutritionalsDataSelector(state, category, slug),
    );
    let defaultTitle = title;
    if (displayTitle.nutritionals) {
      if (displayTitle.nutritionals.display_title) {
        defaultTitle = displayTitle.nutritionals.display_title;
      }
    }

    return defaultTitle;
  }

  return (
    <section className="Section">
      <Container fluid className="px-0">
        <ColumnSpread spread={count}>
          {posts &&
            posts.map((post, sectionKey) => (
              <MediaObjectCard
                key={sectionKey}
                title={getDisplayTitle(category, post.slug, post.title)}
                image={post.photos ? post.photos[0].url : defaultImage}
                containImage
                product={{
                  href: '/menu/' + category + '/' + post.slug,
                  show_calorie_count: post.show_calorie_count,
                  calories: post.calories,
                }}
                stacked
              >
                <p>{post.description}</p>
              </MediaObjectCard>
            ))}
        </ColumnSpread>
      </Container>
    </section>
  );
};

SectionPostGrid.defaultProps = {};

export default SectionPostGrid;
